import { useFavorites } from "../../hooks/useFavorites";

export default function InventoryCard({ item, onClick }) {
  const { toggleFavorite, isFavorite } = useFavorites();

  return (
    <div className="card" onClick={onClick}>
      <div className="image-wrapper">
        {item.photo_url && (
          <img src={`http://localhost:3000${item.photo_url}`} />
        )}

        <button
          className="fav-btn"
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(item);
          }}
        >
          {isFavorite(item.id) ? "❤️" : "🤍"}
        </button>
      </div>

      <h3>{item.inventory_name}</h3>
    </div>
  );
}
