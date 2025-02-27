import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const CaptainDataContext = createContext();

const CaptainContext = ({ children }) => {
  const [captain, setCaptain] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCaptainDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("User not authenticated. Please log in.");
          setIsLoading(false);
          return;
        }
  
        console.log("Fetching captain details...");
  
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/captains/profile`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
  
        console.log("Captain details fetched:", response.data);
        setCaptain(response.data.captain);
        console.log("Captain in Context after fetching:", response.data.captain);
      console.log("Total Fare:", response.data.captain?.totalFare);

        setError(null);
      } catch (err) {
        console.error("Error fetching captain details:", err.response || err.message);
        setError(err.response?.data?.message || "Failed to load captain details. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchCaptainDetails();
  }, []);
  

  const value = {
    captain,
    setCaptain,
    isLoading,
    error,
  };

  return (
    <CaptainDataContext.Provider value={value}>
      {children}
    </CaptainDataContext.Provider>
  );
};

export default CaptainContext;