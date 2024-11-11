import { useState } from "react";

const Signup = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your signup logic here
    console.log("Signup logic goes here");
    console.log(userName);
    console.log(email);
    console.log(password);
    await fetch("http://localhost:8080/api/signup", {
      method: "POST",
      body: JSON.stringify({ userName, email, password }),
      headers: { "Content-Type": "application/json" },
    });
  };

  return (
    <div className="row mt-3">
      <h1 className="col-6 offset-3">signup on wanderlust</h1>
      <div className="col-8 offset-2">
        <form onSubmit={handleSubmit} noValidate className="needs-validation">
          <div className="mt-3">
            <label htmlFor="userName" className="form-label">
              userName
            </label>
            <input
              name="userName"
              id="userName"
              placeholder="Add userName"
              type="text"
              className="form-control"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
            <div className="valid-feedback">userName Looks good!</div>
          </div>
          <div className="mt-3">
            <label htmlFor="email" className="form-label">
              email
            </label>
            <input
              name="email"
              id="email"
              placeholder="Add email"
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mt-3">
            <label htmlFor="password" className="form-label">
              password
            </label>
            <input
              name="password"
              id="password"
              placeholder="Add password"
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-success mt-3">
            signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
