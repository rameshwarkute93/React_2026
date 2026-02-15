import About from "./About.jsx";
import Contact from "./Contact.jsx";
import Home from "./Home.jsx";
import NavScroll from "./NavScroll.jsx";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
  Navigate,
} from "react-router-dom";
import Service from "./Service.jsx";
import API from "./API.jsx";
import Login from "./Login.jsx";
import { useState } from "react";
import UserLogin from "./UserLogin.jsx";

// ProtectedRoute component
function ProtectedRoute({ isLoggedIn, children }) {
  return isLoggedIn ? children : <Navigate to="/" replace />;
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); //
  return (
    <>
      <Router>
        {/* <SearchNavBar /> */}
        <NavScroll /> {/* Always render Navbar component */}
        <Routes>
          {/* { <Route path="/" element={<UserLogin/>} /> }
        <Route path="/home" element={<Home/>} />
        <Route path="/about" element={<About />} />
       <Route path="/contact" element={<Contact />} />
       <Route path="/ser" element={<Service />} />
       <Route path="/api" element={<API />} />  */}
          <Route
            path="/"
            element={<UserLogin setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route
            path="/home"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Home />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="/about"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <About />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="/contact"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Contact />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="/ser"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Service />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="/api"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <API />{" "}
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </>
  );
}
