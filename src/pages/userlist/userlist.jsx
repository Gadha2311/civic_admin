import React from "react";
import Sidebar from "../../components/sidebar/sidebar";
import "./userlist.scss";
import { useState, useEffect } from "react";
import Axios from "../../axios";
import Swal from "sweetalert2";
import axios from "axios";
import EditUser from "../EditUser/editUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [searchtext, setSearchtext] = useState("");
  const [userlist, setUserlist] = useState([]);
  const [showsort, setShowsort] = useState(false);
  const [editUserId, setEditUserId] = useState(null);
  const [showedit, setShowedit] = useState(false);

  //******************************************************get userlist from server*****************************************************//
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await Axios.get("/auth/userlist");
        setUsers(response.data);
        setUserlist(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  //*******************************************************search user**************************************************************//
  const handleSearch = () => {
    if (searchtext === "") {
      setUserlist(users);
    } else {
      const filteredData = users.filter((user) =>
        user.username.toLowerCase().includes(searchtext.toLowerCase())
      );
      setUserlist(filteredData);
    }
  };

  //*********************************************************block and unblock***************************************************//
  const BlockStatus = async (userId, currentStatus) => {
    Swal.fire({
      title: `Are you sure you want to ${
        currentStatus ? "unblock" : "block"
      } this user?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const endpoint = currentStatus
            ? `/auth/unblock/${userId}`
            : `/auth/block/${userId}`;
          await Axios.put(endpoint, { blocked: !currentStatus });

          setUserlist((prevUsers) =>
            prevUsers.map((user) =>
              user._id === userId ? { ...user, blocked: !currentStatus } : user
            )
          );

          Swal.fire(
            `${currentStatus ? "Unblocked" : "Blocked"}!`,
            `The user has been ${currentStatus ? "unblocked" : "blocked"}.`,
            "success"
          );
        } catch (error) {
          console.error("Error updating user:", error);
          Swal.fire(
            "Error!",
            "There was an error updating the user. Please try again.",
            "error"
          );
        }
      }
    });
  };

  //*************************************************************sorting**************************************************************//
  const handlesort = () => {
    setShowsort(!showsort);
  };

  const sortAZ = () => {
    const sortedUsers = [...userlist].sort((a, b) =>
      a.username.localeCompare(b.username)
    );
    setUserlist(sortedUsers);
    setShowsort(false);
  };

  const sortZA = () => {
    const sortedUsers = [...userlist].sort((a, b) =>
      b.username.localeCompare(a.username)
    );
    setUserlist(sortedUsers);
    setShowsort(false);
  };

  const handleEditUser = (userId) => {
    setEditUserId(userId);
    setShowedit(true);
  };

  const handleCloseEdit = () => {
    setShowedit(false);
    setEditUserId(null);
  };

  const handleUpdateUserList = (updatedUser) => {
    setUserlist((prevUsers) =>
      prevUsers.map((user) =>
        user._id === updatedUser._id ? updatedUser : user
      )
    );
  };

  //********************************************************deleteuser***************************************************************//
  const Deleteuser = async (userId) => {
    Swal.fire({
      title: `Are you sure you want to Delete this user?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await Axios.delete(`/auth/deleteuser/${userId}`);
          setUserlist((prevUsers) =>
            prevUsers.filter((user) => user._id !== userId)
          );
          Swal.fire("Deleted", "The user has been Deleted", "success");
        } catch (error) {}
      }
    });
  };

  return (
    <div className="user-table">
      <h2>User List</h2>
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search"
          value={searchtext}
          onChange={(e) => {
            setSearchtext(e.target.value);
          }}
        />
        <button className="usersearch-btn" onClick={handleSearch}>
          Search
        </button>
        <div className="sort-container">
          <button className="sort-btn" onClick={handlesort}>
            Sort
          </button>
          {showsort && (
            <div className="sortfrom">
              {" "}
              <button className="AZ-btn" onClick={sortAZ}>
                A-Z
              </button>{" "}
              <button className="AZ-btn" onClick={sortZA}>
                Z-A
              </button>
            </div>
          )}
        </div>
      </div>

      <table>
        <thead>
          <tr>
            {/* <th>ID</th> */}
            <th>Name</th>
            <th>Email</th>
            <th>Profile Picture</th>
            <th>Status</th>
            {/* <th>Is Verified</th> */}
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {userlist.map((user) => (
            <tr key={user._id}>
              {/* <td>{user._id}</td> */}
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                <img src={user.profilePicture} alt="Profile" width="50" />
              </td>
              <td>{user.blocked ? "Blocked" : "Unblocked"}</td>
              <td>
                <button
                  className={`block-btn ${user.blocked ? "unblock" : "block"}`}
                  onClick={() => BlockStatus(user._id, user.blocked)}
                >
                  {user.blocked ? "Unblock" : "Block"}
                </button>
              </td>
              <td>
                <button className="delete-btn">
                  <i>
                    {" "}
                    <FontAwesomeIcon
                      icon={faTrash}
                      onClick={() => Deleteuser(user._id)}
                    />
                  </i>
                </button>
              </td>
              <td>
                <button className="edit-btn">
                  {" "}
                  <i>
                    <FontAwesomeIcon
                      icon={faEdit}
                      onClick={() => handleEditUser(user._id)}
                    />
                  </i>
                </button>
              </td>
              {/* <td>{user.isVerified ? 'Yes' : 'No'}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
      {showedit && (
        <EditUser
          user={userlist.find((user) => user._id === editUserId)}
          onClose={handleCloseEdit}
          onUpdateUserList={handleUpdateUserList}
        />
      )}
    </div>
  );
};

const userlist = () => {
  return (
    <>
      <Sidebar />
      <UserTable />
    </>
  );
};
export default userlist;
