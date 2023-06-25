import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Table from "../../components/table/Table";
import "./payments.scss";

export default function Payments() {
  return (
    <div className="payment">
      <Sidebar />
      <div className="paymentcontainer">
        <Navbar />
        <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <Table />
        </div>
      </div>
    </div>
  );
}
