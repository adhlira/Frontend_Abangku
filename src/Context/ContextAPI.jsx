import { createContext, useContext } from "react";
import axios from "axios";

const ApiContext = createContext();

export const useApi = () => {
  return useContext(ApiContext);
};

export const ApiProvider = ({ children }) => {
  const login = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  };

  const register = async (userData) => {
    try {
      const response = await axios.post("http://localhost:5000/register", userData);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  };

  const value = {
    login,
    register,
  };

  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
};
