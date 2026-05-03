import { useState } from "react";

export function useFavorites() {
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || [],
  );

  const toggleFavorite = (item) => {
    let updated;

    if (favorites.find((f) => f.id === item.id)) {
      updated = favorites.filter((f) => f.id !== item.id);
    } else {
      updated = [...favorites, item];
    }

    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  const isFavorite = (id) => {
    return favorites.some((f) => f.id === id);
  };

  return { favorites, toggleFavorite, isFavorite };
}
