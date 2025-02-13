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

  const [nightMode, setNightMode] = useState(false);
  const [daisyTheme, setDaisyTheme] = useState("light");

useEffect(() => {
  // Load theme from localStorage (if available)
  const storedTheme = localStorage.getItem("daisyTheme") || "light";
  setDaisyTheme(storedTheme);
  document.documentElement.setAttribute("data-theme", storedTheme);
}, []);

const handleThemeChange = (e) => {
  const newTheme = e.target.value;
  setDaisyTheme(newTheme);
  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("daisyTheme", newTheme); // Store in local storage
};


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
  
      // **Immediately update the state to reflect new profile image**
      setUser((prev) => ({
        ...prev,
        profilePicture: `http://localhost:4000${res.data.user.profilePicture}?t=${new Date().getTime()}`,
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
  
    // Convert to Data URL
    const imageData = canvas.toDataURL("image/png");
  
    // Convert Data URL to Blob
    const imageBlob = dataURItoBlob(imageData);
  
    // **Set the new image immediately in the UI**
    const previewUrl = URL.createObjectURL(imageBlob);
    setUser((prev) => ({ ...prev, profilePicture: previewUrl }));
  
    // **Upload the file to the server**
    handleFileUpload(imageBlob);
  
    // **Stop camera only after the image is updated**
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
    <div className="min-h-screen w-full flex flex-col bg-base-100 p-6 gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="btn btn-ghost text-xl">
          <i className="ri-arrow-left-line"></i> Settings
        </button>
      </div>
  
      {/* Profile Section */}
      <div className="card bg-base-200 shadow-md p-6 flex items-center gap-4">
        <img
          src={
            user?.profilePicture
              ? `http://localhost:4000${user.profilePicture}?t=${new Date().getTime()}`
              : defaultAvatar
          }
          alt="Profile"
          className="w-24 h-24 rounded-full border-4 border-primary object-cover cursor-pointer transition-all hover:scale-105"
          onClick={() => setShowProfileModal(true)}
          onError={(e) => { e.target.onerror = null; e.target.src = defaultAvatar; }}
        />
        <div className="text-center">
          <h2 className=" font-bold capitalize">
            {user?.fullname?.firstname || "Firstname"} {user?.fullname?.lastname || "Lastname"}
          </h2>
          <p className="text-sm text-gray-500">{user?.phonenumber || "No phone number"}</p>
        </div>
      </div>
  
      {/* Settings Options */}
      <div className="flex flex-col gap-4">
        {/* Theme Selector */}
        <div className="flex items-center bg-base-200 p-4 rounded-lg shadow">
          <i className="ri-palette-line text-xl text-primary"></i>
          <span className="ml-3 text-lg font-medium">Theme</span>
          <select
            value={daisyTheme}
            onChange={handleThemeChange}
            className="ml-auto select select-bordered"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="cupcake">Cupcake</option>
            <option value="corporate">Corporate</option>
            <option value="synthwave">Synthwave</option>
            <option value="retro">Retro</option>
            <option value="cyberpunk">Cyberpunk</option>
            <option value="valentine">Valentine</option>
            <option value="halloween">Halloween</option>
          </select>
        </div>
  
        {/* Logout */}
        <div className="flex items-center bg-base-200 p-4 rounded-lg shadow cursor-pointer hover:bg-error hover:text-white transition" onClick={() => setShowLogoutModal(true)}>
          <i className="ri-logout-box-line text-xl"></i>
          <span className="ml-3 text-lg font-medium">Logout</span>
        </div>
  
        {/* Delete Account */}
        <div className="flex items-center bg-base-200 p-4 rounded-lg shadow cursor-pointer hover:bg-red-500 hover:text-white transition" onClick={() => setShowDeleteModal(true)}>
          <i className="ri-delete-bin-line text-xl"></i>
          <span className="ml-3 text-lg font-medium">Delete Account</span>
        </div>
      </div>
  
      {/* Profile Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-72">
            <h2 className="text-lg font-semibold mb-4">Choose an Option</h2>
            <button onClick={handleOpenCamera} className="btn btn-primary w-full mb-2">
              Take a Picture
            </button>
            <button onClick={() => document.getElementById("galleryInput").click()} className="btn bg-orange-500 text-white w-full mb-2">
              Choose from Gallery
            </button>
            <button onClick={handleRemovePicture} className="btn btn-error w-full">
              Remove Picture
            </button>
            <button onClick={() => setShowProfileModal(false)} className="btn btn-neutral w-full mt-4">
              Cancel
            </button>
          </div>
        </div>
      )}
  
      {/* Camera Modal */}
      {showCameraModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-72 flex flex-col items-center">
            <video
              id="cameraFeed"
              autoPlay
              playsInline
              className="w-full rounded-lg border"
              ref={(video) => {
                if (video) video.srcObject = cameraStream;
              }}
            ></video>
            <div className="flex gap-4 mt-4">
              <button onClick={captureImage} className="btn btn-primary">Capture</button>
              <button onClick={stopCamera} className="btn btn-error">Cancel</button>
            </div>
          </div>
        </div>
      )}
  
      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-72">
            <h2 className="text-lg font-semibold mb-4">Confirm Logout</h2>
            <p className="text-gray-500">Are you sure you want to logout?</p>
            <div className="flex gap-4 mt-4">
              <button onClick={handleLogout} className="btn btn-error">Yes</button>
              <button onClick={() => setShowLogoutModal(false)} className="btn btn-neutral">No</button>
            </div>
          </div>
        </div>
      )}
  
      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-72">
            <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
            <p className="text-gray-500">Are you sure you want to delete your account?</p>
            <div className="flex gap-4 mt-4">
              <button onClick={handleDeleteAccount} className="btn btn-error">Yes</button>
              <button onClick={() => setShowDeleteModal(false)} className="btn btn-neutral">No</button>
            </div>
          </div>
        </div>
      )}
  
      {/* Hidden Input for Gallery */}
      <input
        type="file"
        accept="image/*"
        id="galleryInput"
        className="hidden"
        onChange={(e) => handleFileUpload(e.target.files[0])}
      />
    </div>
  );
  
};

export default Settings;
