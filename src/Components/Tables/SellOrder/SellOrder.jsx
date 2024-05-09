import React from "react";
import css from "./SellOrder.module.css";
import data from "../../../Dist/Data/data.json";

export default function SellOrder() {
  const row = data.sell.slice(0, 9);
  return (
    <div className={css.container}>
      <table className={css.table} border={0}>
        <thead>
          <tr>
            <th>Price</th>
            <th>Amount </th>
            <th>Operation</th>
          </tr>
        </thead>
        <tbody>
          {row.map((item, i) => (
            <tr key={i}>
              <td>{item.price}$</td>
              <td>{item.amount}</td>
              <td>{item.operationType}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
