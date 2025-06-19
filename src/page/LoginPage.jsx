import React from "react";
import AuthForm from "../components/AuthForm";
import AuthLayout from "../components/AuthLayout";
import toast from "react-hot-toast";
import axios from "axios";

const LoginPage = () => {
  const handleSubmit = async (userData) => {
    try {
      const url = import.meta.env.VITE_BASE_URL;
      const user = await axios.post(`${url}/login`, userData, {
        withCredentials: true, // Ensures cookies are sent with the request
      });

      if (user.data.success) {
        // Redirect to the home page after successful login
        window.location.href = "/";
      } else {
        toast.error("Invalid email or password");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message || "Something went wrong");
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <AuthLayout title={"Sign In"}>
      <div className="w-full flex-1 mt-8 items-center justify-center">
        <AuthForm isLogin={true} onSubmit={handleSubmit} />
      </div>
    </AuthLayout>
  );
};

export default LoginPage;
