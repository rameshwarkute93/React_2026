import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { AuthContext } from "./AuthContext";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "./assets/expences.png";
import { FaUserPlus, FaMobileAlt, FaUser, FaWallet } from "react-icons/fa";
import "./Login.css";

export default function Login() {
  const { setUser } = useContext(AuthContext);

  // ================= REGISTER =================
  const [show, setShow] = useState(false);
  const [nm, setNm] = useState("");
  const [mob, setMob] = useState("");
  const [opbl, setOpbal] = useState("");

  // ================= LOGIN =================
  const navigate = useNavigate();
  const [umob, setUMob] = useState("");

  const reg = () => {
    axios
      .post(
        "https://codingshika.com/APP/EXP/add_user.php?mobile=" +
          mob +
          "&uname=" +
          nm +
          "&opbal=" +
          opbl,
      )
      .then((res) => {
        if (res.data.posts.status == "200") {
          alert("Registered Success..!");
          setShow(false);
        } else {
          alert("Failed..!");
        }
      });
  };

  const login = () => {
    axios
      .post("https://codingshika.com/APP/EXP/user_login.php?mobile=" + umob)
      .then((res) => {
        if (res.data.posts.status == "200") {
          alert("Login Success..!");
          localStorage.setItem("id", res.data.posts.id);
          localStorage.setItem("nm", res.data.posts.name);

          setUser({
            id: res.data.posts.id,
            uname: res.data.posts.name,
          });
          navigate("/home");
        } else {
          alert("Failed..!");
        }
      });
  };

  return (
    <div className="login-bg d-flex justify-content-center align-items-center vh-100">
      {/* ================= REGISTER MODAL ================= */}
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title className="d-flex align-items-center gap-2">
            <FaUserPlus /> Add New User
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="text"
            placeholder="Enter Name"
            onChange={(e) => setNm(e.target.value)}
          />
          <br />
          <Form.Control
            type="number"
            placeholder="Enter Mobile"
            onChange={(e) => setMob(e.target.value)}
          />
          <br />
          <Form.Control
            type="number"
            placeholder="Opening Balance"
            onChange={(e) => setOpbal(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={reg}>
            Register
          </Button>
        </Modal.Footer>
      </Modal>

      {/* ================= LOGIN CARD ================= */}
      <div className="login-card card shadow-lg border-0 p-4">
        <div className="text-center">
          <img src={logo} height={100} width={100} alt="logo" />
        </div>

        <h3 className="text-center mt-3 fw-bold d-flex justify-content-center align-items-center gap-2">
          <FaWallet />
          Wallet Login
        </h3>

        <div className="mt-4">
          <label className="form-label fw-semibold">Mobile Number</label>
          <div className="input-group">
            <span className="input-group-text">
              <FaMobileAlt />
            </span>
            <input
              type="number"
              onChange={(e) => setUMob(e.target.value)}
              className="form-control"
              placeholder="Enter mobile number"
            />
          </div>
        </div>

        <button
          className="btn btn-primary w-100 mt-4 rounded-pill fw-semibold"
          onClick={login}
        >
          Login
        </button>

        <p
          className="text-center mt-3 signup-link"
          onClick={() => setShow(true)}
        >
          New User? Create Account
        </p>
      </div>
    </div>
  );
}
