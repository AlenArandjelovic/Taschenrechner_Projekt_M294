// src/Navigation.jsx
import { Link } from "react-router-dom";

function Navigation() {
  return (
    <nav style={{ marginBottom: "20px" }}>
      <Link to="/calculator" style={{ marginRight: "10px" }}>Rechner</Link>
      <Link to="/verlauf">Verlauf</Link>
    </nav>
  );
}

export default Navigation;
