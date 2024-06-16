import React from "react";
import Actions from "../Actions";
import { ProductType } from "../../utils";

const InventoryTable = ({
  loading,
  isError,
  isAdmin,
  tableData: data,
  setTableData,
}: any) => {
  const deleteProduct = (productName: string) => {
    const filteredData = data.filter(
      (product: any) => product.name !== productName
    );
    setTableData(filteredData);
  };

  const updateProduct = (updatedProduct: ProductType) => {
    const updatedData = data.map((product: any) => {
      if (product.name !== updatedProduct.name) return product;

      return updatedProduct;
    });
    setTableData(updatedData);
  };

  const disableProduct = (productName: string) => {
    const updatedData = data.map((product: any) => {
      if (product.name !== productName) return product;

      return {
        ...product,
        disabled: !!!product.disabled,
      };
    });
    setTableData(updatedData);
  };

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
              <tr key={index} className="data-table-row">
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{item.value}</td>
                <td>{item.quantity}</td>
                <td>{item.price}</td>
                <td>
                  <Actions
                    deleteProduct={deleteProduct}
                    updateProduct={updateProduct}
                    disableProduct={disableProduct}
                    isAdmin={isAdmin}
                    product={item}
                  />
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
