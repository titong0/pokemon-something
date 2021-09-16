import { BrowserRouter as Router, NavLink as Link } from "react-router-dom";
import React from "react";

const Nav = () => {
  return (
    <nav
      className="bg-yellow-200 py-3 text-gray-300"
      style={{ backgroundColor: "#205bab" }}
    >
      <ul className="flex justify-around flex-row">
        <li>
          <Link to="/"> Search</Link>
        </li>
        <li>
          <Link to="/advanced-search">Advanced search</Link>
        </li>
        <li>
          <Link to={"/pokemon/" + Math.floor(Math.random() * 898)}>
            Random pokemon
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
