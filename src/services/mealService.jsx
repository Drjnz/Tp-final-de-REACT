const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

export async function searchMeals(query) {
  const res = await fetch(`${BASE_URL}/search.php?s=${query}`);
  if (!res.ok) throw new Error("Erreur réseau");
  const data = await res.json();
  return data.meals || [];
}

export async function getMealById(id) {
  const res = await fetch(`${BASE_URL}/lookup.php?i=${id}`);
  if (!res.ok) throw new Error("Erreur réseau");
  const data = await res.json();
  return data.meals ? data.meals[0] : null;
}

export async function getRandomMeals() {
  const results = await Promise.all(
    Array.from({ length: 8 }, () =>
      fetch(`${BASE_URL}/random.php`).then((r) => r.json())
    )
  );
  return results.map((d) => d.meals[0]);
}