import React, {useState} from "react";

import "./adminlogin.scss";
import Password from "antd/es/input/Password";
import useAdminLogin from "../../hooks/useAdminlogin";

const Form = () => {
  const { loading, error, LoginAdmin } = useAdminLogin();
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    console.log(name, value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    LoginAdmin(formValues);
    console.log(formValues);
  };
  return (
    <div className="adminlogin-container">
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <h4>Email</h4>
          <input
            type="text"
            id="email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
            className="email"
            placeholder="email"
            required
          />
        </div>
        <div className="input-group">
          <h4>Password</h4>
          <input
            type="password"
            id="password"
            name="password"
            value={formValues.password}
            onChange={handleChange}
            className="password"
            placeholder="Password"
            required
          />
        </div>
        <div className="login-btn">
          <button className="login-btn" type="submit">
            Login
          </button>
          <br />
        </div>
      </form>
    </div>
  );
};

const adminlogin = () => {
  return (
    <>
      <Form />
    </>
  );
};

export default adminlogin;
