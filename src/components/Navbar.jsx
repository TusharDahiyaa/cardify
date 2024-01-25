import React from "react";
import { Button, Navbar } from "flowbite-react";

export default function MainNavbar() {
  const logoutFn = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <>
      {!localStorage.getItem("token") ? (
        <Navbar fluid className="bg-transparent text-white">
          <Navbar.Brand href="/">
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
              Cardify
            </span>
          </Navbar.Brand>
          <div className="flex md:order-2">
            <Button
              size="sm"
              gradientMonochrome="success"
              className="me-2"
              onClick={() => {
                window.location.href = "/signup";
              }}
            >
              Register/Login
            </Button>
            <Navbar.Toggle />
          </div>
          <Navbar.Collapse>
            <Navbar.Link
              href="/"
              className="text-zinc-200 hover:bg-zinc-800 border rounded-2xl my-1"
            >
              Home
            </Navbar.Link>
            <Navbar.Link
              href="/about"
              className="text-zinc-200 hover:bg-zinc-800 border rounded-2xl my-1"
            >
              About
            </Navbar.Link>
          </Navbar.Collapse>
        </Navbar>
      ) : (
        <Navbar fluid className="bg-transparent text-white">
          <Navbar.Brand href="/">
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
              Cardify
            </span>
          </Navbar.Brand>
          <div className="flex md:order-2">
            <Button
              size="sm"
              gradientMonochrome="failure"
              className="me-2"
              onClick={logoutFn}
            >
              Logout
            </Button>
            <Navbar.Toggle />
          </div>
          <Navbar.Collapse>
            <Navbar.Link
              className="text-zinc-200 hover:bg-zinc-800 border rounded-2xl my-1"
              href="/"
            >
              Home
            </Navbar.Link>
            <Navbar.Link
              className="text-zinc-200 hover:bg-zinc-800 border rounded-2xl my-1"
              href="/about"
            >
              About
            </Navbar.Link>
            <Navbar.Link
              className="text-zinc-200 hover:bg-zinc-800 border rounded-2xl my-1"
              href="/createCard"
            >
              Create Card
            </Navbar.Link>
            <Navbar.Link
              className="text-zinc-200 hover:bg-zinc-800 border rounded-2xl my-1"
              href="/businessCard"
            >
              My Cards
            </Navbar.Link>
          </Navbar.Collapse>
        </Navbar>
      )}
    </>
  );
}
