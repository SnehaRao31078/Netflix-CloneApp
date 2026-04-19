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

export default UserDash;

import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";

function UserDash() {
  const navigate = useNavigate();

  return (
    <div className="container text-center mt-5">
      <h1 className="mb-4">Welcome to User Dashboard</h1>

      <div className="row justify-content-center gap-4">
        
       
        <div
          className="col-md-4 card p-4 shadow cursor-pointer"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/security")}
        >
          <h3 className="text-primary">Security Settings</h3>
        </div>

       
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

export default UserDash;*/
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";

function UserDash() {
  const navigate = useNavigate();

  return (
    <div className="container py-5">
      <h1 className="text-center mb-5 fw-bold text-primary">
        Welcome to User Dashboard
      </h1>

      <div className="row justify-content-center g-4">

        {/* Security Card */}
        <div className="col-md-4">
          <div
            className="card text-center shadow-lg border-0 h-100"
            onClick={() => navigate("/security")}
            style={{ cursor: "pointer" }}
          >
            <div className="card-body">
              <div className="fs-1 mb-3">🔒</div>
              <h4 className="card-title text-primary">Security Settings</h4>
              <p className="card-text text-muted">
                Manage password, privacy & login
              </p>
              <button className="btn btn-outline-primary mt-2">
                Go
              </button>
            </div>
          </div>
        </div>

        {/* Membership Card */}
        <div className="col-md-4">
          <div
            className="card text-center shadow-lg border-0 h-100"
            onClick={() => navigate("/membership")}
            style={{ cursor: "pointer" }}
          >
            <div className="card-body">
              <div className="fs-1 mb-3">💳</div>
              <h4 className="card-title text-success">Membership & Billing</h4>
              <p className="card-text text-muted">
                View plans and payment details
              </p>
              <button className="btn btn-outline-success mt-2">
                Go
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default UserDash;