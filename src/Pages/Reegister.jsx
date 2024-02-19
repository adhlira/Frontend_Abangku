import PictLogin from "../Components/Assets/pictLogin.jpg";

export default function Register() {
  return (
    <>
      <div className="containe-form">
        <div className="image-container">
          <img src={PictLogin} alt="" />
        </div>
        <div className="login-container">
          <h3>Register</h3>
          <form action="" id="form-login">
            <input type="text" placeholder="Fullname" id="fullname" name="fullname" />
            <input type="password" placeholder="Password" id="password" name="password" />
            <input type="email" placeholder="Email" id="email" name="email" />
            <input type="number" placeholder="Phone Number" id="phonenumber" name="phonenumber" />

            <button>Submit</button>
          </form>
        </div>
      </div>
    </>
  );
}
