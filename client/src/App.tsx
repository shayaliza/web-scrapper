import React from "react";
import Navbar from "./navbar";
import Search from "./search";
import Rose from "./rose";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Toaster } from "@/components/ui/toaster";

const queryClient = new QueryClient();
const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="h-screen overflow-hidden w-full">
        <Navbar />
        <Search />
        <div className="relative">
          <div className="absolute top-0 left-0 ml-10 pt-10">
            <div className="h-12"></div>
            <div className="text-4xl font-bold pt-10 text-green-700 font-quicksand">
              Scrape
            </div>
            <div className="text-6xl font-extrabold text-pink-600 pt-4 font-quicksand">
              With Love
            </div>
          </div>
          <Rose />
        </div>
        <Toaster />
      </div>
    </QueryClientProvider>
  );
};

export default App;
