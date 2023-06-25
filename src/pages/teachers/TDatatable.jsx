import { collection, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../firebase";
import "./tdatatable.scss";

const TDatatable = () => {
  const [data, setData] = useState([]);
  const subjectOptions = [
    "Math",
    "Science",
    "History",
    "Mathematics",
    "Science",
    "English",
    "History",
    "Geography",
    "Physics",
    "Chemistry",
  ]; // Update with your subject options

  // filter teachers by role
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
      const dataList = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      const teachers = dataList.filter((item) => item.role === "teacher");
      setData(teachers);
    });

    return unsubscribe;
  }, []);

  // filter teachers by subject
  const handleSubjectChange = async (e) => {
    const selectedSubject = e.target.value;

    try {
      const teachersRef = collection(db, "users");
      const teachersQuery = query(
        teachersRef,
        where("role", "==", "teacher"),
        where("subjects", "array-contains", selectedSubject)
      );
      const teachersSnapshot = await getDocs(teachersQuery);

      const teachers = teachersSnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setData(teachers);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
        <select id="subjects" onChange={handleSubjectChange}>
          {subjectOptions?.map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </select>
      </div>
      <div className="datatable">
        {data.map((item) => (
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
                  <span className="itemKey">Experience:</span>
                  <span className="itemValue">{item.experience} years</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Expert:</span>
                  {item.subjects?.map((sv) => (
                    <span
                      className="itemValue"
                      style={{
                        padding: "5px",
                        margin: "2px",
                        backgroundColor: "#ddd",
                      }}
                      key={sv}
                    >
                      {sv}
                    </span>
                  ))}
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
    </>
  );
};

export default TDatatable;
