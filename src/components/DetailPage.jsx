import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function Detail() {
  const { id } = useParams();
  const [detail, setDetail] = useState(null);

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)

      .then((res) => res.json())
      .then((data) => setDetail(data.meals[0]));
  }, [id]);

  if (!detail) return <p>Chargement de la  recette...</p>;

  return (
    <div className="detail-container">
      <Link to="/" className="back-btn">← Retour à l'accueil</Link>
      
      <h1>{detail.strMeal}</h1>
      <img src={detail.strMealThumb} alt={detail.strMeal} style={{ width: "100%", maxWidth: "600px" }} />
      
      <h3>Instructions</h3>
      <p>{detail.strInstructions}</p>
    </div>
  );
}

export default Detail;