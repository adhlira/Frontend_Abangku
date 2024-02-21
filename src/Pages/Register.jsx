import PictLogin from "../Components/Assets/pictLogin.jpg";
import { useState } from "react";
import { useAuth } from "../Context/AuthContext";

export default function Register() {
  const { Register, error } = useAuth();
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhonenumber] = useState("");

  console.log("ini ", error);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await Register(fullname, username, password, email, phonenumber);
    } catch (error) {
      console.error("Failed to Register:", error.message);
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

          <form id="register" onSubmit={handleRegister} className="form">
            <h5>{error === "All fields are required" ? error : ""}</h5>
            <input type="text" placeholder="Fullname" id="fullname" name="fullname" value={fullname} onChange={(e) => setFullname(e.target.value)} />
            <input type="text" placeholder="Username" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <h5>{error === "Password must be at least 6 characters long and at least contain 1 uppercase letter, 1 number" ? error : ""}</h5>
            <input type="password" placeholder="Password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <h5>{error === "Invalid email" ? error : ""}</h5>
            <input type="email" placeholder="Email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <h5>{error === "Invalid phone number" ? error : ""}</h5>
            <input type="text" placeholder="Phone Number" id="phonenumber" name="phonenumber" value={phonenumber} onChange={(e) => setPhonenumber(e.target.value)} />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
}
