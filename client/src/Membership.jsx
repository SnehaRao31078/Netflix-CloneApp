import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./memeber.css";

function Membership() {
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [planData, setPlanData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const email = localStorage.getItem("userEmail");

        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/plans/${email}`
        );

        setUser(res.data.user);
        setPlanData(res.data.plan);

      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="membership-container">
      <h2>Membership & Billing</h2>

      <table className="membership-table">
        <thead>
          <tr>
            <th>Email</th>
            <th>Plan</th>
            <th>Price</th>
          
            <th>Payment ID</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>{user?.email}</td>
            <td>{planData?.plan}</td>
            <td>₹{planData?.price}</td>
            
            <td>{planData?.paymentId}</td>
          </tr>
        </tbody>
      </table>

      <button
        className="update-btn"
        onClick={() => navigate("/subscribe")}
      >
        Update Plan
      </button>
    </div>
  );
}

export default Membership;