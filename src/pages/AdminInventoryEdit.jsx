import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getItem, updateItem, updatePhoto } from "../services/inventoryApi";
import InventoryForm from "../components/inventory/InventoryForm";

export default function AdminInventoryEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState(null);

  useEffect(() => {
    getItem(id).then(setItem);
  }, [id]);

  const handleSubmit = async ({ name, description, photo, formData }) => {
    await updateItem(id, {
      inventory_name: name,
      description,
    });

    if (photo) {
      await updatePhoto(id, formData);
    }

    navigate("/");
  };

  if (!item) return <p>Loading...</p>;

  return (
    <div>
      <h2>Редагування</h2>
      <InventoryForm initialData={item} onSubmit={handleSubmit} />
    </div>
  );
}
