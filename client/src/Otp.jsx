import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function Otp() {
  const [otp, setOtp] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;
  const password = location.state?.password;

  /*const verifyOtp = (e) => {
    e.preventDefault();

    axios.post(`${import.meta.env.VITE_API_URL}/verify-otp`, { email, otp })
      .then(res => {
        if (res.data.status === "SUCCESS") {
        
          localStorage.setItem("userEmail", res.data.email);
          localStorage.setItem("userPlan", res.data.plan || "");

          
          if (res.data.plan) {
            navigate("/home"); 
          } else {
            navigate("/subscribe"); 
          }
        } else {
          alert(res.data.status);
        }
      })
      .catch(err => console.log(err));
  };*/

  const verifyOtp = (e) => {
    e.preventDefault();

    axios.post(`${import.meta.env.VITE_API_URL}/verify-otp`, { email, otp })
      .then(res => {
        if (res.data.status === "SUCCESS") {

          localStorage.setItem("userEmail", email);

          navigate("/home");

        } else {
          alert(res.data.status);
        }
      })
      .catch(err => console.log(err));
  };

  const resendOtp = () => {
    axios.post(`${import.meta.env.VITE_API_URL}/signin`, {
      email,
      password
    })
    .then(() => {
      alert("OTP Resent Successfully");
    })
    .catch(() => {
      alert("Error resending OTP");
    });
  };

  return (
    <div style={{ textAlign: "center", marginTop: "150px" }}>
      <p className="logo-p">NETFLIX</p>
      <h2>Enter OTP</h2>
      <form onSubmit={verifyOtp}>
        <input 
          className="otp"
          type="text"
          placeholder="Enter OTP"
          onChange={(e) => setOtp(e.target.value)}
        />
        <br/><br/>
        <button type="submit" className="otp-btn" >Verify OTP</button>
        <br>
        </br>
        <button type="button" onClick={resendOtp}>
  Resend OTP
</button>
      </form>
    </div>
  );
}

export default Otp;