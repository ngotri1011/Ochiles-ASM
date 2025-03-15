import "./App.scss";
import React from "react";
import Contact from "./components/Contact";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import { Route, Routes } from "react-router-dom";
import Detail from "./components/Detail";
import About from "./components/About";
import Blog from "./components/Blog";
import OrchidList from "./components/Orchid/OrchidList";
import OrchidEdit from "./components/Orchid/OrchidEdit";
import OrchidAdd from "./components/Orchid/OrchidAdd";
import Orchid from "./components/Orchid/Orchid";
function App() {
  return (
    <div className="App">
      <Navigation />
      <div className="Content">
        <Routes>
          <Route path="/" element={<Orchid />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/news" element={<Blog />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/list" element={<OrchidList />} />
          <Route path="/edit/:id" element={<OrchidEdit />} />
          <Route path="/add" element={<OrchidAdd />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}


export default App;
