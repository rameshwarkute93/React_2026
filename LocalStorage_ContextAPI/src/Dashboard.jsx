import { useContext } from "react";
import { AuthContext } from "./AuthContext";

function Dashboard() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div>
      <h2>Dashboard</h2>

      <p>ID: {user?.id}</p>
      <p>Opening Balance: ₹{user?.opbal}</p>

      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Dashboard;
