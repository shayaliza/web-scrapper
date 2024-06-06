// import React from "react";
// import Navbar from "./navbar";
// import Search from "./search";
// import Rose from "./rose";

// const App: React.FC = () => {
//   return (
//     <div className="flex flex-col h-screen overflow-hidden">
//       <Navbar />
//       <div className="flex-grow flex items-start justify-center mt-4">
//         <Search />
//       </div>
//       <Rose />
//     </div>
//   );
// };

// export default App;

import React from "react";
import Navbar from "./navbar";
import Search from "./search";
import Rose from "./rose";

const App: React.FC = () => {
  return (
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
    </div>
  );
};

export default App;
