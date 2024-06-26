import React, { createContext, useContext, useEffect, useState } from "react";

const AdminAuthcontext = createContext();

export const AdminAuthprovider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userdata, setUserdata] = useState(null);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const storedData = JSON.parse(localStorage.getItem("user_data"));

  useEffect(() => {
    if (storedData) {
      const { userToken, user } = storedData;
      setToken(userToken);
      setUserdata(user);
      setIsAdminAuthenticated(true);
    }
  }, []);

  const Adminlogin = (newToken, newData) => {
    localStorage.setItem(
      "user_data",
      JSON.stringify({ userToken: newToken, user: newData })
    );
    setToken(newToken);
    setUserdata(newData);
    setIsAdminAuthenticated(true);
  };
  const Adminlogout = () => {
    localStorage.removeItem("user_data");
    setToken(null);
    setUserdata(null);
    setIsAdminAuthenticated(false);
  };
  return (
    <AdminAuthcontext.Provider
      value={{ token, isAdminAuthenticated, Adminlogin, Adminlogout }}
    >
      {children}
    </AdminAuthcontext.Provider>
  );
};

export const useAdminAuth = () => useContext(AdminAuthcontext);
