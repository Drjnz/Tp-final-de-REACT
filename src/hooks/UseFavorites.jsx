import { useState, useEffect } from "react";
function useFavorites() {
  const [favorites, setFavorites] = useState(() => {
    try {
      const stored = localStorage.getItem("favorites");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  function toggleFavorite(meal) {
    setFavorites((prev) =>
      prev.some((m) => m.idMeal === meal.idMeal)
        ? prev.filter((m) => m.idMeal !== meal.idMeal)
        : [...prev, meal]
    );
  }

  function isFavorite(id) {
    return favorites.some((m) => m.idMeal === id);
  }

  return { favorites, toggleFavorite, isFavorite };
}
export { useFavorites };