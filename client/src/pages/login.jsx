import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { setUser } from "../redux/authSlice"; // Import setUser action from authSlice

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestBody = {
      username,
      password,
    };

    try {
      const response = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      const { token } = await response.json();
      const decoded = jwtDecode(token);

      dispatch(setUser({ userId: decoded.userId, username: decoded.username }));

      localStorage.setItem("token", token);
      navigate(`/api/listings`);
    } catch (error) {
      console.error("Login failed:", error.message);
      setError("Login failed. Please check your username and password.");
    }
  };

  return (
    <div className="row mt-3">
      <h1 className="col-6 offset-3">Login on Wanderlust</h1>
      <div className="col-8 offset-2">
        <form onSubmit={handleSubmit} noValidate className="needs-validation">
          <div className="mt-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              name="username"
              id="username"
              placeholder="Enter username"
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mt-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              name="password"
              id="password"
              placeholder="Enter password"
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <div className="mt-3 text-danger">{error}</div>}

          <button type="submit" className="btn btn-success mt-3">
            Login
          </button>
        </form>
      </div>

      <div className="mt-3">
        <p>
          Not registered? Sign up <Link to="/api/signup">here</Link>.
        </p>
      </div>
    </div>
  );
};

export default Login;
