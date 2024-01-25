import "./App.css";
import BusinessCardDetails from "./components/BusinessCardDetails";
import E_BusinessCard from "./components/E_BusinessCard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserEntry from "./components/UserEntry";
import UserLogin from "./components/UserLogin";
import MainNavbar from "./components/Navbar";
import About from "./components/About";
import Home from "./components/Home";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <MainNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<UserEntry />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/about" element={<About />} />
        <Route path="/createCard" element={<BusinessCardDetails />} />
        <Route path="/businessCard" element={<E_BusinessCard />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
