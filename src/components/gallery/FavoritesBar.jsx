import { Link } from "react-router-dom";
import { useFavorites } from "../../hooks/useFavorites";

export default function FavoritesBar() {
  const { favorites } = useFavorites();

  return (
    <div className="favorites-bar">
      <Link to="/gallery">Gallery</Link>
      <Link to="/favorites">❤️ Favorites ({favorites.length})</Link>
    </div>
  );
}
