import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

const Navbar = () => {
  const [search, setSearch] = React.useState("");
  const navigate = useNavigate();

  return (
    <nav className="container py-3 flex-col gap-3 border-b border-gray-100  md:flex-row flex justify-between md:items-center">
      <div className="flex items-center gap-3  justify-between">
        <Link to="/" className="">
          <span className="text-xl font-semibold text-primary">Edu</span>
          <span className="text-xl  text-gray-700">Hub</span>
        </Link>
        <Link
          to="/student/dashboard"
          className="bg-primary md:hidden px-8 py-2 rounded-full text-sm text-white  transition duration-200"
        >
          Dashboard
        </Link>
      </div>

      <div className="flex items-center gap-10">
        <div className="flex gap-2 flex-1">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            className="bg-gray-100 px-4 py-2 flex-1 w-full rounded text-sm focus:outline-none"
            placeholder="Search"
          />
          <button
            onClick={() => {
              navigate(`/search/${search}`);
            }}
            className=" bg-primary rounded-full w-8 h-8   text-lg  p-2 focus:outline-none"
          >
            <Search strokeWidth={1.5} size={16} color="white" />
          </button>
        </div>

        <Link
          to="/student/dashboard"
          className="bg-primary hidden md:flex  px-8 py-2 rounded-full text-sm text-white  transition duration-200"
        >
          Dashboard
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
