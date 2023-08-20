import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Table from "../../components/table/Table";
import "./message.scss";
import Chatting from "../../components/Chatting/Chatting";

export default function Message() {
  return (
    <div className="payment">
      <Sidebar />
      <div className="paymentcontainer">
        <Navbar />
        <div className="listContainer">
          <Chatting/>
        </div>
      </div>
    </div>
  );
}
