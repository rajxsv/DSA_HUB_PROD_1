import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../UserContext";
import NavUser from "./NavUser";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="bg-black p-2">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center justify-between w-3/5">
          <Link to={"/"}>
            <div className="text-white text-2xl focus:bg-gray-900 p-2 rounded-md">
              {"</>"}
            </div>
          </Link>
          <div className="space-x-4">
            <Link
              to="/"
              className="text-gray-500 focus:text-white focus:bg-gray-900 p-2 rounded-md"
            >
              Home
            </Link>
            <Link
              to="/content/list"
              className="text-gray-500 focus:text-white focus:bg-gray-900 p-2 rounded-md"
            >
              Problems
            </Link>
            <Link
              to="/discuss"
              className="text-gray-500 focus:text-white focus:bg-gray-900 p-2 rounded-md"
            >
              Discuss
            </Link>
          </div>
        </div>
        <div className="flex justify-end">
          <NavUser />
        </div>
      </div>
    </nav>
  );
}
