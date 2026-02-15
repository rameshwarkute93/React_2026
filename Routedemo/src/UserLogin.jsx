import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function UserLogin({ setIsLoggedIn }) {
  const [mob, SetMob] = useState("");
  let hndlmob = (e) => {
    SetMob(e.target.value);
  };
  const navigate = useNavigate();
  let login = () => {
    if (mob == "9322315429") {
      alert("Login Success..!");
      setIsLoggedIn(true);
      navigate("/home");
    } else {
      alert("Invalid Mobile Number");
    }
  };

  return (
    <>
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div
          className="card p-4 shadow"
          style={{ maxWidth: "400px", width: "100%" }}
        >
          <h3 className="text-center mb-4">Login</h3>
          <div className="mb-3">
            <label className="form-label">Mobile Number</label>
            <input
              type="number"
              className="form-control"
              onChange={hndlmob}
              placeholder="Enter mobile number"
            />
          </div>
          <button className="btn btn-primary w-100" onClick={login}>
            Login
          </button>
        </div>
      </div>
    </>
  );
}
