import React, { useEffect, useState } from "react";
import { getInventoryData } from "../../api";
import { useInventory } from "./reducer";
import InventoryTable from "./components/InventoryTable";
import Stats from "./components/Stats";
import "./Inventory.scss";

const Inventory = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { inventory, saveInventory, isAdmin, setIsAdmin } = useInventory();

  useEffect(() => {
    setLoading(true);
    saveInventory([]);
    getInventoryData()
      .then((res) => {
        saveInventory(res.data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => setLoading(false));
  }, [saveInventory]);

  return (
    <div className="inventory-app-container">
      <div className="inventory-app-header">
        <div
          className={`user-role-btn ${isAdmin ? "active" : ""}`}
          onClick={() => setIsAdmin(true)}>
          admin
        </div>
        <div
          className={`user-role-btn ${!isAdmin ? "active" : ""}`}
          onClick={() => setIsAdmin(false)}>
          user
        </div>
      </div>
      <div className="section-heading">Inventory Stats</div>
      <Stats />
      <InventoryTable
        loading={loading}
        isError={!inventory || !inventory.length}
      />
    </div>
  );
};

export default Inventory;
