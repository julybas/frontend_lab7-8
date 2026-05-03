export default function InventoryDetails({ item }) {
  return (
    <div className="gh-details">
      <h2
        style={{
          borderBottom: "1px solid #d0d7de",
          paddingBottom: "8px",
          margin: "0 0 16px 0",
          color: "#8e9eb3",
        }}
      >
        {item.inventory_name}
      </h2>
      <p style={{ color: "#57606a", fontSize: "14px" }}>{item.description}</p>

      {item.photo_url && (
        <img
          src={`http://localhost:3000${item.photo_url}`}
          width="300"
          style={{
            borderRadius: "6px",
            border: "1px solid #d0d7de",
            marginTop: "16px",
          }}
        />
      )}
    </div>
  );
}
