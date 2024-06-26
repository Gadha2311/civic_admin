import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Axios from "../../axios";
import "./editUser.scss";

const EditUser = ({ user, onClose, onUpdateUserList }) => {
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);

  const handleSave = async () => {
    try {
      const response = await Axios.put(`/auth/edituser/${user._id}`, {
        username,
        email,
      });
      const updatedUser = response.data;
      Swal.fire("Updated!", "The user has been updated.", "success");
      onUpdateUserList(updatedUser);
      onClose();
    } catch (error) {
      console.error("Error updating user:", error);
      Swal.fire("Error!", "There was an error updating the user.", "error");
    }
  };

  return (
    <div className="edit-user-modal">
      <h3>Edit User</h3>
      <label>Username:</label>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <label>Email:</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleSave}>Save</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default EditUser;
