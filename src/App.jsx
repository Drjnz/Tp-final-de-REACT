import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";
import FavoritesPage from "./pages/FavoritesPage";
import { useFavorites } from "./hooks/UseFavorites";

function App() {
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  return (
    <BrowserRouter>
      <Navbar favoritesCount={favorites.length} />
      <main style={{ maxWidth: "1100px", margin: "0 auto", padding: "1.5rem" }}>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage toggleFavorite={toggleFavorite} isFavorite={isFavorite} />
            }
          />
          <Route
            path="/meal/:id"
            element={
              <DetailPage toggleFavorite={toggleFavorite} isFavorite={isFavorite} />
            }
          />
          <Route
            path="/favorites"
            element={
              <FavoritesPage
                favorites={favorites}
                toggleFavorite={toggleFavorite}
                isFavorite={isFavorite}
              />
            }
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
export default App;