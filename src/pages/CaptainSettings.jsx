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

        console.log("Fetched Captain Profile:", res.data.captain); // ✅ Debug API response

        if (res.data.captain) {
            setCaptain(res.data.captain);
            setTheme(res.data.captain.theme || "light");
            document.documentElement.setAttribute("data-theme", res.data.captain.theme || "light");
        }
    } catch (err) {
        console.error("Error fetching captain profile:", err);
    }
};



const handleFileUpload = async (file) => {
  if (!file) return;

  const formData = new FormData();
  formData.append("profilePicture", file);

  try {
      const token = localStorage.getItem("token");
      const res = await axios.post(`${API_BASE_URL}/upload-profilePicture`, formData, {
          headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
          },
      });

      console.log("Uploaded Profile Picture:", res.data); // ✅ Debug response

      // Ensure the correct image path is set
      setCaptain((prev) => ({
          ...prev,
          profilePicture: `/uploads/${res.data.profilePicture}`,
      }));

      setShowProfileModal(false);
  } catch (err) {
      console.error("Error uploading profile picture:", err);
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
    <div className="h-screen w-full flex flex-col">
      <div className="px-4 py-3 flex items-center">
        <button onClick={() => navigate(-1)} className="text-2xl mr-4">
          <i className="ri-arrow-left-line"></i>
        </button>
        <h1 className="text-xl font-semibold">Captain Settings</h1>
      </div>

      <div className="card bg-base-200 shadow-md p-4 flex items-center gap-4 mt-4">
<img
    src={captain?.profilePicture ? `http://localhost:4000${captain.profilePicture}?t=${new Date().getTime()}` : defaultAvatar}
    alt="Profile"
    className="w-16 h-16 rounded-full cursor-pointer border"
    onClick={() => setShowProfileModal(true)}
    onError={(e) => { e.target.onerror = null; e.target.src = defaultAvatar; }}
/>


        <div>
          <h2 className="text-lg font-bold">
            {captain?.fullname?.firstname || "Firstname"} {captain?.fullname?.lastname || "Lastname"}
          </h2>
          <p className="text-sm text-base-content/70">{captain?.phonenumber || "No phone number"}</p>
        </div>
      </div>


      <div className="flex flex-col mt-4 px-1 space-y-4">
      

   
        <div className="bg-white p-3 flex items-center gap-4 border-b rounded-lg">
  <i className="ri-palette-line text-xl"></i>
    <span className="text-lg">Theme</span>
    <select
    value={theme}
    onChange={handleThemeChange}
    className="ml-auto px-2 py-1 border rounded select select-bordered"
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
        <div className="bg-white p-3 flex items-center gap-4 border-b rounded-lg">
   <i className="ri-file-upload-line text-xl"></i>
        <h2 className="text-lg ">License</h2>
        <img
          src={captain?.license || defaultLicense}
          alt="License"
          className="w-40 h-24 object-cover border"
        />
        <button
          onClick={() => setShowLicenseModal(true)}
          className="ml-auto bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Upload License
        </button>
      </div>

        {/* Logout */}
        <div className="bg-white p-3 flex items-center gap-4 border-b rounded-lg cursor-pointer" onClick={() => setShowLogoutModal(true)}>
          <i className="ri-logout-box-line text-xl"></i>
          <span className="text-lg">Logout</span>
        </div>

        {/* Delete Account */}
        <div className="bg-white p-3 flex items-center gap-4 border-b rounded-lg cursor-pointer" onClick={() => setShowDeleteModal(true)}>
          <i className="ri-delete-bin-line text-xl"></i>
          <span className="text-lg">Delete Account</span>
        </div>
      </div>
{/* Upload License Modal */}
{showLicenseModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-72">
            <h2 className="text-lg font-semibold mb-4">Upload License</h2>
            <input type="file" accept="image/*" className="hidden" id="licenseInput" onChange={(e) => handleFileUpload(e.target.files[0], "license")} />
            <button onClick={() => document.getElementById("licenseInput").click()} className="w-full bg-blue-500 text-white py-2 rounded-md mb-2 hover:bg-blue-600">
              Choose from Gallery
            </button>
            <button
        onClick={() => setShowLicenseModal(false)}  // Close the modal
        className="w-full bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600"
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
              <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-md">Yes</button>
              <button onClick={() => setShowLogoutModal(false)} className="bg-gray-300 px-4 py-2 rounded-md">No</button>
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
              <button onClick={handleDeleteAccount} className="bg-red-500 text-white px-4 py-2 rounded-md">Yes</button>
              <button onClick={() => setShowDeleteModal(false)} className="bg-gray-300 px-4 py-2 rounded-md">No</button>
            </div>
          </div>
        </div>
      )}
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

    </div>
  );
};

export default CaptainSettings;
