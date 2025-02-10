import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "remixicon/fonts/remixicon.css";
import defaultAvatar from "../assets/image.jpeg"; // Update with your default avatar path

const API_BASE_URL = "http://localhost:4000/captains";

const CaptainSettings = () => {
  const navigate = useNavigate();
  const [captain, setCaptain] = useState(null);

  
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showLicenseModal, setShowLicenseModal] = useState(false);
  const [cameraStream, setCameraStream] = useState(null);
  const [language, setLanguage] = useState("en");
  const [nightMode, setNightMode] = useState(false);

  useEffect(() => {
    fetchCaptainProfile();
  }, []);

  const fetchCaptainProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API_BASE_URL}/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      if (res.data && res.data.captain) {
        setCaptain(res.data.captain); // ✅ Set state only if data exists
        setLanguage(res.data.captain.language || "en");
        setNightMode(res.data.captain.nightMode || false);
        document.documentElement.className = res.data.captain.nightMode
          ? "theme-dark"
          : "theme-light";
      } else {
        console.error("Captain data is missing", res.data);
        setCaptain(null); // ✅ Set to null instead of empty object
      }
    } catch (err) {
      console.error("Error fetching captain profile:", err);
      setCaptain(null); // ✅ Keep `captain` null on error
    }
  };
  

  const handleFileUpload = async (file, type) => {
    if (!file) return;

    const formData = new FormData();
    formData.append(type, file);

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(`${API_BASE_URL}/upload-${type}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setCaptain((prev) => ({
        ...prev,
        [type]: res.data.captain[type],
      }));

      if (type === "profilePicture") setShowProfileModal(false);
      if (type === "license") setShowLicenseModal(false);
    } catch (err) {
      console.error(`Error uploading ${type}:`, err);
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
      navigate("/captain-login");
    } catch (err) {
      console.error("Error logging out:", err);
    }
  };

  const handleRemovePicture = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(`${API_BASE_URL}/remove-profile-picture`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      console.log("Backend Response:", res.data);
  
      // ✅ Update the frontend profile picture
      setCaptain((prev) => ({
        ...prev,
        profilePicture: res.data.profilePicture, // ✅ Use backend response
      }));
  
      setShowProfileModal(false);
      alert("Profile picture removed successfully!");
    } catch (err) {
      console.error("Error removing profile picture:", err);
      alert("Failed to remove profile picture. Please try again.");
    }
  };
  
  
  const handleDeleteAccount = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_BASE_URL}/delete`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      localStorage.removeItem("token");
      navigate("/captain-signup");
    } catch (err) {
      console.error("Error deleting account:", err);
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
    const blob = dataURItoBlob(imageData);
    handleFileUpload(blob, "profilePicture");
    stopCamera();
  };

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop());
      setCameraStream(null);
    }
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
      navigate("/captain-home");
    } catch (err) {
      console.error("Error updating settings:", err);
    }
  };

  return (
    <div className="h-screen w-full flex flex-col">
      {/* Header */}
      <div className="px-4 py-3 flex items-center">
        <button onClick={() => navigate(-1)} className="text-2xl mr-4">
          <i className="ri-arrow-left-line"></i>
        </button>
        <h1 className="text-xl font-semibold">Captain Settings</h1>
      </div>

      {/* Profile Section */}
      {/* Profile Section */}
<div className="bg-white dark:bg-gray-700 p-3 flex items-center gap-4 border-b rounded-lg">
  <img
    src={captain?.profilePicture || defaultAvatar} // ✅ Use optional chaining to avoid undefined error
    alt="Profile"
    className="w-16 h-16 rounded-full cursor-pointer border"
    onClick={() => setShowProfileModal(true)} // ✅ Open modal on click
  />

  {captain ? (
    <div>
      <h2 className="text-lg font-bold">
        {captain.fullname?.firstname || "Firstname"} {captain.fullname?.lastname || "Lastname"}
      </h2>
      <p className="text-gray-600 dark:text-gray-300">{captain.phonenumber || "Phone Number"}</p>
    </div>
  ) : (
    <p>Loading...</p> // ✅ Show "Loading..." instead of crashing on undefined `captain`
  )}
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
      
         {/* Upload License Button */}
      <div
        className="bg-white dark:bg-gray-700 p-3 flex items-center gap-4 border-b rounded-lg cursor-pointer mt-4"
        onClick={() => setShowLicenseModal(true)}
      >
        <i className="ri-file-upload-line text-xl"></i>
        <span className="text-lg">Upload License</span>
        {/* License Display */}
        <div className="mt-4 px-1">
        <h2>Uploaded License</h2>
  <p>{captain?.license ? <img src={captain.license} alt="License" /> : "No license uploaded."}</p>
      </div>
      </div>
            
        {/* Logout */}
        <div
          className="bg-white dark:bg-gray-700 p-3 flex items-center gap-4 border-b rounded-lg cursor-pointer"
          onClick={() => setShowLogoutModal(true)}
        >
          <i className="ri-logout-box-line text-xl"></i>
          <span className="text-lg">Logout</span>
        </div>
    


        {/* Delete Account */}
        <div
          className="bg-white dark:bg-gray-700 p-3 flex items-center gap-4 border-b rounded-lg cursor-pointer"
          onClick={() => setShowDeleteModal(true)}
        >
          <i className="ri-delete-bin-line text-xl"></i>
          <span className="text-lg">Delete Account</span>
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
      <h2 className="text-lg font-semibold mb-4">Upload Profile Picture</h2>

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
        onClick={() => setShowProfileModal(false)} // ✅ Close modal when clicked
        className="w-full bg-gray-300 text-gray-800 py-2 rounded-md mt-4 hover:bg-gray-400"
      >
        Cancel
      </button>

      <input
        type="file"
        accept="image/*"
        id="galleryInput"
        style={{ display: "none" }}
        onChange={(e) => handleFileUpload(e.target.files[0], "profilePicture")}
      />
    </div>
  </div>
)}


      {/* License Modal */}
      {showLicenseModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-72">
            <h2 className="text-lg font-semibold mb-4">Upload License</h2>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileUpload(e.target.files[0], "license")}
            />
            <button
              onClick={() => setShowLicenseModal(false)}
              className="mt-4 w-full bg-gray-300 py-2 rounded-md"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-72">
            <h2 className="text-lg font-semibold mb-4">Confirm Logout</h2>
            <p className="mb-4">Are you sure you want to logout?</p>
            <div className="flex gap-4">
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-md"
              >
                Yes
              </button>
              <button
                onClick={() => setShowLogoutModal(false)}
                className="bg-gray-300 px-4 py-2 rounded-md"
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
            <p className="mb-4">Are you sure you want to delete your account?</p>
            <div className="flex gap-4">
              <button
                onClick={handleDeleteAccount}
                className="bg-red-500 text-white px-4 py-2 rounded-md"
              >
                Yes
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="bg-gray-300 px-4 py-2 rounded-md"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CaptainSettings;
