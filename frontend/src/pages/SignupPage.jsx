import React from "react";
import Input from "../components/Input";
import { Lock, User, CircleUserRound, Loader } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import PasswordInput from "../components/PasswordInput";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter";
import GenderCheckBox from "../components/GenderCheckBox";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";

const SignupPage = () => {
  const [userData, setUserData] = React.useState({
    fullname: "",
    password: "",
    confirmPassword:"",
    gender: "",
    username: "",
  });

  const {signup,error,isLoading} = useAuthStore();
  const navigate = useNavigate();

  const onCheckboxChange = (value) => {
    setUserData({ ...userData, gender: value });
  };

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log({ userData });
    try {
      await signup(userData);
      navigate('/');
      toast.success("Account created successfully");
    } catch (error) {
      console.error(error);
      toast.error("An error occured");
    }
  };


  return (
    <div className="w-4/12 max-sm:w-full  self-center">
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "linear" }}
        className="bg-gray-700/30 backdrop-filter backdrop-blur-lg p-7 rounded-t-xl shadow-md"
      >
        <h1 className="text-center text-3xl drop-shadow-md font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-500 text-transparent bg-clip-text mb-10 ">
          Create Account
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <Input
            icon={CircleUserRound}
            type="text"
            placeholder="Full Name"
            required
            name="fullname"
            value={userData.fullname}
            onChange={handleChange}
          ></Input>
          <Input
            icon={User}
            type="text"
            placeholder="Username"
            name="username"
            required
            value={userData.username}
            onChange={handleChange}
          ></Input>
          <PasswordInput
            value={userData.password}
            onChange={handleChange}
            icon={Lock}
            name="password"
            placeholder="Password"
            required
          ></PasswordInput>
          <PasswordInput
            value={userData.confirmPassword}
            onChange={handleChange}
            icon={Lock}
            name="confirmPassword"
            placeholder="Confirm Password"
            required
          ></PasswordInput>
          <GenderCheckBox
            onCheckboxChange={onCheckboxChange}
            selectedGender={userData.gender}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button className="bg-gradient-to-tr from-blue-600 to-blue-800 text-white font-semibold py-3 px-5 rounded-lg hover:scale-105 transition-all duration-150 text-center">
            {!isLoading?"Sign up":<Loader  className=' animate-spin mx-auto' size={25} color="white"/>}
          </button>
        </form>
        <PasswordStrengthMeter
          password={userData.password}
        ></PasswordStrengthMeter>
      </motion.div>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "linear" }}
        className="py-4 rounded-b-lg bg-gradient-to-br from-gray-800/80 to-gray-900/70"
      >
        <p className="text-gray-400 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default SignupPage;
