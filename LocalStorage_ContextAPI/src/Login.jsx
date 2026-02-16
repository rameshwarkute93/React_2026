import { useContext } from "react";

import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

function Login() {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const login = () => {
    setUser({
      id: 101,
      opbal: 3000,
    });

    navigate("/dashboard");
  };

  return (
    <div>
      <h2>Login</h2>
      <button onClick={login}>Login</button>
    </div>
  );
}

export default Login;
