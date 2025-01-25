import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // State to toggle menu visibility
  const location = useLocation(); // To get the current location

  // Function to toggle the mobile menu
  const toggleMenu = () => {
    setIsOpen(!isOpen); // Toggle between open and close
  };

  // Function to close the mobile menu when clicking outside (on the overlay)
  const closeMenu = (e) => {
    if (e.target.id === "overlay") {
      setIsOpen(false); // Close the menu if clicking on the overlay
    }
  };

  // Function to add active link styles
  const getLinkClassName = (path) => {
    return location.pathname === path
      ? "text-yellow-300 font-bold"
      : "text-white hover:text-yellow-300";
  };

  return (
    <header className="bg-[#7C295D] text-white p-4 shadow-lg">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold flex items-center">
          The CMDians official
        </h1>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="focus:outline-none" aria-label="Toggle Menu">
            <FontAwesomeIcon icon={isOpen ? faTimes : faBars} className="text-2xl" />
          </button>
        </div>
        <nav className="hidden md:flex space-x-6" role="navigation">
          <Link to="/" className={getLinkClassName("/")}>Home</Link>
          <Link to="/images" className={getLinkClassName("/images")}>Images</Link>
          <Link to="/about" className={getLinkClassName("/about")}>About</Link>
          <Link to="/events" className={getLinkClassName("/events")}>Events</Link> {/* New Link for Events */}
          <Link to="/help" className={getLinkClassName("/events")}>Help</Link>
            <Link to="/news" className={getLinkClassName("/events")}>News</Link>
            <Link to="/memes" className={getLinkClassName("/events")}>Memes</Link>
          <Link to="/upload" className={getLinkClassName("/upload")}>Upload Your Image</Link>
        </nav>
      </div>

      {/* Mobile Menu with Stacked Items */}
      <div
        id="overlay"
        className={`md:hidden ${isOpen ? "block" : "hidden"} fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 z-40 transition-opacity duration-300`}
        onClick={closeMenu} // Close menu when overlay is clicked
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
            <Link to="/help" className={getLinkClassName("/events")}>/Help</Link>
            <Link to="/news" className={getLinkClassName("/events")}>/News</Link>
            <Link to="/memes" className={getLinkClassName("/events")}>/Memes</Link>
            <Link to="/upload" className={getLinkClassName("/upload")}>Upload Your Image</Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
