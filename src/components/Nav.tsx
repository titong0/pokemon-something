import Search from "./Search";
import { NavLink as Link } from "react-router-dom";
import { useState } from "react";

const random = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const Nav = () => {
  const [showSearch, togglesearch] = useState(false);
  const [randomPkmn, setrandomPkmn] = useState(random(1, 807));
  return (
    <nav
      className="bg-yellow-200 py-3 text-gray-300"
      style={{ backgroundColor: "#205bab" }}
    >
      <ul className="flex justify-between flex-row mx-2 md:mx-8 ">
        <button
          tabIndex={0}
          className="cursor-pointer"
          onClick={() => togglesearch(!showSearch)}
        >
          <img
            className="h-6"
            src={
              showSearch
                ? "https://cdn.iconscout.com/icon/free/png-128/x-3603861-3005653.png"
                : "https://cdn-icons-png.flaticon.com/128/2089/2089805.png"
            }
            alt=""
          />
        </button>
        {showSearch ? <Search hide={() => togglesearch(false)} /> : null}

        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link
            to={"/pokemon/" + randomPkmn}
            onClick={() => {
              setrandomPkmn(random(1, 807));
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
