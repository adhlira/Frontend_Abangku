/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const AuthContext = createContext();

const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [error, setError] = useState("");

  const endpoint = "http://localhost:5000";

  const Login = async (email, password) => {
    try {
      const response = await axios.post(`${endpoint}/login`, {
        email: email,
        password: password,
      });
      // Tangkap message dan token dari tanggapan
      const { message, token } = response.data;

      // Cetak message dan token ke konsol
      console.log("Message:", message);
      console.log("Token:", token);
    } catch (error) {
      if (error.response) {
        console.log(error.response);
      }
    }
  };
  const Register = async (fullname, username, password, email, phonenumber) => {

    try {
      await axios.post(`${endpoint}/register`, {
        fullname: fullname,
        username: username,
        password: password,
        email: email,
        phone: phonenumber,
      });
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      }
    }
  };

  const values = {
    error,
    Login,
    Register
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AuthProvider, useAuth };
