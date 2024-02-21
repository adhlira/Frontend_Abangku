import { Link } from "react-router-dom";
import PictLogin from "../Components/Assets/pictLogin.jpg";
import { useState } from "react";
import {useAuth} from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";


export default function LoginSingUp() {
  const {Login} = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

   const handleLogin = async (e) => {
     e.preventDefault();

     try {
       await Login(email, password);
       navigate("/"); 
     } catch (error) {
       console.error("Failed to log in:", error.message);
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
          <h3>Log in</h3>
          <h5>{error}</h5>
          <form id="form-login" onSubmit={handleLogin}>
            <input type="email" placeholder="Email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">LOG IN</button>
            <p>
              Dont have an account?
              <Link to="/register" className="nav-link">
                <span> Sign Up</span>
              </Link>
            </p>

            {/*   <h5>Login with</h5>
            <div className="login-plaform">
              <div className="icon-platform">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951" />
                </svg>
                Faceboock
              </div>
              <div className="icon-platform">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M15.545 6.558a9.4 9.4 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.7 7.7 0 0 1 5.352 2.082l-2.284 2.284A4.35 4.35 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.8 4.8 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.7 3.7 0 0 0 1.599-2.431H8v-3.08z" />
                </svg>
                Google
              </div>
            </div> */}
          </form>
        </div>
      </div>
    </>
  );
}
