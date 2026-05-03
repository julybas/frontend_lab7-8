export default function InventoryQuickView({ item, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <img src={`http://localhost:3000${item.photo_url}`} />

        <h2>{item.inventory_name}</h2>
        <p>{item.description}</p>

        <br></br>
        <button className="gh-btn" onClick={onClose}>
          Закрити
        </button>
      </div>
    </div>
  );
}
