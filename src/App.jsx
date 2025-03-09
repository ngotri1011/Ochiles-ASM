
import React from "react";
import Contact from "./components/pages/Contact/Contact";
import Navigation from "./components/Navigation/Navigation";
import Footer from "./components/Footer/Footer";
import { Route, Routes } from "react-router-dom";
import Detail from "./components/pages/Detail/Detail";
import Main from "./components/Main/Main";
import About from "./components/pages/About/About";
import Blog from "./components/pages/Blog/Blog";
import AddUser from "./components/Add/AddUser";

function App() {
  const appStyle = {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  };

  const contentStyle = {
    flex: "1",
    backgroundColor:"#EBE8DB"
  };
  return (
    <div className="App" style={appStyle}>
      <div style={contentStyle}>
        <Navigation />
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path='/detail/:id' element={<Detail />}></Route>
          <Route path="/blog" element={<Blog />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path='/contact' element={<Contact />}></Route>
          <Route path="/add" element={<AddUser />}></Route>
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;
