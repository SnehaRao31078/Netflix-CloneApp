import React, { useState, useEffect } from "react";
import axios from "axios";
import "./security.css";

function Security() {
  
const [email, setEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();

   
    if (!newEmail && !newPassword) {
      alert("Enter something to update");
      return;
    }

    try {
      const res = await axios.put(`${import.meta.env.VITE_API_URL}/update-user`, {
        email,
        newEmail,
        newPassword,
      });

      alert(res.data.message);


      if (newEmail) {
        localStorage.setItem("userEmail", newEmail);
        setEmail(newEmail);
      }

      
      setNewEmail("");
      setNewPassword("");

    } catch (err) {
      console.log(err);
      alert("Error updating user");
    }
  };
  return (
    <div className="security-container">
      <h1>Security Settings</h1>

      
      <form >
        <input
          type="email"
          placeholder="Enter New Email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <button type="submit">
          Update
        </button>
      </form>
    </div>
  );
}

export default Security;