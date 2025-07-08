export const generateOtp = (): string => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

export const verifyOtp = (storedOtp: string, providedOtp: string, expiresAt: Date): boolean => {
    const now = new Date();
    return storedOtp === providedOtp && now < expiresAt;
};
