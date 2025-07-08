
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import backgroundImage from "../assets/images/image.jpg";

const SignUpPage: React.FC = () => {
  const [fullName, setFullName] = useState<string>("");
  const [dob, setDob] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [showOtpInput, setShowOtpInput] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleGetOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);
    try {
      const response = await axios.post(
        "/api/auth/signup",
        {
          fullName,
          dob,
          email,
        },
        {
          withCredentials: true,
        }
      );
      setMessage(
        response.data.message ||
          "OTP sent successfully! Please check your email."
      );
      setShowOtpInput(true);
      console.log("OTP request successful:", response.data);
    } catch (err: any) {
      console.error("OTP request error:", err);
      if (axios.isAxiosError(err) && err.response) {
        setError(
          err.response.data.message || "An error occurred while sending OTP."
        );
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      const response = await axios.post(
        "/api/auth/signup/verify",
        {
          email,
          otp,
        },
        {
          withCredentials: true,
        }
      );
      setMessage(
        response.data.message || "Account created and verified successfully!"
      );
      console.log("OTP verification successful:", response.data);

      navigate("/login");
    } catch (err: any) {
      console.error("OTP verification error:", err);
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
    <div className="box-border flex flex-col md:flex-row items-start p-0 relative w-full md:w-[1440px] md:h-[1024px] bg-white border border-gray-800 rounded-3xl overflow-hidden shadow-lg md:mx-auto md:my-auto">
      <div className="flex flex-col items-start p-8 w-full md:w-[591px] h-full flex-grow">
        <div className="flex flex-col items-start p-0 gap-2.5 w-full md:w-[527px] h-8 flex-none order-0 self-stretch flex-grow-0 mb-8">
          <div className="flex flex-row items-center p-0 gap-3 w-[79px] h-8 flex-none order-0 flex-grow-0">
            <div className="w-8 h-8 relative flex-none order-0 flex-grow-0">
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute inset-0"
              >
                <path
                  d="M20.1424 0.843087L16.9853 0L14.3248 9.89565L11.9228 0.961791L8.76555 1.80488L11.3608 11.4573L4.8967 5.01518L2.58549 7.31854L9.67576 14.3848L0.845959 12.0269L0 15.1733L9.64767 17.7496C9.53721 17.2748 9.47877 16.7801 9.47877 16.2717C9.47877 12.6737 12.4055 9.75685 16.0159 9.75685C19.6262 9.75685 22.5529 12.6737 22.5529 16.2717C22.5529 16.7768 22.4952 17.2685 22.3861 17.7405L31.1541 20.0818L32 16.9354L22.314 14.3489L31.1444 11.9908L30.2984 8.84437L20.6128 11.4308L27.0768 4.98873L24.7656 2.68538L17.7737 9.65357L20.1424 0.843087Z"
                  fill="#367AFF"
                />
                <path
                  d="M22.3776 17.7771C22.1069 18.9176 21.5354 19.9421 20.7513 20.763L27.1033 27.0935L29.4145 24.7901L22.3776 17.7771Z"
                  fill="#367AFF"
                />
                <path
                  d="M20.6871 20.8292C19.8936 21.637 18.8907 22.2398 17.7661 22.5504L20.0775 31.1472L23.2346 30.3041L20.6871 20.8292Z"
                  fill="#367AFF"
                />
                <path
                  d="M17.6481 22.5819C17.1264 22.7156 16.5795 22.7866 16.0159 22.7866C15.4121 22.7866 14.8273 22.705 14.2723 22.5523L11.9588 31.1569L15.1159 32L17.6481 22.5819Z"
                  fill="#367AFF"
                />
                <path
                  d="M14.1607 22.5205C13.0533 22.1945 12.0683 21.584 11.2909 20.7739L4.92328 27.1199L7.23448 29.4233L14.1607 22.5205Z"
                  fill="#367AFF"
                />
                <path
                  d="M11.2378 20.7178C10.4737 19.9026 9.91721 18.8917 9.65231 17.7688L0.855743 20.1179L1.7017 23.2643L11.2378 20.7178Z"
                  fill="#367AFF"
                />
              </svg>
            </div>
            {/* HD */}
            <div className="w-[35px] h-[26px] font-inter font-semibold text-2xl leading-[110%] text-center tracking-[-0.04em] text-gray-900 flex-none order-1 flex-grow-0">
              HD
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center items-start p-4 md:px-16 gap-8 w-full md:w-[527px] md:h-[928px] flex-none order-1 self-stretch flex-grow">
          <div className="flex flex-col justify-center items-start p-0 gap-3 w-full md:w-[399px] h-[83px] flex-none order-0 self-stretch flex-grow-0">
            <h1 className="w-[138px] h-[44px] font-inter font-bold text-4xl leading-[110%] text-center tracking-[-0.04em] text-gray-900 flex-none order-0 flex-grow-0">
              Sign up
            </h1>
            <p className="w-full md:w-[399px] h-[27px] font-inter font-normal text-lg leading-[150%] text-gray-500 flex-none order-1 self-stretch flex-grow-0">
              Sign up to enjoy the feature of HD
            </p>
          </div>
          <form
            onSubmit={showOtpInput ? handleVerifyOtp : handleGetOtp}
            className="flex flex-col justify-center items-start p-0 gap-5 w-full md:w-[399px] h-[370px] flex-none order-1 flex-grow-0"
          >
            <div className="relative w-full">
              <label
                htmlFor="fullName"
                className="absolute -top-3 left-3 bg-white px-1 text-sm font-medium text-gray-500"
              >
                Your Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Jonas Kahnwald"
                className="box-border flex flex-row items-center p-4 gap-0.5 w-full h-[59px] border-1.5 border-gray-300 rounded-lg text-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                disabled={showOtpInput}
              />
            </div>

            <div className="relative w-full">
              <label
                htmlFor="dob"
                className="absolute -top-3 left-3 bg-white px-1 text-sm font-medium text-gray-500"
              >
                Date of Birth
              </label>
              <div className="box-border flex flex-row items-center p-4 gap-2.5 w-full h-[59px] border-1.5 border-gray-300 rounded-lg text-lg text-gray-900 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="flex-none order-0 flex-grow-0 z-0"
                >
                  <rect
                    x="3"
                    y="4"
                    width="18"
                    height="18"
                    rx="2"
                    stroke="#232323"
                    strokeWidth="2"
                  />
                  <path
                    d="M7 2V4"
                    stroke="#232323"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M17 2V4"
                    stroke="#232323"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3 8H21"
                    stroke="#232323"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  placeholder="11 December 1997"
                  className="flex-grow font-inter font-normal text-lg leading-[150%] text-gray-900 bg-transparent focus:outline-none"
                  required
                  disabled={showOtpInput}
                />
              </div>
            </div>

            <div className="relative w-full">
              <label
                htmlFor="email"
                className="absolute -top-3 left-3 bg-white px-1 text-sm font-medium text-gray-500"
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
                className="box-border flex flex-row items-center p-4 gap-0.5 w-full h-[59px] border-1.5 border-gray-300 rounded-lg text-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                disabled={showOtpInput}
              />
            </div>

            {showOtpInput && (
              <div className="relative w-full">
                <div className="box-border flex flex-row justify-center items-center p-4 gap-2.5 w-full h-[59px] border border-blue-500 rounded-lg flex-none order-3 flex-grow-0">
                  <input
                    type="text"
                    id="otp"
                    name="otp"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="OTP"
                    className="flex-grow font-inter font-normal text-lg leading-[150%] text-gray-500 bg-transparent focus:outline-none"
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

            <button
              type="submit"
              className="box-border flex flex-row justify-center items-center px-2 py-4 gap-2 w-full h-[54px] bg-blue-500 rounded-lg text-white font-semibold text-lg leading-[120%] tracking-[-0.01em] transition duration-300 ease-in-out hover:bg-blue-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex-none order-4 self-stretch flex-grow-0"
              disabled={loading}
            >
              {loading
                ? showOtpInput
                  ? "Verifying OTP..."
                  : "Sending OTP..."
                : showOtpInput
                ? "Sign up"
                : "Get OTP"}
            </button>
          </form>
          {message && (
            <p className="text-green-600 text-center w-full mt-4">{message}</p>
          )}
          {error && (
            <p className="text-red-600 text-center w-full mt-4">{error}</p>
          )}
          <p className="w-full md:w-[399px] h-[27px] font-inter font-normal text-lg leading-[150%] text-center text-gray-600 flex-none order-2 self-stretch flex-grow-0">
            Already have an account??{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Sign in
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
        >

        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
