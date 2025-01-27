import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Avatar, Button, Dropdown } from "flowbite-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { signoutSuccess } from "../redux/user/userSlice";
import server from "../environment";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // State to toggle menu visibility
  const location = useLocation(); // To get the current location
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  const handleSignout = async () => {
    try {
      const res = await fetch(`${server}/api/user/signout`, { method: "POST" });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen); // Toggle between open and close
  };

  const closeMenu = (e) => {
    if (e.target.id === "overlay") {
      setIsOpen(false); // Close the menu if clicking on the overlay
    }
  };

  const getLinkClassName = (path) => {
    return location.pathname === path
      ? "text-yellow-300 font-bold"
      : "text-white hover:text-yellow-300 transition-all duration-300";
  };

  return (
    <header className="bg-gradient-to-r from-[#7C295D] to-[#6A1E62] text-white p-4 shadow-lg">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold flex items-center text-yellow-200">
          The CMDians Official
        </h1>

      

        {/* User Dropdown Menu */}
        <div className="flex gap-2 md:order-2">
          {currentUser ? (
            <Dropdown
              arrowIcon={false}
              inline
              label={<Avatar alt="user" img={currentUser.profilePicture} rounded />}
            >
              <Dropdown.Header>
                <span className="block text-sm">@{currentUser.username}</span>
                <span className="block text-sm font-medium truncate">{currentUser.email}</span>
              </Dropdown.Header>
              <Link to={"/dashboard?tab=profile"}>
                <Dropdown.Item>Profile</Dropdown.Item>
              </Link>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleSignout}>Sign out</Dropdown.Item>
            </Dropdown>
            
          ) : (
       
            <>
              <Link to="/sign-in">
                <Button gradientDuoTone="purpleToBlue" outline>
                  Sign In
                </Button>
              </Link>
              <Link to="/sign-up">
                <Button gradientDuoTone="purpleToBlue" outline>
                  Sign Up
                </Button>
              </Link>
            </>
          )}

        </div>
              {/* Mobile Menu Toggle Button */}
              <div className="md:hidden">
        <button onClick={toggleMenu} className="focus:outline-none" aria-label="Toggle Menu">
          <FontAwesomeIcon icon={isOpen ? faTimes : faBars} className="text-2xl" />
        </button>
      </div>
      </div>

       

      {/* Desktop Menu */}
      <nav className="hidden md:flex space-x-8 items-center">
        <Link to="/" className={getLinkClassName("/")}>Home</Link>
        <Link to="/images" className={getLinkClassName("/images")}>Images</Link>
        <Link to="/about" className={getLinkClassName("/about")}>About</Link>
        <Link to="/events" className={getLinkClassName("/events")}>Events</Link>
        <Link to="/help" className={getLinkClassName("/help")}>Help</Link>
        <Link to="/news" className={getLinkClassName("/news")}>News</Link>
        <Link to="/memes" className={getLinkClassName("/memes")}>Memes</Link>
      </nav>

      {/* Mobile Menu with Stacked Items */}
      <div
        id="overlay"
        className={`md:hidden ${isOpen ? "block" : "hidden"} fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 z-40 transition-opacity duration-300`}
        onClick={closeMenu}
      >
        <div
          className={`fixed top-0 left-0 bg-[#7C295D] w-4/5 max-w-md h-full p-6 transform ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out z-50 rounded-r-3xl shadow-xl`}
        >
          <div className="flex justify-end mb-6">
            <button
              onClick={toggleMenu}
              className="text-white text-3xl hover:text-yellow-300 transition-all duration-200"
              aria-label="Close Menu"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
          <nav className="flex flex-col space-y-6 items-center">
            <Link to="/" className={getLinkClassName("/")}>Home</Link>
            <Link to="/images" className={getLinkClassName("/images")}>Images</Link>
            <Link to="/about" className={getLinkClassName("/about")}>About</Link>
            <Link to="/events" className={getLinkClassName("/events")}>Events</Link>
            <Link to="/help" className={getLinkClassName("/help")}>Help</Link>
            <Link to="/news" className={getLinkClassName("/news")}>News</Link>
            <Link to="/memes" className={getLinkClassName("/memes")}>Memes</Link>
            {currentUser ? null : (
              <>
                <Link to="/sign-in" className={getLinkClassName("/sign-in")}>Sign In</Link>
                <Link to="/sign-up" className={getLinkClassName("/sign-up")}>Sign Up</Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
