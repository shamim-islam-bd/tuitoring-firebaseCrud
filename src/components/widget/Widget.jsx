import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import "./widget.scss";

const { collection, query, getDocs, where } = require("@firebase/firestore");

const Widget = ({ type }) => {
  // const [amount, setAmount] = useState(null);
  // const [diff, setDiff] = useState(null);

  let data;

  //temporary
  const amount = 100;
  const diff = 20;

  switch (type) {
    case "user":
      data = {
        title: "USERS",
        isMoney: false,
        link: "See all users",
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "order":
      data = {
        title: "ORDERS",
        isMoney: false,
        link: "View all orders",
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "earning":
      data = {
        title: "EARNINGS",
        isMoney: true,
        link: "View net earnings",
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "balance":
      data = {
        title: "BALANCE",
        isMoney: true,
        link: "See details",
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const today = new Date();
  //     const lastmonth = new Date(today.setMonth(today.getMonth() - 1));
  //     const prevMonth = new Date(today.setMonth(today.getMonth() - 2));

  //     const lastmonthQuery = query(
  //       collection(db, "users"),
  //       where("timeStamp", "<=", today),
  //       where("timeStamp", ">", lastmonth)
  //     );
  //     const prevMonthQuery = query(
  //       collection(db, "users"),
  //       where("timeStamp", ">", lastmonth),
  //       where("timeStamp", ">", prevMonth)
  //     );

  //     const glastmonthData = await getDocs(lastmonthQuery);
  //     const prevMonthData = await getDocs(prevMonthQuery);

  //     setAmount(glastmonthData.docs.length);
  //     setDiff((lastmonth.docs.length - prevMonthData.docs.length) / prevMonthData.docs.length * 100);
  //   };
  //   fetchData();
  // }, []);

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney && "$"} {amount}
        </span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
          {diff} %
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
