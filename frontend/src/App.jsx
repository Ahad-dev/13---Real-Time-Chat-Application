import React from "react";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthStore } from "./store/authStore";
import { Loader } from "lucide-react";
import LoadingSpinner from "./components/LoadingSpinner";
import {Toaster} from "react-hot-toast";

const RedirectAuthenticated = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated && user.isVerified) {
    return <Navigate to="/" replace />;
  }

  return children;
};

//protedted routes
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  console.log(isAuthenticated);
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default function App() {
  const { isCheckingAuth, checkAuth, isAuthenticated, user } = useAuthStore();

  console.log({ isCheckingAuth, isAuthenticated, user });


  React.useEffect(() => {
    checkAuth() 
  }
  ,[])

  if(isCheckingAuth){
    return <LoadingSpinner></LoadingSpinner>
  }


  return (
    <div className="overflow-hidden flex item-center justify-center h-screen ">
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        ></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/signup" element={<SignupPage />}></Route>
      </Routes>
      <Toaster
  position="top-center"
  reverseOrder={false}
    />
    </div>
  );
}
