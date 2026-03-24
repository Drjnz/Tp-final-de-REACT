import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Chargement from "../components/Chargement";
import { getMealById } from "../services/mealService";

function DetailPage({ toggleFavorite, isFavorite }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const data = await getMealById(id);
        if (!data) throw new Error("Recette introuvable");
        setMeal(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  if (loading) return <Chargement />;
  if (error) return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <p style={{ color: "#e74c3c" }}>⚠️ {error}</p>
      <button onClick={() => navigate(-1)} style={btnStyle}>← Retour</button>
    </div>
  );

  const ingredients = Array.from({ length: 20 }, (_, i) => {
    const ing = meal[`strIngredient${i + 1}`];
    const measure = meal[`strMeasure${i + 1}`];
    return ing && ing.trim() ? `${measure?.trim() ?? ""} ${ing.trim()}` : null;
  }).filter(Boolean);

  const isFav = isFavorite(meal.idMeal);

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <button onClick={() => navigate(-1)} style={btnStyle}>← Retour</button>

      <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap", marginTop: "1rem" }}>
        <img src={meal.strMealThumb} alt={meal.strMeal} style={imgStyle} />
        <div style={{ flex: 1, minWidth: "220px" }}>
          <h1 style={{ marginBottom: "0.5rem" }}>{meal.strMeal}</h1>
          <p style={{ color: "#888", marginBottom: "1rem" }}>
            {meal.strCategory} • {meal.strArea}
          </p>
          <button
            onClick={() => toggleFavorite(meal)}
            style={{ ...favBtnStyle, background: isFav ? "#ff6b35" : "#f0f0f0", color: isFav ? "white" : "#333" }}
          >
            {isFav ? "❤️ Retirer des favoris" : "🤍 Ajouter aux favoris ?"}
          </button>
          {meal.strYoutube && (
            <a href={meal.strYoutube} target="_blank" rel="noreferrer" style={youtubeLinkStyle}>
              ▶️ Voir la vidéo
            </a>
          )}
        </div>
      </div>

      <h2 style={{ marginTop: "2rem" }}>Ingrédients</h2>
      <ul style={ulStyle}>
        {ingredients.map((ing, i) => <li key={i}>{ing}</li>)}
      </ul>

      <h2>Instructions</h2>
      <p style={{ lineHeight: "1.8", color: "#444", whiteSpace: "pre-line" }}>
        {meal.strInstructions}
      </p>
    </div>
  );
}
const btnStyle = { padding: "0.5rem 1rem", background: "#f0f0f0", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "0.9rem" };
const imgStyle = { width: "300px", height: "300px", objectFit: "cover", borderRadius: "16px", flexShrink: 0 };
const favBtnStyle = { padding: "0.6rem 1.2rem", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold", marginBottom: "0.75rem", display: "block" };
const youtubeLinkStyle = { display: "inline-block", marginTop: "0.5rem", color: "#e74c3c", textDecoration: "none", fontWeight: "bold" };
const ulStyle = { columns: 2, gap: "1rem", paddingLeft: "1.2rem", lineHeight: "2" };

export default DetailPage;
