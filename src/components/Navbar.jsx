import { Link } from "react-router-dom";

export default function Navbar({ favoritesCount }) {
  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.logo}>🍽️ RecipeApp</Link>
      <div style={styles.links}>
        <Link to="/" style={styles.link}>Accueil</Link>
        <Link to="/favorites" style={styles.link}>
          ❤️ Favoris{favoritesCount > 0 && (
            <span style={styles.badge}>{favoritesCount}</span>
          )}
        </Link>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem 2rem",
    background: "#ff6b35",
    color: "white",
  },
  logo: { color: "white", textDecoration: "none", fontSize: "1.3rem", fontWeight: "bold" },
  links: { display: "flex", gap: "1.5rem" },
  link: { color: "white", textDecoration: "none", fontSize: "1rem", position: "relative" },
  badge: {
    background: "white",
    color: "#ff6b35",
    borderRadius: "50%",
    padding: "0 6px",
    fontSize: "0.75rem",
    fontWeight: "bold",
    marginLeft: "4px",
  },
};