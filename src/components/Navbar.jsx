import React from "react";
import { NavbarData } from "../data/Navbar";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import { LogOut, User } from "lucide-react";

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="w-full h-[45px] flex justify-between items-center p-4 bg-gray-800 gap-x-5">
      <div className="flex items-center gap-x-5">
        {NavbarData.map((link, idx) => (
          <NavLink
            key={idx}
            to={link.path}
            className={({ isActive }) =>
              isActive
                ? "text-blue-500 font-semibold text-xl"
                : "text-white font-medium text-xl"
            }
          >
            {link.title}
          </NavLink>
        ))}
      </div>

      <div className="flex items-center gap-x-3">
        {isAuthenticated ? (
          <>
            <div className="flex items-center gap-x-2 text-white">
              <User size={20} />
              <span className="text-sm font-medium">{user?.name}</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-x-1 text-red-400 hover:text-red-300 transition-colors"
              title="Logout"
            >
              <LogOut size={18} />
              <span className="text-sm">Logout</span>
            </button>
          </>
        ) : (
          <div className="flex items-center gap-x-3">
            <NavLink
              to="/login"
              className="text-white hover:text-blue-400 transition-colors text-sm font-medium"
            >
              Login
            </NavLink>
            <NavLink
              to="/signup"
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
            >
              Sign Up
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
