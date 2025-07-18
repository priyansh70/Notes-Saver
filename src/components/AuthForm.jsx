import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authAPI } from "../services/api";
import {
  setLoading,
  loginSuccess,
  signupSuccess,
  authError,
} from "../redux/authSlice";

const AuthForm = ({ isLogin, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      dispatch(authError("Email and password are required"));
      return;
    }

    if (!isLogin && !formData.name) {
      dispatch(authError("Name is required"));
      return;
    }

    if (formData.password.length < 8) {
      dispatch(authError("Password must be at least 8 characters long"));
      return;
    }

    dispatch(setLoading(true));

    try {
      let response;
      if (isLogin) {
        response = await authAPI.login({
          email: formData.email,
          password: formData.password,
        });
        dispatch(loginSuccess(response));
      } else {
        response = await authAPI.signup({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });
        dispatch(signupSuccess(response));
      }

      if (onSubmit) {
        onSubmit();
      }
    } catch (error) {
      dispatch(authError(error.message));
    }
  };

  return (
    <div className="mx-auto max-w-xs">
      <div className="flex flex-col items-center">
        <button className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-outline">
          <div className="bg-white p-2 rounded-full">
            <svg
              className="w-4"
              viewBox="0 0 533.5 544.3"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                fill="#4285f4"
              />
              <path
                d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                fill="#34a853"
              />
              <path
                d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                fill="#fbbc04"
              />
              <path
                d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                fill="#ea4335"
              />
            </svg>
          </div>
          <span className="ml-4">Sign {isLogin ? "In" : "Up"} with Google</span>
        </button>
      </div>

      <div className="my-7 border-b text-center">
        <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white">
          Or sign {isLogin ? "in" : "up"} with e-mail
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <input
            className="w-full px-8 py-4 mb-5 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
            required={!isLogin}
          />
        )}
        <input
          className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <input
          className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
          required
          minLength={8}
        />
        <button
          type="submit"
          disabled={loading}
          className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition duration-300 ease-in-out flex items-center justify-center focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg
            className="w-6 h-6 -ml-2"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
            <circle
              cx="8.5"
              cy="7"
              r="4"
            />
            <path d="M20 8v6M23 11h-6" />
          </svg>
          <span className="ml-3">
            {loading ? "Processing..." : `Sign ${isLogin ? "In" : "Up"}`}
          </span>
        </button>
      </form>

      <NavLink to={!isLogin ? "/login" : "/signup"}>
        <button className="mt-4 text-indigo-500 hover:underline">
          {isLogin
            ? "Don't have an account? Sign Up"
            : "Already have an account? Sign In"}
        </button>
      </NavLink>
    </div>
  );
};

export default AuthForm;
