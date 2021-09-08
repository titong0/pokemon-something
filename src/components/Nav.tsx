import { BrowserRouter as Router, Link } from "react-router-dom";
import React from "react";

const Nav = () => {
  return (
    <nav
      className="bg-yellow-200 py-3 text-gray-300"
      style={{ backgroundColor: "#205bab" }}
    >
      <Router>
        <ul className="flex justify-around flex-row">
          <li>
            <Link to="/"> Search</Link>
          </li>
          <li>
            <Link to="/advanced-search">Advanced search</Link>
          </li>
        </ul>
      </Router>
    </nav>
  );
};

export default Nav;
