/*import "./panel.css";
import { useNavigate } from "react-router-dom";

function UserDash() {
  const navigate = useNavigate();

  return (
    <>
      <h1>Welcome to User Dashboard</h1>

      <div className="dash">

        
        <div
          className="security-box"
          onClick={() => navigate("/security")}
        >
          <h3>Security Settings</h3>
        </div>

       
        <div
          className="membership-box"
          onClick={() => navigate("/membership")}
        >
          <h3>Membership & Billing</h3>
        </div>

      </div>
    </>
  );
}

export default UserDash;*/

import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";

function UserDash() {
  const navigate = useNavigate();

  return (
    <div className="container text-center mt-5">
      <h1 className="mb-4">Welcome to User Dashboard</h1>

      <div className="row justify-content-center gap-4">
        
        {/* Security Box */}
        <div
          className="col-md-4 card p-4 shadow cursor-pointer"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/security")}
        >
          <h3 className="text-primary">Security Settings</h3>
        </div>

        {/* Membership Box */}
        <div
          className="col-md-4 card p-4 shadow"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/membership")}
        >
          <h3 className="text-success">Membership & Billing</h3>
        </div>

      </div>
    </div>
  );
}

export default UserDash;