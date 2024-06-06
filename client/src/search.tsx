import React from "react";

const Search: React.FC = () => {
  return (
    <div className="flex items-center justify-center px-2 w-full mt-4">
      <div className="relative md:w-1/3 w-full">
        <input
          type="text"
          placeholder="Enter Website URL"
          className="w-full py-2 px-4 pr-16 border-2 border-t-pink-600 border-b-green-700 border-l-green-700 rounded-lg focus:outline-none h-12 text-green-700 font-quicksand font-semibold"
        />
        <button className="absolute right-0 top-0 bg-pink-600 h-12 text-white px-4 rounded-lg hover:bg-green-700 focus:outline-none">
          Scrape
        </button>
      </div>
    </div>
  );
};

export default Search;
