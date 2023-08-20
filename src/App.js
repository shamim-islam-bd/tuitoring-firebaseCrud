import { useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import { DarkModeContext } from "./context/darkModeContext";
import { newUserInputs, productInputs, userInputs } from "./formSource";
import Home from "./pages/home/Home";
import List from "./pages/list/List";
import Login from "./pages/login/Login";
import New from "./pages/new/New";
import Payments from "./pages/payment/Payments";
import Profile from "./pages/profile/Profile";
import Signup from "./pages/signup/signup";
import Single from "./pages/single/Single";
import Teachers from "./pages/teachers/Teachers";
import "./style/dark.scss";
import Message from "./pages/message/Message";

function App() {
  const { darkMode } = useContext(DarkModeContext);
  const { currentUser } = useContext(AuthContext);

  // const currentUser = false;
  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };

  const admin = JSON.parse(localStorage.getItem("admin")) || true;
  const student = JSON.parse(localStorage.getItem("student")) || true;
  const teacher = JSON.parse(localStorage.getItem("teacher")) || true;

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route
              index
              element={
                <RequireAuth>
                  <Home />
                </RequireAuth>
              }
            />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup inputs={userInputs} title="Sign up as a new user." />} />
          <Route path="profile" element={<Profile inputs={userInputs} title="Update Profile" />} />
          <Route path="users">
            <Route
              index
              element={
                <RequireAuth>
                  <List />
                </RequireAuth>
              }
            />
            <Route
              path=":userId"
              element={
                <RequireAuth>
                  <Single />
                </RequireAuth>
              }
            />
            <Route
              path="new"
              element={
                <RequireAuth>
                  <New inputs={newUserInputs} title="Add New User" />
                </RequireAuth>
              }
            />
          </Route>
          <Route path="products">
            <Route
              index
              element={
                <RequireAuth>
                  <List />
                </RequireAuth>
              }
            />
            <Route
              path=":productId"
              element={
                <RequireAuth>
                  <Single />
                </RequireAuth>
              }
            />
            <Route
              path="new"
              element={
                <RequireAuth>
                  <New inputs={productInputs} title="Add New Product" />
                </RequireAuth>
              }
            />
          </Route>
          <Route
            path="/teachers"
            element={
              <RequireAuth>
                <Teachers />
              </RequireAuth>
            }
          >
          </Route>
          <Route path="/teachers/:teacherId" element={<RequireAuth><Single /></RequireAuth>} />
          <Route
            path="/message/:teacherId"
            element={
              <RequireAuth>
                <Message />
              </RequireAuth>
            }
          ></Route>
          <Route
            path="payments"
            element={
              <RequireAuth>
                <Payments />
              </RequireAuth>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
