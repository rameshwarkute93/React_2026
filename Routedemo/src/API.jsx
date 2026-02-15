import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";

export default function API() {
  const [data, SetData] = useState([]);

  //save
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [nm, SetName] = useState("");
  const [ct, SetCity] = useState("");
  const [mob, SetMob] = useState("");

  let hndlnm = (e) => {
    SetName(e.target.value);
  };
  let hndlct = (e) => {
    SetCity(e.target.value);
  };
  let hndlmb = (e) => {
    SetMob(e.target.value);
  };

  //update
  const [ushow, setUShow] = useState(false);
  const uhandleClose = () => setUShow(false);
  const uhandleShow = () => setUShow(true);

  const [id, Setid] = useState("");
  const [unm, SetUName] = useState("");
  const [uct, SetUCity] = useState("");
  const [umob, SetUMob] = useState("");

  let uhndlnm = (e) => {
    SetUName(e.target.value);
  };
  let uhndlct = (e) => {
    SetUCity(e.target.value);
  };
  let uhndlmb = (e) => {
    SetUMob(e.target.value);
  };

  let getdata = (id, name, city, mob) => {
    Setid(id);
    SetUName(name);
    SetUCity(city);
    SetUMob(mob);
    uhandleShow();
  };

  let addstud = () => {
    const dt = {
      name: nm,
      city: ct,
      mob: mob,
    };
    axios.post("http://localhost:8080/save", dt).then((res) => {
      alert("success");
      api();
      setShow(false);
    });
  };

  let updtstud = () => {
    const dt = {
      name: unm,
      city: uct,
      mob: umob,
      id: id,
    };
    axios.put("http://localhost:8080/update", dt).then((res) => {
      alert("Update success");
      api();
      setUShow(false);
    });
  };

  let del = (id) => {
    alert(id);

    axios.delete("http://localhost:8080/del/" + id).then((res) => {
      alert("Delete Success..!");
      api();
      setShow(false);
    });
  };

  let api = () => {
    axios.get("http://localhost:8080/stud").then((res) => {
      console.log(res.data);
      SetData(res.data);
    });
  };

  //onload
  useEffect(() => {
    api();
  }, []);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Student
      </Button>

      {/* save */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="text"
            onChange={hndlnm}
            placeholder="Enter a Name:"
          />
          <br />
          <Form.Control
            type="text"
            onChange={hndlct}
            placeholder="Enter a City:"
          />
          <br />
          <Form.Control
            type="number"
            onChange={hndlmb}
            placeholder="Enter a Mobile:"
          />
          <br />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={addstud}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Update */}
      <Modal show={ushow} onHide={uhandleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="text"
            value={unm}
            onChange={uhndlnm}
            placeholder="Enter a Name:"
          />
          <br />
          <Form.Control
            type="text"
            value={uct}
            onChange={uhndlct}
            placeholder="Enter a City:"
          />
          <br />
          <Form.Control
            type="number"
            value={umob}
            onChange={uhndlmb}
            placeholder="Enter a Mobile:"
          />
          <br />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={uhandleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={updtstud}>
            Update Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <table class="table table-dark">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">City</th>
            <th scope="col">Mobile</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => {
            return (
              <tr>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.city}</td>
                <td>{item.mob}</td>
                <td>
                  <Button variant="danger" onClick={() => del(item.id)}>
                    Delete
                  </Button>
                  <Button
                    variant="warning"
                    onClick={() =>
                      getdata(item.id, item.name, item.city, item.mob)
                    }
                  >
                    update
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
