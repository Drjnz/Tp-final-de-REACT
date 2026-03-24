import Carte from "../components/Carte";
import { Link } from "react-router-dom";

function FavoritesPage({ favorites, toggleFavorite, isFavorite }) {
  if (favorites.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "4rem" }}>
        <p style={{ fontSize: "1.2rem", color: "#888" }}>Vous n'avez pas encore de favoris.</p>
        <Link to="/" style={{ color: "#ff6b35", fontWeight: "bold" }}>← Parcourir les recettes</Link>
      </div>
    );
  }

  return (
    <div>
      <h1 style={{ marginBottom: "1.5rem" }}>❤️ Mes plats favoris ({favorites.length})</h1>
      <div style={gridStyle}>
        {favorites.map((meal) => (
          <Carte
            key={meal.idMeal}
            meal={meal}
            onToggleFavorite={toggleFavorite}
            isFav={isFavorite(meal.idMeal)}
          />
        ))}
      </div>
    </div>
  );
}
export default FavoritesPage;

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
  gap: "1.5rem",
};