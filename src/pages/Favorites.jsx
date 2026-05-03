import { useState } from "react";
import { useFavorites } from "../hooks/useFavorites";
import InventoryGallery from "../components/gallery/InventoryGallery";
import InventoryQuickView from "../components/gallery/InventoryQuickView";
import FavoritesBar from "../components/gallery/FavoritesBar";

export default function Favorites() {
  const { favorites } = useFavorites();
  const [selected, setSelected] = useState(null);

  return (
    <div className="gallery-container">
      <FavoritesBar />

      <h1>Favorites</h1>

      <InventoryGallery items={favorites} onSelect={setSelected} />

      {selected && (
        <InventoryQuickView item={selected} onClose={() => setSelected(null)} />
      )}

      {favorites.length === 0 && <p>Немає улюблених</p>}
    </div>
  );
}
