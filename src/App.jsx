import "./App.scss";
import React from "react";
import Contact from "./components/pages/Contact/Contact";
import Navigation from "./components/Navigation/Navigation";
import Footer from "./components/Footer/Footer";
import { Route, Routes } from "react-router-dom";
import Detail from "./components/pages/Detail/Detail";
import Main from "./components/Main/Main";
import About from "./components/pages/About/About";
import Blog from "./components/pages/Blog/Blog";
import OrchidList from "./components/orchidlist/OrchidList";
import OrchidEdit from "./components/orchidlist/OrchidEdit";
import OrchidAdd from "./components/orchidlist/OrchidAdd";
import ReduxDemo from "./features/ReduxDemo";

function App() {
  return (
    <div className="App">
      <Navigation />
      <div className="Content">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/news" element={<Blog />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/list" element={<OrchidList />} />
          <Route path="/edit/:id" element={<OrchidEdit />} />
          <Route path="/add" element={<OrchidAdd />} />
          <Route path="/redux" element={<ReduxDemo />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}


export default App;
