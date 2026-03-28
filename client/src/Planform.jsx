import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function Plan() {
  const { id } = useParams(); // ✅ SAME AS AddProduct
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [card, setCard] = useState("");
  const [holder, setHolder] = useState("");
  const [country, setCountry] = useState("");
  const [plan, setPlan] = useState("");
  const [price, setPrice] = useState("");

  // ✅ SAME LOGIC AS AddProduct (prefill)
  useEffect(() => {
    if (id) {
      axios
        .get(`${import.meta.env.VITE_API_URL}/plans/${id}`)
        .then((res) => {
          setEmail(res.data.email);
          setCard(res.data.card);
          setHolder(res.data.holder);
          setCountry(res.data.country);
          setPlan(res.data.plan);
          setPrice(res.data.price);
        })
        .catch((err) => console.log(err));
    }
  }, [id]);

  // ✅ SAME SUBMIT LOGIC
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
        // UPDATE
        await axios.put(
          `${import.meta.env.VITE_API_URL}/plans/${id}`,
          data
        );
        alert("Updated Successfully");
      } else {
        // ADD
        await axios.post(
          `${import.meta.env.VITE_API_URL}/plans`,
          data
        );
        alert("Added Successfully");
      }

      navigate("/viewsub");
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
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              <option value="">Select Country</option>
              <option value="india">India</option>
            </select>

            <select
              value={plan}
              onChange={(e) => setPlan(e.target.value)}
            >
              <option value="">Select Plan</option>
              <option value="basic">Basic</option>
              <option value="Standard">Standard</option>
              <option value="premium">Premium</option>
            </select>

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