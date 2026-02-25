import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-black text-white px-6 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between">
        <Link to="/" className="text-xl font-bold">
          LOTR Market Dashboard
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;