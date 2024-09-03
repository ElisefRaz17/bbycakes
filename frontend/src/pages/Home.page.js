import React from "react";
import Cake1 from "../assets/Cake1.jpg";
function Home() {
  return (
    <div className="bg-orange-200 max-h-full flex flex-col items-center flex-wrap">
      <div className="flex flex-row items-center gap-7 py-8 flex-wrap">
        <div className="flex flex-col items-center gap-6">
          <h1 className="text-3xl italic">Luxury Cakes for Baddies</h1>
          <button className="bg-red-950 rounded-xl h-10 w-3/4 text-white hover:bg-red-700 hover:text-black">Let's get you cake!</button>
        </div>
        <img
          src={Cake1}
          alt="cake"
          className="rounded-3xl w-[500px] h-[500px]"
        />
      </div>
    </div>
  );
}

export default Home;
