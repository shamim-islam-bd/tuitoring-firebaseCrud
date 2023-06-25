import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../firebase";
import "./tdatatable.scss";

const TDatatable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "users"), (snapshot) => {
      const dataList = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setData(dataList);
    });

    return unsub;
  }, []);

  return (
    <div className="datatable">
      {data.map((item) => (
        console.log("item", item.id),
        <div className="profile" key={item.id}>
          <div className="editButton">Edit</div>
          <div className="item">
            <img src={item.img} alt={item.name} className="itemImg" />
            <div className="details">
              <h1 className="itemTitle">{item.name}</h1>
              <div className="detailItem">
                <span className="itemKey">Email:</span>
                <span className="itemValue">{item.email}</span>
              </div>
              <div className="detailItem">
                <span className="itemKey">Phone:</span>
                <span className="itemValue">{item.phone}</span>
              </div>
              <div className="detailItem">
                <span className="itemKey">Address:</span>
                <span className="itemValue">{item.address}</span>
              </div>
              <div className="detailItem">
                <span className="itemKey">Country:</span>
                <span className="itemValue">{item.country}</span>
              </div>
              <div>
                <div className="cellAction">
                  <Link
                    to={`/teachers/${item.id}`}
                    style={{ textDecoration: "none", fontSize: "13px" }}
                  >
                    <div className="viewButton">View Details</div>
                  </Link>
                  <Link
                    to="/message"
                    style={{ textDecoration: "none", fontSize: "13px" }}
                  >
                    Message
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TDatatable;
