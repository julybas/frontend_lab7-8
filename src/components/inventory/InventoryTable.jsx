import { Link } from "react-router-dom";

export default function InventoryTable({ items, onDelete }) {
  if (items.length === 0)
    return (
      <p className="text-center" style={{ color: "#57606a" }}>
        Немає даних
      </p>
    );

  return (
    <div className="gh-container">
      <div
        style={{
          border: "1px solid #d0d7de",
          borderRadius: "6px",
          overflow: "hidden",
        }}
      >
        <table className="gh-table">
          <thead>
            <tr>
              <th>Назва</th>
              <th>Опис</th>
              <th className="text-center">Фото</th>
              <th className="text-right">Дії</th>
            </tr>
          </thead>

          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td style={{ fontWeight: 600, color: "#7f8b99" }}>
                  {item.inventory_name}
                </td>
                <td style={{ color: "#57606a" }}>{item.description}</td>

                <td className="text-center">
                  {item.photo_url ? (
                    <img
                      src={`http://localhost:3000${item.photo_url}`}
                      width="40"
                      style={{
                        borderRadius: "4px",
                        border: "1px solid #d0d7de",
                        verticalAlign: "middle",
                      }}
                    />
                  ) : (
                    <span style={{ color: "#8c959f", fontSize: "12px" }}>
                      Немає
                    </span>
                  )}
                </td>

                <td className="text-right">
                  <Link to={`/details/${item.id}`} className="gh-link">
                    Перегляд
                  </Link>
                  <Link to={`/edit/${item.id}`} className="gh-link">
                    Редагувати
                  </Link>
                  <button
                    onClick={() => onDelete(item.id)}
                    className="gh-btn gh-btn-danger"
                    style={{
                      padding: "3px 8px",
                      fontSize: "12px",
                      marginLeft: "8px",
                    }}
                  >
                    Видалити
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
