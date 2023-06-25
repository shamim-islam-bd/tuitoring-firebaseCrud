import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import TDatatable from "./TDatatable";
import "./teachers.scss";

export default function Teachers() {
  return (
    <div className="techers">
      <Sidebar />
      <div className="techerscontainer">
        <Navbar />
        <div className="listContainer">
          <div className="listTitle">Latest Teachers</div>
          <TDatatable />
        </div>
      </div>
    </div>
  );
}
