import { useState, useEffect } from "react";
import BarreRecherche from "../components/Barrerecherche";
import Carte from "../components/Carte";
import Chargement from "../components/Chargement";
import { searchMeals, getRandomMeals } from "../services/mealService";

function HomePage({ toggleFavorite, isFavorite }) {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadRandom() {
      try {
        setLoading(true);
        setError(null);
        const data = await getRandomMeals();
        setMeals(data);
      } catch {
        setError("Impossible de charger les recettes. Vérifiez votre connexion.");
      } finally {
        setLoading(false);
      }
    }
    loadRandom();
  }, []);

  async function handleSearch(query) {
    try {
      setLoading(true);
      setError(null);
      const data = await searchMeals(query);
      if (data.length === 0) setError(`Aucun résultat pour "${query}".`);
      setMeals(data);
    } catch {
      setError("Erreur lors de la recherche. Réessayez.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1 style={{ marginBottom: "1.5rem" }}>Découvrez des recettes</h1>
      <BarreRecherche onSearch={handleSearch} />

      {loading && <Chargement />}

      {error && (
        <div style={{ textAlign: "center", color: "#e74c3c", padding: "2rem" }}>
          ⚠️ {error}
        </div>
      )}

      {!loading && !error && (
        <div style={gridStyle}>
          {meals.map((meal) => (
            <Carte
              key={meal.idMeal}
              meal={meal}
              onToggleFavorite={toggleFavorite}
              isFav={isFavorite(meal.idMeal)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
  gap: "1.5rem",
};

export default HomePage;
