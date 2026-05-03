import { useState } from "react";

export default function InventoryForm({ initialData = {}, onSubmit }) {
  const [name, setName] = useState(initialData.inventory_name || "");
  const [description, setDescription] = useState(initialData.description || "");
  const [photo, setPhoto] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("inventory_name", name);
    formData.append("description", description);
    if (photo) formData.append("photo", photo);
    onSubmit({ name, description, photo, formData });
  };

  return (
    <div className="gh-container">
      <form
        onSubmit={handleSubmit}
        className="gh-details"
        style={{ maxWidth: "500px", margin: "0 auto" }}
      >
        <h2
          style={{
            marginTop: 0,
            marginBottom: "20px",
            borderBottom: "1px solid #d0d7de",
            paddingBottom: "10px",
          }}
        >
          Редагувати запис
        </h2>

        <div className="gh-form-group">
          <label>Назва</label>
          <input
            className="gh-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="gh-form-group">
          <label>Опис</label>
          <textarea
            className="gh-input"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
          />
        </div>

        <div className="gh-form-group">
          <label>Фото</label>
          <input
            className="gh-input"
            style={{ border: "none", padding: 0, boxShadow: "none" }}
            type="file"
            onChange={(e) => setPhoto(e.target.files[0])}
          />
        </div>

        <div className="gh-actions">
          <button type="submit" className="gh-btn gh-btn-primary">
            Зберегти
          </button>
        </div>
      </form>
    </div>
  );
}
