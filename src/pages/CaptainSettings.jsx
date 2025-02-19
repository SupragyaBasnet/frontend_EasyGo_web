import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "remixicon/fonts/remixicon.css";
import defaultAvatar from "../assets/image.jpeg"; // Update with your default avatar path
import defaultLicense from "../assets/license-placeholder.jpg";

const API_BASE_URL = "http://localhost:4000/captains";

const CaptainSettings = () => {
  const navigate = useNavigate();
  const [captain, setCaptain] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showLicenseModal, setShowLicenseModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [cameraStream, setCameraStream] = useState(null);

  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    fetchCaptainProfile();
  }, []);

  const fetchCaptainProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API_BASE_URL}/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      console.log("✅ Fetched Captain Profile:", res.data.captain); // Debug API response
  
      if (res.data.captain) {
        setCaptain(res.data.captain);
        setTheme(res.data.captain.theme || "light");
        document.documentElement.setAttribute("data-theme", res.data.captain.theme || "light");
  
        console.log("✅ Updated State After Fetch:", res.data.captain);
      }
  
    } catch (err) {
      console.error("❌ Error fetching captain profile:", err);
    }
  };
  

const handleFileUpload = async (file, type) => {
  if (!file) return;

  const formData = new FormData();
  formData.append(type === "license" ? "licensePicture" : "profilePicture", file);

  try {
    const token = localStorage.getItem("token");
    const endpoint = type === "license" ? "upload-license" : "upload-profilePicture";
    
    const res = await axios.post(`${API_BASE_URL}/${endpoint}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    console.log(`✅ Uploaded ${type === "license" ? "License" : "Profile Picture"} Response:`, res.data);

    // Check if API response contains the correct path
    if (!res.data || !res.data[type === "license" ? "licensePicture" : "profilePicture"]) {
      console.error("❌ API did not return the correct file path!", res.data);
      return;
    }

    // ✅ Update state correctly
    setCaptain((prev) => {
      const updatedCaptain = {
        ...prev,
        [type === "license" ? "license" : "profilePicture"]: `/uploads/${res.data[type === "license" ? "licensePicture" : "profilePicture"]}`,
      };
      console.log("✅ Updated Captain State:", updatedCaptain); // Debugging
      return updatedCaptain;
    });

    // Close modal
    if (type === "license") {
      setShowLicenseModal(false);
    } else {
      setShowProfileModal(false);
    }

    // ✅ Force refresh after uploading license
    if (type === "license") {
      setTimeout(() => {
        window.location.reload(); 
      }, 1000);
    }

  } catch (err) {
    console.error(`❌ Error uploading ${type === "license" ? "license" : "profile picture"}:`, err);
  }
};



const handleRemovePicture = async () => {
  try {
      const token = localStorage.getItem("token");

      // Send request to remove profile picture
      await axios.put(`${API_BASE_URL}/remove-profilePicture`, {}, {
          headers: { Authorization: `Bearer ${token}` },
      });

      // ✅ Immediately update state to remove image
      setCaptain((prev) => ({ ...prev, profilePicture: "" })); // Use empty string

      console.log("Profile picture removed successfully!");

  } catch (err) {
      console.error("Error removing profile picture:", err);
  }
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

  const handleThemeChange = (e) => {
    const newTheme = e.target.value;
    setTheme(newTheme);
    handleUpdateSettings({ theme: newTheme });
  };


  const handleUpdateSettings = async (updatedSettings) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${API_BASE_URL}/update-settings`,
        updatedSettings,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update UI state
      setCaptain((prev) => ({ ...prev, ...updatedSettings }));

      // If theme is updated, apply it immediately
      if (updatedSettings.theme) {
        document.documentElement.setAttribute("data-theme", updatedSettings.theme);
      }
    } catch (err) {
      console.error("Error updating settings:", err);
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
        


 return (
  <div className="min-h-screen bg-base-100 p-6 flex flex-col gap-6">
    {/* Header */}
    <div className="flex items-center justify-between">
      <button onClick={() => navigate(-1)} className="btn btn-ghost text-xl">
        <i className="ri-arrow-left-line"></i> Captain Settings
      </button>
  
    </div>

    {/* Profile Card */}
    <div className="card bg-base-200 shadow-xl p-6 flex flex-col items-center gap-4">
      <img
        src={captain?.profilePicture ? `http://localhost:4000${captain.profilePicture}?t=${new Date().getTime()}` : defaultAvatar}
        alt="Profile"
        className="w-24 h-24 rounded-full border-4 border-primary object-cover cursor-pointer"
        onClick={() => setShowProfileModal(true)}
        onError={(e) => { e.target.onerror = null; e.target.src = defaultAvatar; }}
      />
      <div className="text-center">
        <h2 className="text-xl font-bold">
          {captain?.fullname?.firstname || "Firstname"} {captain?.fullname?.lastname || "Lastname"}
        </h2>
        <p className="text-sm text-gray-500">{captain?.phonenumber || "No phone number"}</p>
      </div>
    </div>

    {/* Settings Options */}
    <div className="flex flex-col gap-4">
      {/* Theme Selector */}
      <div className="flex items-center bg-base-200 p-4 rounded-lg shadow">
        <i className="ri-palette-line text-xl text-primary"></i>
        <span className="ml-3 text-lg font-medium">Theme</span>
        <select
          value={theme}
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

      {/* Upload License */}
      <div className="flex items-center bg-base-200 p-4 rounded-lg shadow">
        <i className="ri-file-upload-line text-xl text-primary"></i>
        <span className="ml-3 text-lg font-medium">License</span>
        <img
  src={captain?.license ? `http://localhost:4000${captain.license}?t=${new Date().getTime()}` : defaultLicense}
  alt="License"
  className="w-24 h-16 ml-auto object-cover border rounded-md"
  onError={(e) => { 
    console.error("Error loading license image:", e.target.src); 
    e.target.onerror = null; 
    e.target.src = defaultLicense; 
  }}
/>

        <button
          onClick={() => setShowLicenseModal(true)}
          className="btn btn-primary ml-4"
        >
          Upload
        </button>
      </div>

      {/* Logout Button */}
      <div className="flex items-center bg-base-200 p-4 rounded-lg shadow cursor-pointer hover:bg-error hover:text-white transition" onClick={() => setShowLogoutModal(true)}>
        <i className="ri-logout-box-line text-xl"></i>
        <span className="ml-3 text-lg font-medium">Logout</span>
      </div>

      {/* Delete Account Button */}
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
          <button onClick={() => setShowProfileModal(false)} className="btn bg-gray-200 text-gray-800 w-full mt-4">
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

    {/* License Upload Modal */}
    {showLicenseModal && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-72">
          <h2 className="text-lg font-semibold mb-4">Upload License</h2>
          <input type="file" accept="image/*" className="hidden" id="licenseInput" onChange={(e) => handleFileUpload(e.target.files[0], "license")} />
          <button onClick={() => document.getElementById("licenseInput").click()} className="btn btn-primary w-full mb-2">
            Choose from Gallery
          </button>
          <button onClick={() => setShowLicenseModal(false)} className="btn btn-neutral w-full">
            Cancel
          </button>
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
  onChange={(e) => handleFileUpload(e.target.files[0], "profile")}
/>

  </div>
);

};

export default CaptainSettings;
