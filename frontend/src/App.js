import React from "react";
import { Link, Route, Routes, BrowserRouter, useLocation } from "react-router-dom";
import './App.css';
import Home from "./Home";
import BookDetails from "./BookDetails";
import Personal from "./Personal";

function App() {
  const currentUserId = localStorage.getItem("currentUserId");
  const location = useLocation();

  const handleLogOut = () => {
    localStorage.removeItem("currentUserId");
    localStorage.removeItem("token");
  }

  return (
    <>
    {currentUserId ? (
      <div className="personalTopNav">

        <h3><u>
          {location.pathname === "/personal" ? (
          <Link style={{textDecoration: 'none'}} to={"/"} onClick={handleLogOut}> Log out </Link>
        ) : (
          <Link style={{textDecoration: 'none'}} to={"/personal"}> Your bookmarks </Link>
        )}
        </u></h3>
      </div>
    ): null}

    <div className="App" style={{cursor: 'url(manicule.png), auto'}}>

      <Routes>
        <Route path="/" element={<Home title="folio" />} />
        <Route path="/books/:bookId" element={<BookDetails />}/>
        <Route path="/personal" element={<Personal />}/>
      </Routes>
    </div>
    </>
  );
}

export default App;
