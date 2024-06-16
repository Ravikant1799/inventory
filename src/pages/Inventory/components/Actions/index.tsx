import React, { ChangeEvent, useState } from "react";
import { MdEdit } from "react-icons/md";
import { IoEyeOff } from "react-icons/io5";
import { IoEye } from "react-icons/io5";
import { MdDelete } from "react-icons/md";

import Modal from "../Modal";
import { ProductType } from "../../utils";
import "./Actions.scss";

export interface ActionsProps {
  product: ProductType;
  isAdmin: boolean;
  deleteProduct: (productName: string) => void;
  disableProduct: (productName: string) => void;
  updateProduct: (product: ProductType) => void;
}

const Actions = ({
  deleteProduct,
  disableProduct,
  updateProduct,
  product,
  isAdmin,
}: ActionsProps) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState<ProductType>({
    ...product,
  });

  const editsDisabled = isAdmin && product.disabled;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div id={product.name} className="actions-container">
      <div
        className="action-btn"
        onClick={() =>
          editsDisabled || !isAdmin ? {} : setModalOpen(!isModalOpen)
        }>
        <MdEdit />
      </div>
      <div
        className="action-btn"
        onClick={() => (!isAdmin ? {} : disableProduct(product.name))}>
        {product.disabled ? <IoEyeOff /> : <IoEye />}
      </div>
      <div
        className="action-btn"
        onClick={() =>
          editsDisabled || !isAdmin ? {} : deleteProduct(product.name)
        }>
        <MdDelete />
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <div className="modal-header">
          <div className="modal-heading">Edit Product</div>
          <div className="modal-sub-heading">This is a modal.</div>
        </div>
        <form className="form-container">
          <div className="form-input-container">
            <label className="input-label" htmlFor="category">
              Category
            </label>
            <input
              className="form-input"
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
            />
          </div>
          <div className="form-input-container">
            <label className="input-label" htmlFor="price">
              Price
            </label>
            <input
              className="form-input"
              type="text"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
          </div>
          <div className="form-input-container">
            <label className="input-label" htmlFor="quantity">
              Quantity
            </label>
            <input
              className="form-input"
              type="number"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
            />
          </div>
          <div className="form-input-container">
            <label className="input-label" htmlFor="value">
              Value
            </label>
            <input
              className="form-input"
              type="text"
              id="value"
              name="value"
              value={formData.value}
              onChange={handleChange}
            />
          </div>
        </form>
        <div className="modal-footer">
          <div
            className="modal-footer-cancel"
            onClick={() => setModalOpen(false)}>
            Cancel
          </div>
          <div
            className="modal-footer-submit"
            onClick={() => {
              updateProduct(formData);
              setModalOpen(false);
            }}>
            Save
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Actions;
