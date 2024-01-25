import React from "react";
const BASE_URL = process.env.REACT_APP_BASE_URL;
import { Button } from "flowbite-react";
import { Loading } from "notiflix/build/notiflix-loading-aio";
import { Report } from "notiflix/build/notiflix-report-aio";

export default function UserLogin() {
  const loginUser = async (data) => {
    Loading.pulse();
    try {
      const response = await fetch(`${BASE_URL}/api/user/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (response.ok) {
        // console.log("User signed in successfully");
        window.localStorage.setItem("token", responseData);
        Loading.remove();
        Report.success("Success.", `Successfully logged in!`, "Okay", () => {
          window.location.href = "/createCard";
        });
      } else {
        // console.error("Failed to login");
        Report.failure(
          "Oops..User login failed!",
          "Please try again with correct inputs",
          "Okay"
        );
        Loading.remove();
      }
    } catch (error) {
      // console.error("Error logging in: ", error);
      Report.failure(
        "Oops..User creation failed!",
        "Please try again with valid inputs",
        "Okay"
      );
      Loading.remove();
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();

    const formData = new FormData(event.target);
    const data = {};

    formData.forEach((value, key) => {
      data[key] = value;
    });

    // Now 'data' contains the form field values, and you can use it as needed
    // console.log(data);

    // Add your logic to save the data to the backend (e.g., using an API call)
    loginUser(data);
  };

  return (
    <>
      <h1 className="text-2xl md:text-5xl text-center my-10 border-4 w-[70%] md:w-fit mx-auto p-5 text-emerald-400">
        Cardify
      </h1>

      <form
        className="max-w-sm mx-auto w-[70%] border-8 p-5 border-emerald-500	bg-zinc-950"
        onSubmit={submitForm}
      >
        <h2 className=" text-white text-center font-medium text-2xl border-2 p-2 my-2">
          Sign In
        </h2>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-300 dark:text-white"
          >
            Your email
          </label>
          <input
            type="email"
            name="username"
            id="username"
            className="shadow-sm bg-gray-50 border border-zinc-500 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
            autoComplete="yes"
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-300 dark:text-white"
          >
            Your password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="shadow-sm bg-gray-50 border border-zinc-500 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
            autoComplete="yes"
          />
        </div>
        <Button type="submit" size="sm" gradientMonochrome="info">
          Login
        </Button>
      </form>
    </>
  );
}
