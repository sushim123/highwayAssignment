import { Request, Response } from 'express';
import { generateOtp, verifyOtp } from '../lib/otpService';
import { sendEmail } from '../lib/emailService';
import { generateToken } from '../lib/jwtService';
import User from '../models/User';
import { OtpRecord } from '../models/interfaces';

const pendingOtps: Map<string, OtpRecord> = new Map();

const OTP_EXPIRATION_MINUTES = 5;

export const signup = async (req: Request, res: Response) => {
    const { fullName, dob, email } = req.body;

    if (!fullName || !dob || !email) {
        return res.status(400).json({ message: 'Full name, Date of Birth, and Email are required.' });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'User with this email already exists.' });
        }

        const otp = generateOtp();
        const expiresAt = new Date(Date.now() + OTP_EXPIRATION_MINUTES * 60 * 1000);

        pendingOtps.set(email, { otp, expiresAt, type: 'signup', userData: { fullName, dob, email } });

        await sendEmail(email, 'Your Signup OTP', `Your OTP for signup is: ${otp}. It is valid for ${OTP_EXPIRATION_MINUTES} minutes.`);

        console.log(`OTP for signup (${email}): ${otp}`);

        res.status(200).json({ message: `OTP sent to ${email}. Please verify to complete signup.` });
    } catch (error) {
        console.error('Signup request error:', error);
        res.status(500).json({ message: 'Internal server error during signup request.' });
    }
};

export const verifyOtpAndSignup = async (req: Request, res: Response) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        return res.status(400).json({ message: 'Email and OTP are required.' });
    }

    const otpRecord = pendingOtps.get(email);

    if (!otpRecord || otpRecord.type !== 'signup') {
        return res.status(400).json({ message: 'No pending signup verification for this email or invalid type.' });
    }

    if (!verifyOtp(otpRecord.otp, otp, otpRecord.expiresAt)) {
        return res.status(401).json({ message: 'Invalid or expired OTP.' });
    }

    try {
        const userDataToSave = otpRecord.userData;
        if (!userDataToSave) {
            return res.status(500).json({ message: 'User data missing for signup completion.' });
        }

        const newUser = new User(userDataToSave);
        await newUser.save();

        pendingOtps.delete(email);

        const token = generateToken({ email: newUser.email, fullName: newUser.fullName });

        // Set the JWT as an HTTP-only cookie
        res.cookie('jwt', token, {
            httpOnly: true,
            secure: false, // Changed to false for localhost HTTP development
            domain: 'localhost',
            path: '/',
            maxAge: 3600000 // 1 hour in milliseconds
        });

        res.status(201).json({
            message: 'Signup successful!',
            user: { email: newUser.email, fullName: newUser.fullName },
        });
    } catch (error: any) {
        console.error('Verify OTP and Signup error:', error);
        if (error.code === 11000) {
            return res.status(409).json({ message: 'User with this email already exists after verification.' });
        }
        res.status(500).json({ message: 'Internal server error during signup verification.' });
    }
};

export const signin = async (req: Request, res: Response) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Email is required.' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found. Please sign up first.' });
        }

        const otp = generateOtp();
        const expiresAt = new Date(Date.now() + OTP_EXPIRATION_MINUTES * 60 * 1000);

        pendingOtps.set(email, { otp, expiresAt, type: 'signin' });

        await sendEmail(email, 'Your Signin OTP', `Your OTP for signin is: ${otp}. It is valid for ${OTP_EXPIRATION_MINUTES} minutes.`);

        console.log(`OTP for signin (${email}): ${otp}`);

        res.status(200).json({ message: `OTP sent to ${email}. Please verify to complete signin.` });
    } catch (error) {
        console.error('Signin request error:', error);
        res.status(500).json({ message: 'Internal server error during signin request.' });
    }
};

export const verifyOtpAndSignin = async (req: Request, res: Response) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        return res.status(400).json({ message: 'Email and OTP are required.' });
    }

    const otpRecord = pendingOtps.get(email);

    if (!otpRecord || otpRecord.type !== 'signin') {
        return res.status(400).json({ message: 'No pending signin verification for this email or invalid type.' });
    }

    if (!verifyOtp(otpRecord.otp, otp, otpRecord.expiresAt)) {
        return res.status(401).json({ message: 'Invalid or expired OTP.' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found after OTP verification.' });
        }

        pendingOtps.delete(email);

        const token = generateToken({ email: user.email, fullName: user.fullName });

        // Set the JWT as an HTTP-only cookie
        res.cookie('jwt', token, {
            httpOnly: true,
            secure: false, // Changed to false for localhost HTTP development
            domain: 'localhost',
            path: '/',
            maxAge: 3600000 // 1 hour in milliseconds
        });

        res.status(200).json({
            message: 'Signin successful!',
            user: { email: user.email, fullName: user.fullName },
        });
    } catch (error) {
        console.error('Verify OTP and Signin error:', error);
        res.status(500).json({ message: 'Internal server error during signin verification.' });
    }
};

export const protectedRoute = (req: Request, res: Response) => {
    res.status(200).json({
        message: 'You have accessed a protected route!',
        user: req.user
    });
};

export const getProfile = (req: Request, res: Response) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized: User information not available.' });
    }
    res.status(200).json({
        message: 'User profile fetched successfully.',
        profile: {
            email: req.user.email,
            fullName: req.user.fullName,
        }
    });
};

export const logout = (req: Request, res: Response) => {
    // Clear the HTTP-only cookie
    res.clearCookie('jwt', {
        httpOnly: true,
        secure: false, // Changed to false for localhost HTTP development
        domain: 'localhost',
        path: '/',
    });
    res.status(200).json({ message: 'Logged out successfully.' });
};
