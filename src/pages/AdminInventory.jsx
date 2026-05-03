import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getInventory, deleteItem } from "../services/inventoryApi";
import ConfirmModal from "../components/inventory/ConfirmModal";
import InventoryTable from "../components/inventory/InventoryTable";

export default function AdminInventory() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const loadData = async () => {
    const data = await getInventory();
    setItems(data);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = (id) => {
    setSelectedId(id);
    setModalOpen(true);
  };

  const confirmDelete = async () => {
    await deleteItem(selectedId);
    setModalOpen(false);
    loadData();
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Inventory</h1>

      <Link to="/create">+ Додати</Link>

      <InventoryTable items={items} onDelete={handleDelete} />

      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
