import React, { useState } from "react";
import AuthForm from "../components/AuthForm";
import AuthLayout from "../components/AuthLayout";

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = () => {
    console.log(`${isLogin ? "Login" : "Signup"} form submitted`);
  };

  return (
    <AuthLayout title={`Sign ${isLogin ? "In" : "Up"}`}>
      <div className="w-full flex-1 mt-8 items-center justify-center">
        <AuthForm
          isLogin={isLogin}
          onSubmit={handleSubmit}
        />
      </div>
    </AuthLayout>
  );
};

export default LoginPage;
