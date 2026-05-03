import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getItem } from "../services/inventoryApi";
import InventoryDetails from "../components/inventory/InventoryDetails";

export default function AdminInventoryDetails() {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    getItem(id).then(setItem);
  }, [id]);

  if (!item) return <p>Loading...</p>;

  return <InventoryDetails item={item} />;
}
