import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db, storage } from "../../firebase";
import "./new.scss";

const Signup = ({ inputs, title }) => {
  const navigate = useNavigate();
  const [file, setFile] = useState("");
  const [data, setData] = useState({});
  const [per, setPer] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { id, value } = e.target;

    // Handle multiple select fields
    if (e.target.multiple) {
      const selectedOptions = Array.from(e.target.selectedOptions).map(
        (option) => option.value
      );
      setData((prevData) => ({ ...prevData, [id]: selectedOptions }));
    } else {
      setData((prevData) => ({ ...prevData, [id]: value }));
    }
  };

  useEffect(() => {
    let isMounted = true; // Add a flag to track if the component is mounted or not

    const uploadImage = async () => {
      if (file) {
        const name = new Date().getTime() + file.name;
        const storageRef = ref(storage, file.name);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            if (isMounted) {
              setPer(progress);
            }
          },
          (error) => {
            console.log(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              if (isMounted) {
                setData((prev) => ({ ...prev, img: downloadURL }));
              }
            });
          }
        );
      }
    };

    uploadImage();

    return () => {
      isMounted = false; // Clean up the flag when the component is unmounted
    };
  }, [file, success]);

  const handleAdd = async (e) => {
    e.preventDefault();

    try {
      // Firebase email password Auth
      const res = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      // Add a new document in collection "users"
      await setDoc(doc(db, "users", res.user.uid), {
        ...data,
        timeStamp: new Date(),
      });

      setSuccess(true);
      navigate("/");

      // Reset all input fields
      inputs.forEach((input) => {
        setData((prev) => ({ ...prev, [input]: "" }));
      });
    } catch (error) {
      console.log(error);
    }
  };

  console.log(data);

  return (
    <div className="new">
      <div className="newContainer">
        <div className="top">
          <h1>{title}</h1>
          {success && ( // if success is true then show success message
            <span className="success">Successfully submitted</span>
          )}
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form onSubmit={handleAdd}>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

              {inputs?.map((input) => (
                <div className="formInput" key={input.id}>
                  <label htmlFor={input.id}>{input.label}</label>
                  {input.type === "select" ? (
                    <select
                      id={input.id}
                      onChange={handleInputChange}
                      multiple={input.multiple}
                    >
                      {input.options.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      id={input.id}
                      type={input.type}
                      placeholder={input.placeholder}
                      onChange={handleInputChange}
                    />
                  )}
                </div>
              ))}

              <button disabled={per !== null && per < 100} type="submit">
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
