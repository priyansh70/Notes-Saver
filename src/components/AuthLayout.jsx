import React from "react";

const AuthLayout = ({ children, title }) => {
  return (
    <div className="min-h-screen-xl text-gray-900 flex justify-center">
      <div className="max-w-screen-xl sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className="flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold">{title}</h1>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
