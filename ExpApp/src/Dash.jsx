import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "./AuthContext";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import {
  FaUserCircle,
  FaSignOutAlt,
  FaWallet,
  FaArrowDown,
  FaArrowUp,
  FaCalendar,
  FaStickyNote,
  FaHashtag,
} from "react-icons/fa";
import "./Dash.css";

export default function Dash() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    alert("Logged out successfully");
    navigate("/");
  };

  // ================= DEBIT =================
  const [dshow, setDShow] = useState(false);
  const [ddt, setDDate] = useState("");
  const [damt, setDAmt] = useState("");
  const [dnt, setDNote] = useState("");

  // ================= CREDIT =================
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [dt, setDate] = useState("");
  const [amt, setAmt] = useState("");
  const [nt, setNote] = useState("");
  const [val] = useState(0);

  const [id] = useState(Number(localStorage.getItem("id")) || 0);

  // ================= BALANCES =================
  const [opbl, setOpbal] = useState(0);
  const [ttlc, setTtlc] = useState(0);
  const [ttld, setTtld] = useState(0);

  const opbal = () => {
    axios
      .get("https://codingshika.com/APP/EXP/opbal_list.php?uid=" + id)
      .then((res) => {
        if (res.data.posts.status == 200) {
          setOpbal(res.data.posts.post[0]["OPBAL"]);
        }
      });
  };

  const tran = () => {
    axios
      .get("https://codingshika.com/APP/EXP/transaction_list.php?uid=" + id)
      .then((res) => {
        if (res.data.posts.status == 200) {
          setData(res.data.posts.post);

          const totalc = res.data.posts.post.reduce(
            (sum, item) => sum + Number(item.CREDIT),
            0,
          );
          setTtlc(totalc);

          const totald = res.data.posts.post.reduce(
            (sum, item) => sum + Number(item.DEBIT),
            0,
          );
          setTtld(totald);
        }
      });
  };

  const credit = () => {
    axios
      .post(
        "https://codingshika.com/APP/EXP/insert_credit.php?date=" +
          dt +
          "&note=" +
          nt +
          "&debit=" +
          val +
          "&credit=" +
          amt +
          "&uid=" +
          id,
      )
      .then((res) => {
        if (res.data.posts.status == "200") {
          alert("Credit Success..!");
          opbal();
          tran();
          setShow(false);
        }
      });
  };

  const debiit = () => {
    axios
      .post(
        "https://codingshika.com/APP/EXP/insert_debit.php?date=" +
          ddt +
          "&note=" +
          dnt +
          "&debit=" +
          damt +
          "&credit=" +
          val +
          "&uid=" +
          id,
      )
      .then((res) => {
        if (res.data.posts.status == "200") {
          alert("Debit Success..!");
          opbal();
          tran();
          setDShow(false);
        }
      });
  };

  useEffect(() => {
    tran();
    opbal();
  }, []);

  return (
    <>
      {/* ================= ADD CREDIT ================= */}
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Credit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control type="date" onChange={(e) => setDate(e.target.value)} />
          <br />
          <Form.Control
            type="number"
            placeholder="Credit Amount"
            onChange={(e) => setAmt(e.target.value)}
          />
          <br />
          <Form.Control
            type="text"
            placeholder="Note"
            onChange={(e) => setNote(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={credit}>
            Add Credit
          </Button>
        </Modal.Footer>
      </Modal>

      {/* ================= ADD DEBIT ================= */}
      <Modal show={dshow} onHide={() => setDShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Debit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="date"
            onChange={(e) => setDDate(e.target.value)}
          />
          <br />
          <Form.Control
            type="number"
            placeholder="Debit Amount"
            onChange={(e) => setDAmt(e.target.value)}
          />
          <br />
          <Form.Control
            type="text"
            placeholder="Note"
            onChange={(e) => setDNote(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setDShow(false)}>
            Close
          </Button>
          <Button variant="danger" onClick={debiit}>
            Add Debit
          </Button>
        </Modal.Footer>
      </Modal>

      {/* ================= NAVBAR ================= */}
      <nav className="navbar-ui navbar navbar-expand-lg bg-white shadow-sm rounded-pill px-4 mx-3 mt-3">
        <span className="navbar-brand fw-bold d-flex align-items-center gap-2">
          <FaWallet /> Wallet Overview
        </span>

        <div className="ms-auto d-flex align-items-center gap-3">
          <div className="d-flex align-items-center gap-2 fw-semibold">
            <FaUserCircle size={20} />
            Welcome, {localStorage.getItem("nm")}
          </div>

          <button
            className="btn btn-outline-dark rounded-pill px-3 d-flex align-items-center gap-2"
            onClick={handleLogout}
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </nav>

      <div className="container py-4">
        {/* ================= TOP SECTION ================= */}
        <div className="row g-4 align-items-stretch">
          {/* OPBAL CARD */}
          <div className="col-md-6">
            <div
              className="p-4 text-white h-100 rounded-4"
              style={{
                background:
                  "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
              }}
            >
              <h2 className="mb-4">Opbal: {opbl}</h2>

              <small>Card Holder</small>
              <h6>Name : {localStorage.getItem("nm")}</h6>
              <h6>Id : {localStorage.getItem("id")}</h6>
            </div>
          </div>

          {/* CREDIT */}
          <div className="col-md-3">
            <div className="card-ui card h-100 shadow-sm rounded-4 text-center p-3">
              <div className="icon-circle bg-success-subtle text-success">
                <FaArrowDown />
              </div>

              <h6 className="mt-2 text-muted">Total Credit</h6>
              <h2 className="mt-1 text-success fw-bold">{ttlc}</h2>

              <button
                onClick={() => setShow(true)}
                className="btn btn-dark rounded-pill mt-2"
              >
                Add New Credit
              </button>
            </div>
          </div>

          {/* DEBIT */}
          <div className="col-md-3">
            <div className="card-ui card h-100 shadow-sm rounded-4 text-center p-3">
              <div className="icon-circle bg-danger-subtle text-danger">
                <FaArrowUp />
              </div>

              <h6 className="mt-2 text-muted">Total Debit</h6>
              <h2 className="mt-1 fw-bold" style={{ color: "red" }}>
                {ttld}
              </h2>

              <button
                onClick={() => setDShow(true)}
                className="btn btn-dark rounded-pill mt-2"
              >
                Add New Debit
              </button>
            </div>
          </div>
        </div>

        {/* ================= TABLE ================= */}
        <div className="card mt-4 shadow-sm rounded-4">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="mb-0">Payment History</h5>
            </div>

            <div className="table-scroll">
              <table className="table align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th>
                      <FaHashtag /> UID
                    </th>
                    <th>
                      <FaCalendar /> DATE
                    </th>
                    <th>
                      <FaStickyNote /> NOTE
                    </th>
                    <th className="text-danger">DEBIT</th>
                    <th className="text-success">CREDIT</th>
                    <th>CLBAL</th>
                  </tr>
                </thead>

                <tbody>
                  {data.map((item) => (
                    <tr key={item.T_ID}>
                      <td>{item.T_ID}</td>
                      <td>{item.DATE}</td>
                      <td>{item.NOTE}</td>
                      <td className="text-danger">{item.DEBIT}</td>
                      <td className="text-success">{item.CREDIT}</td>
                      <td>{item.CLBAL}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
