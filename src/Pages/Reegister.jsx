import PictLogin from "../Components/Assets/pictLogin.jpg";
import { useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const { Register } = useAuth();
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await Register(fullname, username, password, email, phonenumber);
      navigate("/login");
    } catch (error) {
      console.error("Failed to Register:", error.message);
      setError(error.message);
    }
  };

  return (
    <>
      <div className="containe-form">
        <div className="image-container">
          <img src={PictLogin} alt="" />
        </div>
        <div className="login-container">
          <h3>Register</h3>
          <h5>{error}</h5>
          <form id="register" onSubmit={handleRegister}>
            <input type="text" placeholder="Fullname" id="fullname" name="fullname" value={fullname} onChange={(e) => setFullname(e.target.value)} />
            <input type="text" placeholder="Username" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <input type="email" placeholder="Email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="text" placeholder="Phone Number" id="phonenumber" name="phonenumber" value={phonenumber} onChange={(e) => setPhonenumber(e.target.value)} />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
}
