// import React, { createContext, useEffect, useState } from "react";

// export const AuthContext = createContext();

// const AuthProvider = ({ children }) => {
//   const [userType, setUserType] = useState(null); // "user" or "captain"

//   useEffect(() => {
//     const storedUserType = localStorage.getItem("userType");
//     if (storedUserType) setUserType(storedUserType);
//   }, []);

//   return (
//     <AuthContext.Provider value={{ userType, setUserType }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthProvider;
