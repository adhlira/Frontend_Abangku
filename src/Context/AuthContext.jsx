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
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const endpoint = "http://localhost:5000";

  const Login = async (email, password) => {
    try {
      const response = await axios.post(`${endpoint}/login`, {
        email: email,
        password: password,
      });
      const { token, user } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("name", user.fullname);
      setIsAuthenticated(true);
      window.location.href = "/";
    } catch (error) {
      if (error.response) {
        console.log(error.response);
        setError(error.response.data.message);
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
      window.location.href = "/login";
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        const { errors } = error.response.data;

        // Memeriksa setiap field untuk pesan error
        if (errors.allFields) {
          setError(errors.allFields.message);
        } else if (errors.email) {
          setError(errors.email.message);
        } else if (errors.password) {
          setError(errors.password.message);
        } else if (errors.phone) {
          setError(errors.phone.message);
        }
      } else {
        setError("An error occurred while processing your request.");
      }
    }
  };


  const values = {
    Login,
    Register,
    isAuthenticated,
    error,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AuthProvider, useAuth };
