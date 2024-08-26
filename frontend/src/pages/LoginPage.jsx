import React from "react";
import Input from "../components/Input";
import { Loader, Lock, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import PasswordInput from "../components/PasswordInput";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [userData, setUserData] = React.useState({
    username: "",
    password: "",
  });

  const { login, error, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      await login(userData);
      navigate("/");
      toast.success("Logged in successfully");
    } catch (error) {
      console.log(error);
      toast.error("Invalid credentials");
    }
  };

  return (
    <div className="w-96 self-center">
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "linear" }}
        className="bg-gray-700/30 backdrop-filter backdrop-blur-lg p-7 rounded-t-xl shadow-md"
      >
        <h1 className="text-3xl drop-shadow-md font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-500 text-transparent bg-clip-text mb-10 ">
          Login to Your Account
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <Input
            icon={User}
            type="text"
            value={userData.username}
            name="username"
            onChange={handleChange}
            placeholder="Username"
            required
          ></Input>
          <PasswordInput
            icon={Lock}
            value={userData.password}
            onChange={handleChange}
            name="password"
            placeholder="Password"
            required
          ></PasswordInput>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <button className="bg-gradient-to-tr from-blue-600 to-blue-800 text-white font-semibold py-3 px-5 rounded-lg hover:scale-105 transition-all duration-150 text-center">
            {!isLoading ? (
              "Login"
            ) : (
              <Loader
                size={25}
                className="animate-spin mx-auto"
                color="white"
              />
            )}
          </button>
        </form>
      </motion.div>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "linear" }}
        className="py-4 rounded-b-lg bg-gradient-to-br from-gray-800/80 to-gray-900/70"
      >
        <p className="text-gray-400 text-center">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;
