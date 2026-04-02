import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

function Plan() {
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  // Get plan and price from URL query params
  const queryParams = new URLSearchParams(location.search);
  const plan = queryParams.get("type");
  const priceParam = queryParams.get("price");
  const price = priceParam ? Number(priceParam) : 0; // Convert to number

  if (!plan || !price) {
    // Redirect or show error if missing
    alert("Plan or price is missing in URL!");
    navigate("/subscribe");
    return null;
  }

  const handlePayment = async () => {
    try {
      // Call backend to create Razorpay order
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/payment/process`,
        { amount: price } // send as number
      );

      const order = data.order;

      const options = {
        key: "rzp_test_SYDNnZrYlyhqer", // Your Razorpay test key
        amount: order.amount,
        currency: "INR",
        name: "Netflix Clone",
        description: `${plan} Subscription`,
        order_id: order.id,
        handler: async function (response) {
          // Send payment verification to backend
          const verifyRes = await axios.post(
            `${import.meta.env.VITE_API_URL}/payment/verify`,
            {
              ...response,
              email,
              plan,
              price,
              country,
            }
          );

          if (verifyRes.data.success) {
            alert("Payment Successful");
            navigate("/home");
          } else {
            alert("Payment Failed");
          }
        },
        prefill: {
          email: email,
        },
        theme: {
          color: "#E50914",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment Error:", err);
      alert("Payment failed. Try again.");
    }
  };

  return (
    <>
      <h1>Subscribe to {plan} Plan</h1>
      <h2>Price: ₹{price}</h2>

      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <select
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        required
      >
        <option value="">Select Country</option>
        <option value="India">India</option>
        <option value="USA">USA</option>
      </select>

      <br />
      <br />

      <button onClick={handlePayment}>Pay Now</button>
    </>
  );
}

export default Plan;