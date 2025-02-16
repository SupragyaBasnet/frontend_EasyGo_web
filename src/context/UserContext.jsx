import React, { createContext, useState } from "react";

export const UserDataContext = createContext();

const UserContext = ({ children }) => {
  const [user, setUser] = useState({
    _id: "",
    email: "",
    phonenumber: "",
    fullname: {
      firstname: "",
      lastname: "",
    },
  });

  const value = {
    user,
    setUser
  };

  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  );
};

export default UserContext;