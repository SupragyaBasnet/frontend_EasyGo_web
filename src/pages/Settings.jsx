import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "remixicon/fonts/remixicon.css";
import defaultAvatar from "../assets/image.jpeg"; // Update with your default avatar path

const API_BASE_URL = "http://localhost:4000/users";

const Settings = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [cameraStream, setCameraStream] = useState(null);
  const [language, setLanguage] = useState("en");
  const [nightMode, setNightMode] = useState(false);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API_BASE_URL}/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      setUser(res.data);
      console.log(res.data.profilePicture); // Verify server response
      setLanguage(res.data.language || "en");
      setNightMode(res.data.nightMode || false);
  
      // Apply the theme
      document.documentElement.className = res.data.nightMode ? "theme-dark" : "theme-light";
    } catch (err) {
      console.error("Error fetching profile:", err);
    }
  };
  

  const toggleNightMode = () => {
    setNightMode((prevMode) => {
      const newMode = !prevMode;
      document.documentElement.className = newMode ? "theme-dark" : "theme-light";
      return newMode;
    });
  };
  
  

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.get(`${API_BASE_URL}/logout`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      localStorage.removeItem("token");
      navigate("/login");
    } catch (err) {
      console.error("Error logging out:", err);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_BASE_URL}/delete`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      localStorage.removeItem("token");
      navigate("/signup");
    } catch (err) {
      console.error("Error deleting account:", err);
    }
  };

  const handleFileUpload = async (file) => {
    if (!file) return;
  
    const formData = new FormData();
    formData.append("profilePicture", file);
  
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(`${API_BASE_URL}/upload-profile-picture`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
  
      // Update user state with the new profile picture URL
      setUser((prev) => ({
        ...prev,
        profilePicture: res.data.user.profilePicture,
      }));
      setShowProfileModal(false);
    } catch (err) {
      console.error("Error uploading profile picture:", err);
    }
  };
  
  const handleOpenCamera = async () => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        alert("Camera not supported on this device.");
        return;
      }
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setCameraStream(stream);
      setShowCameraModal(true);
    } catch (err) {
      console.error("Error accessing camera:", err);
      alert("Failed to access camera. Please check your permissions.");
    }
  };

  const captureImage = () => {
    const video = document.getElementById("cameraFeed");
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageData = canvas.toDataURL("image/png");
    handleFileUpload(dataURItoBlob(imageData));
    stopCamera();
  };

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop());
    }
    setShowCameraModal(false);
  };

  const dataURItoBlob = (dataURI) => {
    const byteString = atob(dataURI.split(",")[1]);
    const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    const buffer = new ArrayBuffer(byteString.length);
    const data = new Uint8Array(buffer);

    for (let i = 0; i < byteString.length; i++) {
      data[i] = byteString.charCodeAt(i);
    }

    return new Blob([buffer], { type: mimeString });
  };

  const updateSettings = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${API_BASE_URL}/update-settings`,
        { language, nightMode },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
  
      alert("Settings updated successfully!");
      navigate("/home"); // Redirect to the home page
    } catch (err) {
      console.error("Error updating settings:", err);
    }
  };
  const handleRemovePicture = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `${API_BASE_URL}/remove-profile-picture`,
        {}, // Empty body
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
  
      setUser((prev) => ({ ...prev, profilePicture: defaultAvatar }));
      setShowProfileModal(false);
      alert("Profile picture removed successfully!");
    } catch (err) {
      console.error("Error removing profile picture:", err);
      alert("Failed to remove profile picture. Please try again.");
    }
  };
  


  return (
    <div className={`h-screen w-full flex flex-col `}>
      {/* Header */}
      <div className={`px-4 py-3 flex items-center`}>
        <button onClick={() => navigate(-1)} className="text-2xl mr-4">
          <i className="ri-arrow-left-line"></i>
        </button>
        <h1 className="text-xl font-semibold">Settings</h1>
      </div>

      {/* Profile Section */}
      <div className="bg-white dark:bg-gray-700 p-3 flex items-center gap-4 border-b rounded-lg">
      {console.log(user?.profilePicture)} {/* Debugging */}
      <img
  src={user?.profilePicture ? `${user.profilePicture}?${new Date().getTime()}` : defaultAvatar}
  alt="Profile"
  className="w-16 h-16 rounded-full cursor-pointer border"
  onClick={() => setShowProfileModal(true)}
/>



        <div >
          <h2 className="text-lg font-bold">{user?.fullname?.firstname || "Firstname"} {user?.fullname?.lastname || "Lastname"}</h2>
          <p className="text-gray-600 dark:text-gray-300">{user?.phonenumber || "Phone Number"}</p>
        </div>
      </div>

      {/* Settings Options */}
      <div className="flex flex-col mt-4 px-1 space-y-4">
        {/* Language */}
        <div className="bg-white dark:bg-gray-700 p-3 flex items-center gap-4 border-b rounded-lg">
          <i className="ri-global-line text-xl"></i>
          <span className="text-lg">Language</span>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="ml-auto px-2 py-1 border rounded"
          >
            <option value="en">English</option>
            <option value="ne">Nepali</option>
          </select>
        </div>

     {/* Night Mode */}
     <div className="bg-white dark:bg-gray-700 p-3 flex items-center gap-4 border-b rounded-lg">
          <i className="ri-moon-line text-xl"></i>
          <span className="text-lg">Night Mode</span>
          <input
            type="checkbox"
            className="ml-auto h-5 w-5"
            checked={nightMode}
            onChange={toggleNightMode}
          />
        </div>

        {/* Logout */}
        <div className="bg-white dark:bg-gray-700 p-3 flex items-center gap-4 border-b rounded-lg cursor-pointer" onClick={() => setShowLogoutModal(true)}>
          <i className="ri-logout-box-line text-xl text-black-500"></i>
          <span className="text-lg text-black-500">Logout</span>
        </div>

        {/* Delete Account */}
        <div className="bg-white dark:bg-gray-700 p-3 flex items-center gap-4 border-b rounded-lg cursor-pointer" onClick={() => setShowDeleteModal(true)}>
          <i className="ri-delete-bin-line text-xl text-black-500"></i>
          <span className="text-lg text-black-500">Delete Account</span>
        </div>
      </div>

      {/* Save Settings Button */}
      <div className="flex-grow"></div>
      <div className="px-4 py-3">
        <button
          onClick={updateSettings}
          className="bg-blue-500 text-white px-4 py-2 rounded-md w-full hover:bg-blue-600"
        >
          Save Settings
        </button>
      </div>

      {/* Profile Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-72">
            <h2 className="text-lg font-semibold mb-4">Choose an Option</h2>
            <button
              onClick={handleOpenCamera}
              className="w-full bg-blue-500 text-white py-2 rounded-md mb-2 hover:bg-blue-600"
            >
              Take a Picture
            </button>
            <button
              onClick={() => document.getElementById("galleryInput").click()}
              className="w-full bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600"
            >
              Choose from Gallery
            </button>
            <button
        onClick={handleRemovePicture}
        className="w-full bg-red-500 text-white py-2 rounded-md mt-2 hover:bg-red-600"
      >
        Remove Picture
      </button>
            <button
              onClick={() => setShowProfileModal(false)}
              className="w-full bg-gray-300 text-gray-800 py-2 rounded-md mt-4 hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Camera Modal */}
      {showCameraModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-72 flex flex-col items-center">
            <video
              id="cameraFeed"
              autoPlay
              playsInline
              style={{ width: "100%", borderRadius: "8px" }}
              ref={(video) => {
                if (video) video.srcObject = cameraStream;
              }}
            ></video>
            <div className="mt-4 flex gap-2">
              <button
                onClick={captureImage}
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
              >
                Capture
              </button>
              <button
                onClick={stopCamera}
                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hidden Input for Gallery */}
      <input
        type="file"
        accept="image/*"
        id="galleryInput"
        style={{ display: "none" }}
        onChange={(e) => handleFileUpload(e.target.files[0])}
      />

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-72">
            <h2 className="text-lg font-semibold mb-4">Confirm Logout</h2>
            <p className="mb-4">Are you sure you want to logout?</p>
            <div className="flex gap-4">
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Yes
              </button>
              <button
                onClick={() => setShowLogoutModal(false)}
                className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

 {/* Delete Account Modal */}
{showDeleteModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg p-6 w-72">
      <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
      <p className="mb-4">Are you sure you want to delete your account? This action is irreversible.</p>
      <div className="flex gap-4">
        <button
          onClick={handleDeleteAccount}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
        >
          Yes, Delete
        </button>
        <button
          onClick={() => setShowDeleteModal(false)}
          className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default Settings;
