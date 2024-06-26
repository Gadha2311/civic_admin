import { useState } from "react";
import { message } from "antd";
import Axios from "../axios";
import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "../context/adminAuthcontext";

const useAdminLogin = () => {
  const { Adminlogin } = useAdminAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const Navigate = useNavigate();

  const LoginAdmin = async (values) => {
    try {
      setError(null);
      setLoading(false);

      const res = await Axios.post("/auth/adminlogin", values);
      console.log(res);
      const data = res.data;
      if (res.status === 200) {
        message.success(data.message);
        Adminlogin(data.token, data.user);
        Navigate("/dashbord");
      } else if (res.status === 404) {
        setError(data.message);
      } else {
        message.error("Registration Failed");
      }
    } catch (error) {
      message.error("error occured in register");
    }
  };
  return { loading, error, LoginAdmin };
};

export default useAdminLogin;
