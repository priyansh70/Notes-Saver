import React from "react";
import AuthForm from "../components/AuthForm";
import AuthLayout from "../components/AuthLayout";

const SignupPage = () => {
  const handleSubmit = () => {
    console.log("Signup form submitted");
  };

  return (
    <AuthLayout title="Sign Up">
      <div className="w-full flex-1 mt-8">
        <AuthForm
          isLogin={false}
          onSubmit={handleSubmit}
        />
      </div>
    </AuthLayout>
  );
};

export default SignupPage;
