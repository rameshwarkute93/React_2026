import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import { useState } from "react";

export default function NavScroll() {
  const location = useLocation();
  // If on /login → do not show navbar
  if (location.pathname === "/") {
    return null;
  }

  const [query, setQuery] = useState("");

  // GOOGLE SEARCH FUNCTION
  const handleSearch = (e) => {
    e.preventDefault();

    if (!query.trim()) return;

    // redirect to google search
    window.open(
      `https://www.google.com/search?q=${encodeURIComponent(query)}`,
      "_blank",
    );
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Link to="/home" style={{ marginRight: "10px" }}>
              Home
            </Link>

            <Link to="/about" style={{ marginRight: "10px" }}>
              About
            </Link>
            <Link to="/ser" style={{ marginRight: "10px" }}>
              Service
            </Link>
            <Link to="/contact" style={{ marginRight: "10px" }}>
              Contact
            </Link>
            <Link to="/api" style={{ marginRight: "10px" }}>
              API
            </Link>
          </Nav>
          {/* <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form> */}

          {/* GOOGLE STYLE SEARCH */}
          <Form className="d-flex" onSubmit={handleSearch}>
            <Form.Control
              type="search"
              placeholder="Search Google..."
              className="me-2"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Button type="submit" variant="outline-success">
              Search
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
