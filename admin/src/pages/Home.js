import React from "react";
import {
   Navigation,
   MobileNavigationTop,
   MobileNavigationBottom,
} from "../components/navigation/navigation";

const Home = () => {
   return (
      <div>
         <Navigation />
         <MobileNavigationTop />
         <MobileNavigationBottom />
      </div>
   );
};

export default Home;
