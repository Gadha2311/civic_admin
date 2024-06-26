import { useState } from "react";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faFlag,
  faHome,
  faSignOutAlt,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { useAdminAuth } from "../../context/adminAuthcontext";
import { useNavigate } from "react-router-dom";
import "./sidebar.scss";
const Sidebar = () => {
  const { Adminlogout } = useAdminAuth();
  const navigate = useNavigate();
  const [Showmenu, setShowmenu] = useState(false);

  //for showing menulist
  const handleclick = () => {
    if (Showmenu === false) {
      setShowmenu(true);
    } else {
      setShowmenu(false);
    }
  };

  //logout
  const handleLogout = () => {
    Adminlogout();
    navigate("/adminlogin");
  };

  //redirect to userlisting page
  const handleuser = () => {
    navigate("/userlist");
  };
  return (
    <div className="side-container">
      <button className="btn" onClick={handleclick}>
        <FontAwesomeIcon icon={faBars} /> Menu
      </button>
      {Showmenu && (
        <ul>
          <p>
            <li>
              <FontAwesomeIcon icon={faHome} /> Home
            </li>
          </p>
          <p onClick={handleuser}>
            <li>
              <FontAwesomeIcon icon={faUsers} /> Users
            </li>
          </p>
          <p>
            <li>
              <FontAwesomeIcon icon={faFlag} /> Reported Post
            </li>
          </p>
          <p onClick={handleLogout}>
            <li>
              <FontAwesomeIcon icon={faSignOutAlt} /> Logout
            </li>
          </p>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
