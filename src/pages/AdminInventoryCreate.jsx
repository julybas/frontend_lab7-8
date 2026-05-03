import { useNavigate } from "react-router-dom";
import { createItem } from "../services/inventoryApi";
import InventoryForm from "../components/inventory/InventoryForm";

export default function AdminInventoryCreate() {
  const navigate = useNavigate();

  const handleSubmit = async ({ formData }) => {
    await createItem(formData);
    navigate("/");
  };

  return (
    <div>
      <br></br>
      <h2>Створити</h2>
      <InventoryForm onSubmit={handleSubmit} />
    </div>
  );
}
