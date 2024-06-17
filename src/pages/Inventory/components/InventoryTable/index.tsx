import React from "react";
import Actions from "../Actions";
import { useInventory } from "../../reducer";

interface TableProps {
  loading: boolean;
  isError: boolean;
}

const InventoryTable = ({ loading, isError }: TableProps) => {
  const { inventory: data } = useInventory();

  return (
    <div className="inventory-table-container">
      {loading ? (
        <div>Loading ... </div>
      ) : isError ? (
        <div> Oops!! Error in fetching data.</div>
      ) : (
        <table
          className="data-table"
          border={1}
          cellPadding="5"
          cellSpacing="0">
          <thead>
            <tr className="data-table-header">
              <th>
                <div className="header-label">Name</div>
              </th>
              <th>
                <div className="header-label">Category</div>
              </th>
              <th>
                <div className="header-label">Value</div>
              </th>
              <th>
                <div className="header-label">Quantity</div>
              </th>
              <th>
                <div className="header-label">Price</div>
              </th>
              <th>
                <div className="header-label">ACTIONS</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item: any, index: number) => (
              <tr key={`${index}-${item.name}`} className="data-table-row">
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{item.value}</td>
                <td>{item.quantity}</td>
                <td>{item.price}</td>
                <td>
                  <Actions product={item} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default InventoryTable;
