import { useState } from "react";

function BarreRecherche({ onSearch }) {
  const [query, setQuery] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (query.trim()) onSearch(query.trim());
  }

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Rechercher une recette..."
        style={styles.input}
      />
      <button type="submit" style={styles.button}>🔍 Chercher</button>
    </form>
  );
}

const styles = {
  form: { display: "flex", gap: "0.5rem", marginBottom: "2rem" },
  input: {
    flex: 1,
    padding: "0.75rem 1rem",
    borderRadius: "8px",
    border: "2px solid #e0e0e0",
    fontSize: "1rem",
    outline: "none",
  },
  button: {
    padding: "0.75rem 1.2rem",
    background: "#ff6b35",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "bold",
  },
};
export default BarreRecherche;