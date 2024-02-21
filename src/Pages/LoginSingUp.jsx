import { Link } from "react-router-dom";
import PictLogin from "../Components/Assets/pictLogin.jpg";
import { useState } from "react";
import { useAuth } from "../Context/AuthContext";

export default function LoginSingUp() {
  const { Login, error } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await Login(email, password);
    } catch (error) {
      console.error("Failed to log in:", error.message);
    }
  };

  return (
    <>
      <div className="containe-form">
        <div className="image-container">
          <img src={PictLogin} alt="" />
        </div>
        <div className="login-container">
          <h3>Log in</h3>
          <form id="form-login" onSubmit={handleLogin} className="form">
            <h5>{error === "Email not found" ? error : ""}</h5>
            <input type="email" placeholder="Email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <h5>{error === "Invalid password" ? error : ""}</h5>
            <input type="password" placeholder="Password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">LOG IN</button>
            <p>
              Dont have an account?{" "}
              <Link to="/register" className="nav-link">
                <span> Sign Up</span>
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
