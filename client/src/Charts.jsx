import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import axios from "axios";

function Charts() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/plans`);

        let basic = 0;
        let standard = 0;
        let premium = 0;

       
        res.data.forEach((item) => {
          if (item.plan.toLowerCase() === "basic") basic++;
          else if (item.plan.toLowerCase() === "standard") standard++;
          else if (item.plan.toLowerCase() === "premium") premium++;
        });

        // set chart data
        setData([
          { name: "Basic", value: basic },
          { name: "Standard", value: standard },
          { name: "Premium", value: premium },
        ]);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  const COLORS = ["#0088FE", "#00C49F", "#FF8828"];

  return (
    <div style={{ width: "100%", height: 400 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Charts;