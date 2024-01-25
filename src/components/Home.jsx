import React from "react";
import { Button } from "flowbite-react";

export default function Home() {
  return (
    <>
      <h1 className="text-4xl md:text-6xl text-center mt-5 border-4 w-[70%] md:w-fit mx-auto p-5 text-emerald-400">
        Welcome to Cardify
      </h1>
      <p className="text-lg md:text-xl text-center 2 mb-5 mx-auto p-2 w-[70%] md:w-[80%] text-emerald-400">
        Digital Impressions: Unleash Your Professional Identity with our Online
        Business Card Creator!
      </p>
      <img
        src="homePage_img.jpeg"
        className="w-[70%] flex md:w-1/4 lg:1/3 rounded-2xl shadow-2xl shadow-rose-700/40 mx-auto mt-2"
        alt=""
      />
      <Button
        gradientDuoTone="purpleToBlue"
        className="text-center mx-auto my-10 md:px-20 py-2"
        onClick={() => {
          if (localStorage.getItem("token")) {
            window.location.href = "/createCard";
          } else {
            window.location.href = "/signup";
          }
        }}
      >
        Create your own business card now!
      </Button>
    </>
  );
}
