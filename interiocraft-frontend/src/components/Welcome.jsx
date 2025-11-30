import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Welcome() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === "light" ? "dark" : "light");
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card text-center shadow p-4" style={{ maxWidth: '500px' }}>
        <h1 className="mb-3">Welcome to InterioCraft</h1>
        <p className="text-muted mb-4">
          This is just Testing component  using Bootstrap.
        </p>

        <button
          className={`btn ${theme === 'light' ? 'btn-dark' : 'btn-light'}`}
          onClick={toggleTheme}
        >
          Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
        </button>
        <Link to="/budget-estimator" className="btn btn-primary mt-3">
          Try Budget Estimator
        </Link>

        <Link to="/consultations" className="btn btn-outline-primary mt-2">
          Book a Consultation
        </Link>


      </div>
    </div>
  );
}
