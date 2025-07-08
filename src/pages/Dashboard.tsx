import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState<{
    email: string;
    fullName: string;
  } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [notes, setNotes] = useState<string[]>([]);
  const [newNote, setNewNote] = useState<string>("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("/api/auth/profile", {
          withCredentials: true,
        });
        setUserProfile(response.data.profile);
      } catch (err: any) {
        console.error("Failed to fetch profile:", err);
        if (
          axios.isAxiosError(err) &&
          err.response &&
          (err.response.status === 401 || err.response.status === 403)
        ) {
          setError("Session expired or unauthorized. Please sign in again.");
          navigate("/login");
        } else {
          setError(
            err.response?.data?.message || "Failed to load user profile."
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = async () => {
    setLoading(true);
    setError(null);

    try {
      await axios.post(
        "/api/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );
      navigate("/login");
    } catch (err: any) {
      console.error("Logout error:", err);
      setError("Logout failed. Please try again.");
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  const handleAddNote = () => {
    if (newNote.trim() !== "") {
      setNotes([...notes, newNote.trim()]);
      setNewNote("");
    }
  };

  const handleDeleteNote = (indexToDelete: number) => {
    setNotes(notes.filter((_, index) => index !== indexToDelete));
  };

  const handleDeleteAllNotes = () => {
    setNotes([]);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-gray-700">Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-red-600 text-center p-4">{error}</p>
        <button
          onClick={() => navigate("/login")}
          className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Go to Sign In
        </button>
      </div>
    );
  }

  return (
    <div className="box-border relative w-[375px] h-[812px] bg-white border border-gray-900 rounded-lg mx-auto shadow-lg overflow-hidden">
      <div className="absolute w-full flex items-center justify-between px-4 pt-[55px]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 relative">
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
          <h1 className="font-inter font-medium text-xl leading-[110%] tracking-[-0.04em] text-gray-900">
            Dashboard
          </h1>
        </div>
        <button
          onClick={handleLogout}
          className="font-inter font-normal text-sm leading-[150%] text-gray-600 hover:text-gray-800 transition-colors duration-200"
          disabled={loading}
        >
          Sign Out
        </button>
      </div>

      <div className="box-border flex-col flex p-4 gap-2.5 absolute w-[343px] h-[130px] left-4 top-[128px] border border-gray-300 drop-shadow-md rounded-lg">
        <p className="font-inter font-bold text-2xl leading-[250%] text-gray-900 flex-grow">
          Welcome, {userProfile?.fullName || "User"}! <br />
        </p>
        <p> Email: {userProfile?.email || "N/A"}</p>
      </div>

      <div className="flex flex-col justify-center items-start p-0 gap-3 absolute w-[343px] left-4 top-[283px]">
        <input
          type="text"
          placeholder="Add a new note..."
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          className="box-border flex-row items-center p-4 gap-0.5 w-full h-[52px] border-1.5 border-gray-300 rounded-lg text-base text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          onClick={handleAddNote}
          className="flex justify-center items-center px-8 py-4 gap-2 w-full h-[52px] bg-blue-500 rounded-lg text-white font-semibold text-base leading-[120%] tracking-[-0.01em] transition-colors duration-200 hover:bg-blue-600"
        >
          Create Note
        </button>
      </div>

      <h2 className="absolute w-[54px] h-[22px] left-4 top-[400px] font-inter font-medium text-xl leading-[110%] tracking-[-0.04em] text-gray-900">
        <br />
        Notes
      </h2>

      <div className="absolute left-4 top-[430px] w-[343px] overflow-y-auto max-h-[300px]">
        {notes.length === 0 ? (
          <p className="text-gray-500 text-center mt-4">
            No notes yet. Add one!
          </p>
        ) : (
          notes.map((note, index) => (
            <div
              key={index}
              className="box-border flex items-center p-4 gap-2.5 w-full h-[50px] mb-3 border border-gray-300 drop-shadow-md rounded-lg"
            >
              <p className="font-inter font-normal text-base leading-[250%] text-gray-900 flex-grow truncate">
                {note}
              </p>
              <button
                onClick={() => handleDeleteNote(index)}
                className="w-6 h-6 relative flex-shrink-0"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute inset-0"
                >
                  <path
                    d="M3 6H5H21"
                    stroke="#050400"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6"
                    stroke="#050400"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10 11V17"
                    stroke="#050400"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14 11V17"
                    stroke="#050400"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          ))
        )}
        {notes.length > 0 && (
          <button
            onClick={handleDeleteAllNotes}
            className="mt-4 flex justify-center items-center px-8 py-2 gap-2 w-full h-[40px] bg-red-500 rounded-lg text-white font-semibold text-sm transition-colors duration-200 hover:bg-red-600"
          >
            Delete All Notes
          </button>
        )}
      </div>

      <div className="absolute w-[375px] h-[34px] left-0 bottom-0 flex justify-center items-center">
        <div className="w-[148px] h-[5px] bg-gray-900 rounded-full bottom-2 absolute"></div>
      </div>
    </div>
  );
};

export default DashboardPage;
