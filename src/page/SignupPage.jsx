import React, { useState } from "react";
import AuthForm from "../components/AuthForm";
import AuthLayout from "../components/AuthLayout";
import Spinner from "../components/Spinner";
import axios from "axios";
import toast from "react-hot-toast";
const SignupPage = () => {
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (userData) => {
    try {
      setLoading(true);
      const url = import.meta.env.VITE_BASE_URL;

      // You can implement your own logic here to create a new user in your backend API
      const user = await axios.post(`${url}/signup`, userData);
      // For example, you can use Axios to send a POST request to your API endpoint with the user data
      if (user.data) {
        toast.success("Your account has been created successfully!!");
      }

      // Once the user is created, you can redirect the user to the login page or display a success message
    } catch (error) {
      // toast.error(error.message);
      if (error.response && error.response.data) {
        // If the error response contains a message
        toast.error(error.response.data.message || "Something went wrong");
      } else {
        toast.error("Something went wrong");
      }
    }
    setLoading(false);
  };

  return (
    <AuthLayout title="Sign Up">
      <div className="w-full flex-1 mt-8">
        {loading ? (
          <Spinner />
        ) : (
          <AuthForm
            isLogin={false}
            onSubmit={handleSubmit}
          />
        )}
      </div>
    </AuthLayout>
  );
};

export default SignupPage;
