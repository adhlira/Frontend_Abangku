import PictLogin from "../Components/Assets/pictLogin.jpg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function Register() {
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const Register = async (e) => {
    e.preventDefault();
    try {
     await axios.post("http://localhost:5000/register", {
        fullname: fullname,
        username: username,
        password: password,
        email: email,
        phone: phonenumber,
      });
      navigate("/login");
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      }
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
          <form id="register" onSubmit={Register}>
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
