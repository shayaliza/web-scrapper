import React from "react";

const Navbar: React.FC = () => {
  return (
    <div className="px-4 mt-2">
      <div className="text-2xl font-semibold font-quicksand text-pink-700">
        <span className="text-green-700">Web</span> Scraper
      </div>
      <div className="w-36">
        <div className="border-b-2 pt-2 border-green-700  m-auto text-center w-32"></div>
        <div className="border-b-2 pt-1 border-pink-700  m-auto text-center w-32"></div>
      </div>
    </div>
  );
};

export default Navbar;
