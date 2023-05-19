import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import './App.css';
import Home from "./Home";
import BookDetails from "./BookDetails";

function App() {
  return (
    <BrowserRouter>
    <div className="App" style={{cursor: 'url(manicule.png), auto'}}>

      <Routes>
        <Route path="/" element={<Home title="folio" />} />
        <Route path="/books/:bookId" element={<BookDetails />}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
