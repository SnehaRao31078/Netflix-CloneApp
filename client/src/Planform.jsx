import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function Plan() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [card, setCard] = useState("");
  const [holder, setHolder] = useState("");
  const [country, setCountry] = useState("");
  const [plan, setPlan] = useState("");
  const [price, setPrice] = useState("");

  // ✅ SAME as AddProduct (prefill)
  useEffect(() => {
    if (id) {
      axios
        .get(`${import.meta.env.VITE_API_URL}/plans/${id}`)
        .then((res) => {
          setEmail(res.data.email);
          setCard(res.data.card);
          setHolder(res.data.holder);
          setCountry(res.data.country);
          setPlan(res.data.plan);     // ✅ important
          setPrice(res.data.price);   // ✅ important
        })
        .catch((err) => console.log(err));
    }
  }, [id]);

  // ✅ SAME as AddProduct submit logic
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      email,
      card,
      holder,
      country,
      plan,
      price,
    };

    try {
      if (id) {
        await axios.put(
          `${import.meta.env.VITE_API_URL}/plans/${id}`,
          data
        );
        alert("Updated Successfully");
      } else {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/plans`,
          data
        );
        alert("Added Successfully");
      }

      navigate("/viewsub"); // or /home (your choice)
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="product-page">
      <div className="product-wrapper">
        <div className="container">
          <h1>{id ? "Update Plan" : "Add Plan"}</h1>

          <form onSubmit={handleSubmit}>
            <input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              placeholder="Card Details"
              value={card}
              onChange={(e) => setCard(e.target.value)}
            />

            <input
              placeholder="Cardholder Name"
              value={holder}
              onChange={(e) => setHolder(e.target.value)}
            />

            <select
              className="inputfield"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              <option value="">Select Country</option>
              <option value="india">India</option>
            </select>

            {/* ✅ IMPORTANT: Plan dropdown */}
            <select
              className="inputfield"
              value={plan}
              onChange={(e) => setPlan(e.target.value)}
            >
              <option value="">Select Plan</option>
              <option value="basic">Basic</option>
              <option value="Standard">Standard</option>
              <option value="premium">Premium</option>
            </select>

            {/* ✅ Price */}
            <input
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />

            <button type="submit">
              {id ? "Update Plan" : "Add Plan"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Plan;