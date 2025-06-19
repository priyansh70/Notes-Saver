import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AuthForm from "../components/AuthForm";
import AuthLayout from "../components/AuthLayout";

const LoginPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = () => {
    navigate("/", { replace: true });
  };

  return (
    <AuthLayout title="Sign In">
      <div className="w-full flex-1 mt-8 items-center justify-center">
        <AuthForm
          isLogin={true}
          onSubmit={handleSubmit}
        />
      </div>
    </AuthLayout>
  );
};

export default LoginPage;
