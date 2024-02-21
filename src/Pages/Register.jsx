import PictLogin from "../Components/Assets/pictLogin.jpg";
import { useState, useEffect } from "react";
import { useAuth } from "../Context/AuthContext";

export default function Register() {
  const { Register, error } = useAuth();
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [errorMessage, setErrorMessage] = useState({});

  console.log("ini ", errorMessage);

  useEffect(() => {
    if (error && error.allFields && error.allFields.message) {
      setErrorMessage(error.allFields);
    } else {
      setErrorMessage(error);
    }
  }, [error]);

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
            <h5>{errorMessage?.message} {fullname.length < 3 && fullname.length > 0 && "Fullname must be at least 3 characters"}</h5>
            <input type="text" placeholder="Fullname" id="fullname" name="fullname" value={fullname} onChange={(e) => setFullname(e.target.value)} />
            <h5>{username.length < 3 && username.length > 0 && "Username must be at least 3 characters"}</h5>
            <input type="text" placeholder="Username" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <h5>{errorMessage?.password?.message}</h5>
            <input type="password" placeholder="Password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <h5>{errorMessage?.email?.message}</h5>
            <input type="email" placeholder="Email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <h5>{errorMessage?.phone?.message}</h5>
            <input type="text" placeholder="Phone Number" id="phonenumber" name="phonenumber" value={phonenumber} onChange={(e) => setPhonenumber(e.target.value)} />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
}
