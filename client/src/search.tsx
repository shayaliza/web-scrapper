import React from "react";
import { useRef } from "react";

import { useToast } from "./components/ui/use-toast";
const Search: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const handleSubmit = () => {
    console.log(inputRef.current?.value);
    if (!inputRef.current?.value) {
      toast({
        description: "Please Enter Website URL",
      });
      return;
    }
  };
  return (
    <div className="flex items-center justify-center px-2 w-full mt-4">
      <div className="relative md:w-1/3 w-full">
        <input
          type="text"
          placeholder="Enter Website URL"
          ref={inputRef}
          className="w-full py-2 px-4 pr-16 border-2 border-t-pink-600 border-b-green-700 border-l-green-700 rounded-lg focus:outline-none h-12 text-green-700 font-quicksand font-semibold"
        />
        <button
          onClick={handleSubmit}
          className="absolute right-0 top-0 bg-pink-600 h-12 text-white px-4 rounded-lg hover:bg-green-700 focus:outline-none"
        >
          Scrape
        </button>
      </div>
    </div>
  );
};

export default Search;
