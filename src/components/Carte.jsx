import { Link } from "react-router-dom";

function Carte({ meal, onToggleFavorite, isFav }) {
  return (
    <div style={styles.card}>
      <Link to={`/meal/${meal.idMeal}`} style={{ textDecoration: "none", color: "inherit" }}>
        <img src={meal.strMealThumb} alt={meal.strMeal} style={styles.img} />
        <div style={styles.info}>
          <h3 style={styles.title}>{meal.strMeal}</h3>
          <p style={styles.category}>{meal.strCategory} • {meal.strArea}</p>
        </div>
      </Link>
      <button
        onClick={() => onToggleFavorite(meal)}
        style={{ ...styles.favBtn, color: isFav ? "#ff6b35" : "#aaa" }}
        title={isFav ? "Retirer des favoris" : "Ajouter aux favoris"}
      >
        {isFav ? "❤️" : "🤍"}
      </button>
    </div>
  );
}

const styles = {
  card: {
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
    background: "white",
    position: "relative",
    transition: "transform 0.2s",
    cursor: "pointer",
  },
  img: { width: "100%", height: "180px", objectFit: "cover", display: "block" },
  info: { padding: "0.75rem" },
  title: { margin: "0 0 0.25rem", fontSize: "1rem", fontWeight: "600" },
  category: { margin: 0, fontSize: "0.85rem", color: "#888" },
  favBtn: {
    position: "absolute",
    top: "8px",
    right: "8px",
    background: "rgba(255,255,255,0.9)",
    border: "none",
    borderRadius: "50%",
    width: "36px",
    height: "36px",
    fontSize: "1.2rem",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};
export default Carte;