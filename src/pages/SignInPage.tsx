import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import backgroundImage from "../assets/images/image.jpg";

// When using a proxy in package.json, you typically don't need API_BASE_URL here.
// The proxy handles routing requests like /api/auth/profile to http://localhost:4000/api/auth/profile.
// const API_BASE_URL = process.env.REACT_APP_BACKEND_URL; // This line is commented out as it's no longer needed with proxy

const SignInPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [keepLoggedIn, setKeepLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [otpSent, setOtpSent] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);
    setOtpSent(false);

    // No need for API_BASE_URL check here either due to proxy
    try {
      const response = await axios.post(
        "/api/auth/signin",
        {
          // Changed URL to relative path
          email,
        },
        {
          withCredentials: true, // Crucial for sending/receiving cookies
        }
      );
      setMessage(
        response.data.message ||
          "OTP sent for sign-in. Please check your email."
      );
      setOtpSent(true);
      console.log("Sign In OTP request successful:", response.data);
    } catch (err: any) {
      console.error("Sign In OTP request error:", err);
      if (axios.isAxiosError(err) && err.response) {
        setError(
          err.response.data.message ||
            "An error occurred while sending OTP for sign in."
        );
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerifySignInOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    // No need for API_BASE_URL check here either due to proxy
    try {
      const response = await axios.post(
        "/api/auth/signin/verify",
        {
          // Changed URL to relative path
          email,
          otp,
        },
        {
          withCredentials: true, // Crucial for sending/receiving cookies
        }
      );
      setMessage(response.data.message || "Signed in successfully!");
      console.log("Sign In verification successful:", response.data);
      navigate("/dashboard"); // Navigate to /dashboard after successful sign-in
    } catch (err: any) {
      console.error("Sign In verification error:", err);
      if (axios.isAxiosError(err) && err.response) {
        setError(
          err.response.data.message ||
            "OTP verification failed. Please try again."
        );
      } else {
        setError("An unexpected error occurred during OTP verification.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="box-border flex flex-col md:flex-row items-start p-0 relative w-full md:w-[1440px] h-screen md:h-[1024px] bg-white border border-gray-900 rounded-lg md:rounded-3xl overflow-hidden shadow-lg md:mx-auto md:my-auto">
      <div className="flex flex-col items-start p-4 md:p-8 w-full md:w-[591px] h-full flex-grow">
        <div className="flex flex-col items-start p-0 gap-2.5 w-full md:w-[527px] h-8 flex-none order-0 self-stretch flex-grow-0 mt-5 md:mt-0 mb-8">
          <div className="flex flex-row items-center p-0 gap-3 w-[79px] h-8 flex-none order-0 flex-grow-0">
            <div className="w-8 h-8 relative flex-none order-0 flex-grow-0">
              <svg
                width="33"
                height="32"
                viewBox="0 0 33 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20.6424 0.843087L17.4853 0L14.8248 9.89565L12.4228 0.961791L9.26555 1.80488L11.8608 11.4573L5.3967 5.01518L3.08549 7.31854L10.1758 14.3848L1.34596 12.0269L0.5 15.1733L10.1477 17.7496C10.0372 17.2748 9.97877 16.7801 9.97877 16.2717C9.97877 12.6737 12.9055 9.75685 16.5159 9.75685C20.1262 9.75685 23.0529 12.6737 23.0529 16.2717C23.0529 16.7768 22.9952 17.2685 22.8861 17.7405L31.6541 20.0818L32.5 16.9354L22.814 14.3489L31.6444 11.9908L30.7984 8.84437L21.1128 11.4308L27.5768 4.98873L25.2656 2.68538L18.2737 9.65357L20.6424 0.843087Z"
                  fill="#367AFF"
                />
                <path
                  d="M22.8776 17.7771C22.6069 18.9176 22.0354 19.9421 21.2513 20.763L27.6033 27.0935L29.9145 24.7901L22.8776 17.7771Z"
                  fill="#367AFF"
                />
                <path
                  d="M21.1872 20.8292C20.3936 21.637 19.3907 22.2398 18.2661 22.5504L20.5775 31.1472L23.7346 30.3041L21.1872 20.8292Z"
                  fill="#367AFF"
                />
                <path
                  d="M18.1482 22.5818C17.6264 22.7155 17.0795 22.7866 16.5159 22.7866C15.9121 22.7866 15.3274 22.705 14.7723 22.5522L12.4589 31.1569L15.616 31.9999L18.1482 22.5818Z"
                  fill="#367AFF"
                />
                <path
                  d="M14.6607 22.5206C13.5532 22.1945 12.5682 21.584 11.7908 20.7739L5.42322 27.1199L7.73442 29.4233L14.6607 22.5206Z"
                  fill="#367AFF"
                />
                <path
                  d="M11.7377 20.7178C10.9737 19.9026 10.4172 18.8917 10.1523 17.7688L1.35571 20.1178L2.20167 23.2642L11.7377 20.7178Z"
                  fill="#367AFF"
                />
              </svg>
            </div>
            <div className="w-[35px] h-[26px] font-inter font-semibold text-2xl leading-[110%] text-center tracking-[-0.04em] text-gray-900 flex-none order-1 flex-grow-0">
              HD
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center items-start px-4 md:px-16 gap-8 w-full md:w-[527px] h-auto md:h-[928px] flex-none order-1 self-stretch flex-grow">
          <div className="flex flex-col justify-center items-start p-0 gap-3 w-full md:w-[399px] h-[83px] flex-none order-0 self-stretch flex-grow-0">
            <h1 className="w-full md:w-[123px] h-[35px] md:h-[44px] font-inter font-bold text-3xl md:text-4xl leading-[110%] text-center tracking-[-0.04em] text-gray-900">
              Sign in
            </h1>
            <p className="w-full md:w-[399px] h-[24px] md:h-[27px] font-inter font-normal text-base md:text-lg leading-[150%] text-gray-500 text-center">
              Please login to continue to your account.
            </p>
          </div>

          <form
            onSubmit={otpSent ? handleVerifySignInOtp : handleSignIn}
            className="flex flex-col items-start p-0 gap-5 w-full md:w-[399px]"
          >
            <div className="relative w-full">
              <label
                htmlFor="email"
                className="absolute -top-2.5 md:-top-3 left-3 bg-white px-1 text-sm font-medium text-blue-500"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jonas_kahnwald@gmail.com"
                className="box-border flex flex-row items-center p-4 gap-0.5 w-full h-[52px] md:h-[59px] border-1.5 border-blue-500 rounded-lg text-base md:text-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                disabled={otpSent}
              />
            </div>

            {otpSent && (
              <div className="relative w-full">
                <div className="box-border flex flex-row justify-center items-center p-4 gap-2.5 w-full h-[52px] md:h-[59px] border border-gray-300 rounded-lg">
                  <input
                    type="password"
                    id="otp"
                    name="otp"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="OTP"
                    className="flex-grow font-inter font-normal text-base md:text-lg leading-[150%] text-gray-500 bg-transparent focus:outline-none"
                    required
                  />
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="flex-none order-1 flex-grow-0"
                  >
                    <path
                      d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.54 18.54 0 0 1 2.16-3.15M2.12 2.12L21.88 21.88M15.04 15.04a3 3 0 0 1-4.24-4.24M12 7v3m-4 4h3"
                      stroke="#9A9A9A"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            )}

            {otpSent && (
              <div className="w-full text-right">
                <a
                  href="#"
                  onClick={handleSignIn}
                  className="font-inter font-medium text-sm md:text-base leading-[150%] text-blue-500 underline"
                  aria-disabled={loading}
                >
                  Resend OTP
                </a>
              </div>
            )}

            <div className="flex flex-row items-center p-0 gap-2.5 w-[158px] md:w-[176px] h-6">
              <input
                type="checkbox"
                id="keepLoggedIn"
                checked={keepLoggedIn}
                onChange={(e) => setKeepLoggedIn(e.target.checked)}
                className="w-6 h-6 border-2 border-gray-900 rounded focus:ring-blue-500 text-blue-500"
              />
              <label
                htmlFor="keepLoggedIn"
                className="w-[124px] md:w-[142px] h-[21px] md:h-6 font-inter font-medium text-sm md:text-base leading-[150%] text-gray-900"
              >
                Keep me logged in
              </label>
            </div>

            <button
              type="submit"
              className="box-border flex flex-row justify-center items-center px-8 py-4 gap-2 w-full h-[52px] md:h-[54px] bg-blue-500 rounded-lg text-white font-semibold text-base md:text-lg leading-[120%] tracking-[-0.01em] transition duration-300 ease-in-out hover:bg-blue-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              disabled={loading}
            >
              {loading
                ? otpSent
                  ? "Verifying..."
                  : "Sending OTP..."
                : "Sign in"}
            </button>
          </form>

          {message && (
            <p className="text-green-600 text-center w-full mt-4">{message}</p>
          )}
          {error && (
            <p className="text-red-600 text-center w-full mt-4">{error}</p>
          )}

          <p className="w-full md:w-[399px] h-[21px] md:h-[27px] font-inter font-normal text-sm md:text-lg leading-[150%] text-center text-gray-600">
            Need an account?{" "}
            <Link to="/signup" className="text-blue-500 hover:underline">
              Create one
            </Link>
          </p>
        </div>
      </div>

      <div className="hidden md:flex flex-row items-start p-3 gap-2.5 w-full md:w-[849px] md:h-[1024px] flex-none order-1 self-stretch flex-grow-0">
        <div
          className="flex flex-col justify-center items-center p-8 gap-8 w-full md:w-[825px] md:h-[1000px] bg-cover bg-center rounded-2xl flex-none order-0 self-stretch flex-grow"
          style={{
            backgroundImage: `url(${backgroundImage})`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default SignInPage;
