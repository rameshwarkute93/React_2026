import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.jsx";
import Home from "./Home.jsx";
import NavScrollExample from "./NavScrollExample.jsx";
import Bootstrp from "./Bootstrp.jsx";
import AutoLayoutExample from "./AutoLayoutExample.jsx";
import Data from "./Data.jsx";

import CheckBox from "./CheckBox.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <NavScrollExample /> */}
    <App />
    {/* <AutoLayoutExample /> */}
    {/* <Home /> */}
    {/* <Data /> */}
    {/* <CheckBox /> */}
  </StrictMode>,
);
