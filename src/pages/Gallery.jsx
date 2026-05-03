import { useEffect, useState } from "react";
import { getInventory } from "../services/inventoryApi";
import InventoryGallery from "../components/gallery/InventoryGallery";
import InventoryQuickView from "../components/gallery/InventoryQuickView";
import FavoritesBar from "../components/gallery/FavoritesBar";

export default function Gallery() {
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    getInventory().then(setItems);
  }, []);

  return (
    <div className="gallery-container">
      <FavoritesBar />

      <h1>Gallery</h1>

      <InventoryGallery items={items} onSelect={setSelected} />

      {selected && (
        <InventoryQuickView item={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}
