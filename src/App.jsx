import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/HomePage";
import Detail from "./pages/DetailPage";
import './App.css';

function App() {

  const [meals, setMeals] = useState([]);

  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=")
      .then(res => res.json())
      .then(data => {
        setMeals(data.meals);
      });
  }, []);

  return (
    <BrowserRouter>

      <nav>
        <Link to="/">Accueil</Link>
      </nav>

      <h1>Liste des recettes</h1>

      <Routes>
        <Route path="/" element={<Home meals={meals} />} />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>

    </BrowserRouter>
    
    
  );
}

export default App;