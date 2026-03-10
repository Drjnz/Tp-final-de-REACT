import { useState, useEffect } from "react";
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import Home from './pages/HomePage';
import Detail from './components/DetailPage';
import './App.css';


function App() {

  const [meals, setMeals] = useState([]);

  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=")
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setMeals(data.meals);
      });
  }, []);

return (

  <div>
    <BrowserRouter>
    <nav>
      <Link to="/">Accueil</Link>
      <Link to="/Detail">Detail</Link>
    </nav>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/Detail" element={<Detail/>}/>
    </Routes>
    </BrowserRouter>
    <h1>Liste des recettes</h1>

    {meals && meals.map((meal) => (
      <div key={meal.idMeal}>
        <h3>{meal.strMeal}</h3>
        <img src={meal.strMealThumb} width="200" />
      </div>
    ))}

  </div>

);

}

export default App;
