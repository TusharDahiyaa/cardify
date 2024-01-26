import React from "react";
const BASE_URL = process.env.REACT_APP_BASE_URL;
import { Button } from "flowbite-react";
import { HiOutlineArrowRight } from "react-icons/hi";
import { Loading } from "notiflix/build/notiflix-loading-aio";
import { Report } from "notiflix/build/notiflix-report-aio";

export default function UserEntry() {
  const saveUser = async (data) => {
    Loading.circle();
    try {
      const response = await fetch(`${BASE_URL}/api/user/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // console.log("User created successfully");
        Loading.remove();
        Report.success(
          "Account created.",
          `We've created the account with username ${data.username}`,
          "Okay",
          () => {
            window.location.href = "/login";
          }
        );
      } else if (response.status === 401) {
        Loading.remove();
        Report.warning(
          "Username already exists!",
          "This username is already taken, please choose another one.",
          "Okay"
        );
      } else if (response.status === 409) {
        Loading.remove();
        Report.warning(
          "Error in password inputs!",
          "The passwords do not match!",
          "Okay"
        );
      } else {
        // console.error("Failed to create a user");
        Report.failure(
          "Oops..User creation failed!",
          "Please try again with valid inputs",
          "Okay"
        );
        Loading.remove();
      }
    } catch (error) {
      // console.error("Error creating a user:", error);
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

    saveUser(data);
  };

  return (
    <>
      <h1 className="text-2xl md:text-5xl text-center my-5 border-4 w-[70%] md:w-fit mx-auto p-2 text-emerald-400">
        Cardify
      </h1>

      <form
        className="max-w-sm mx-auto w-[70%] border-8 p-5 border-emerald-500	bg-zinc-950"
        onSubmit={submitForm}
      >
        <h2 className=" text-white text-center font-medium text-2xl border-2 p-2 my-2">
          Sign Up
        </h2>
        <div className="mb-5">
          <label
            htmlFor="username"
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
            autoComplete="on"
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
            autoComplete="on"
            className="shadow-sm bg-gray-50 border border-zinc-500 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="repeatPassword"
            className="block mb-2 text-sm font-medium text-gray-300 dark:text-white"
          >
            Repeat password
          </label>
          <input
            type="password"
            name="repeatPassword"
            id="repeatPassword"
            autoComplete="on"
            className="shadow-sm bg-gray-50 border border-zinc-500 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
          />
        </div>
        <div className="relative mb-10">
          <Button
            type="submit"
            gradientDuoTone="purpleToBlue"
            className="text-white absolute inset-x-0.5"
          >
            Register
            <HiOutlineArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <br />
          <br />
          <Button
            href="/login"
            size="sm"
            gradientMonochrome="failure"
            className=" absolute inset-x-0.5 -bottom-11"
          >
            Login here
          </Button>
        </div>
      </form>
    </>
  );
}
