import { useContext, useState } from "react";
import "./login.scss";

import { signInWithEmailAndPassword } from "firebase/auth"; // for Firebase Auth
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { auth } from "../../firebase"; // for Firebase Auth

const Login = () => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { dispatch } = useContext(AuthContext);

  const handlelogin = (e) => {
    e.preventDefault();
    setError(true);

    // Firebase email password Auth
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // console.log(user);
        dispatch({ type: "LOGIN", payload: user });
        navigate("/");
      })
      .catch((error) => {
        setError(true);
      });
  };

  return (
    <div>
      <div className="container">
        <h1>Login</h1>
        <form onSubmit={handlelogin}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              name="email"
              placeholder="Enter your Email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              name="password"
              placeholder="Enter your password"
            />
          </div>
          <div className="form-group">
            <button type="submit">Login</button>
          </div>
          {error && <span className="error-msg">Wrong email or password!</span>}
        </form>
      </div>
    </div>
  );
};

export default Login;
