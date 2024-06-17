import React, { useEffect, useState } from "react";
import { getInventoryData } from "../../api";
import { getMetaData, ProductType, StatsType } from "./utils";
import Stats from "./components/Stats";
import InventoryTable from "./components/InventoryTable";
import "./Inventory.scss";

const defaultStats = {
  totalProducts: 0,
  totalStoreValue: 0,
  outOfstocks: 0,
  totalCategories: 0,
};

const Inventory = () => {
  const [inventory, setInventory] = useState<Array<ProductType>>([]);
  const [metaData, setMetadata] = useState<StatsType>(defaultStats);
  const [loading, setLoading] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    setInventory([]);
    setMetadata(defaultStats);
    getInventoryData()
      .then((res) => {
        setInventory(res.data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const data = getMetaData(inventory);
    setMetadata(data);
  }, [inventory]);

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
      <Stats statsData={metaData} />
      <InventoryTable
        isAdmin={isAdmin}
        tableData={inventory}
        setTableData={setInventory}
        loading={loading}
        isError={!inventory || !inventory.length}
      />
    </div>
  );
};

export default Inventory;
