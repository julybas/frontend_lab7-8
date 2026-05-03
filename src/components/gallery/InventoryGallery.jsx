import InventoryCard from "./InventoryCard";

export default function InventoryGallery({ items, onSelect }) {
  if (!items.length) return <p>Немає даних</p>;

  return (
    <div className="grid">
      {items.map((item) => (
        <InventoryCard
          key={item.id}
          item={item}
          onClick={() => onSelect(item)}
        />
      ))}
    </div>
  );
}
