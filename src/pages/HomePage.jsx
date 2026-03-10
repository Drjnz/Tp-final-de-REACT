import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Home() {
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
      {meals?.map((meal) => (
        <div key={meal.idMeal} className="card">
          <h2>
            <Link to={`/detail/${meal.idMeal}`}>
              {meal.strMeal}
            </Link>
          </h2>
        </div>
      ))}
    </div>
  );
}

export default Home;