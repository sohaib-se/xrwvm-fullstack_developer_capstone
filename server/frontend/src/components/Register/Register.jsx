import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../assets/style.css";

const Register = () => {
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  let register_url = window.location.origin + "/djangoapp/register";

  const register = async (e) => {
    e.preventDefault();

    const res = await fetch(register_url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userName,
        password,
        firstName,
        lastName,
        email,
      }),
    });

    const json = await res.json();

    if (json.status) {
      sessionStorage.setItem("username", userName);
      navigate("/");
      window.location.reload();
    } else if (json.error === "Already Registered") {
      alert("The user already exists!");
      navigate("/register");
    } else {
      setErrorMessage("Registration failed. Please try again.");
    }
  };

  return (
    <div className="register-container" style={{ width: "40%", margin: "5% auto", padding: "2%", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h2>Sign Up</h2>
      <form onSubmit={register}>
        <div style={{ marginBottom: "1em" }}>
          <label>Username</label>
          <input
            type="text"
            name="userName"
            placeholder="Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "1em" }}>
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "1em" }}>
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "1em" }}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "1em" }}>
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

        <button type="submit" style={{ width: "100%", padding: "10px", backgroundColor: "darkturquoise", border: "none", color: "white" }}>
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
