import { BrowserRouter as Router, NavLink as Link } from "react-router-dom";
import React from "react";
import { useState } from "react";

const random = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const Nav = () => {
  const [randomPkmn, setrandomPkmn] = useState(random(1, 898));
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
          <Link
            to={"/pokemon/" + randomPkmn}
            onClick={() => {
              setrandomPkmn(random(1, 898));
            }}
          >
            Random pokemon
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
