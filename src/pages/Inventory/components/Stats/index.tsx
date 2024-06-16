import React from "react";
import { StatsType } from "../../utils";
import { RiExchangeDollarLine } from "react-icons/ri";
import { MdRemoveShoppingCart } from "react-icons/md";
import { MdShoppingCart } from "react-icons/md";
import { MdCategory } from "react-icons/md";

import "./Stats.scss";

const Stats = ({ statsData }: { statsData: StatsType }) => {
  return (
    <div className="stats-container">
      <div className="stats-item">
        <MdShoppingCart />
        <div className="stats-label-value">
          <div className="stats-item-label">Total Product</div>
          <div className="stats-item-value">{statsData.totalProducts}</div>
        </div>
      </div>
      <div className="stats-item">
        <RiExchangeDollarLine />
        <div className="stats-label-value">
          <div className="stats-item-label">Total Store Value</div>
          <div className="stats-item-value">{statsData.totalStoreValue}</div>
        </div>
      </div>
      <div className="stats-item">
        <MdRemoveShoppingCart />
        <div className="stats-label-value">
          <div className="stats-item-label">Out of Stocks</div>
          <div className="stats-item-value">{statsData.outOfstocks}</div>
        </div>
      </div>
      <div className="stats-item">
        <MdCategory />
        <div className="stats-label-value">
          <div className="stats-item-label">No. of Categories</div>
          <div className="stats-item-value">{statsData.totalCategories}</div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
