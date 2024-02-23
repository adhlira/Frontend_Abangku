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
  const [term, setTerms] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pageBanner, setBanner] = useState(4);

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
      if (error.response) {
        setError(error.response.data.errors);
      }
    }
  };

  const Product = async () => {
    try {
      const response = await axios.get(`${endpoint}/product`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  const GetProductbyId = async (id) => {
    try {
      const response = await axios.get(`${endpoint}/product/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const Search = async (searchTerm) => {
    try {
      const response = await axios.get(`${endpoint}/product?name=${searchTerm}`);
      console.log(response.data);
      setTerms(searchTerm);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const Banner = (Banner) => {
    setBanner(Banner);
  };

  const values = {
    Login,
    Register,
    Product,
    isAuthenticated,
    error,
    GetProductbyId,
    Search,
    term,
    Banner,
    pageBanner,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AuthProvider, useAuth };
