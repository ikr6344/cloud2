import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import SingleFiliere from "./pages/single/SingleFiliere";
import New from "./pages/new/New";
import NewFiliere from "./pages/new/NewFiliere";
import Filiere from "./pages/list/Filiere";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { productInputs, userInputs,filiereInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import AdminWork from "./pages/admin/AdminWork"
import Prof from "./pages/prof/Prof"
import Courses from "./pages/prof/course/Courses"
import Profile from "./pages/prof/profile/Profile"
import DashboardProf from './pages/prof/dashboard/Home'
import Details  from './pages/prof/course/Details';
import Notification from './pages/prof/course/Notification';
function App() {
  const { darkMode } = useContext(DarkModeContext);
  const { currentUser, userId } = useContext(AuthContext); // Utilisez userId ici

  console.log("id",userId)

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            <Route
              index
              element={
                <RequireAuth>
                  <Home />
                </RequireAuth>
              }
            />
            <Route path="template" index element={ <RequireAuth> <AdminWork /></RequireAuth>} />
            <Route path="students">
              <Route
                index
                element={
                  <RequireAuth>
                    <List />
                  </RequireAuth>
                }
              />
              <Route
                path=":studentId"
                element={
                  <RequireAuth>
                    <Single />
                  </RequireAuth>
                }
              />
              <Route
                path="newStudent"
                element={
                  <RequireAuth>
                    <New inputs={userInputs} title="Add New User" />
                  </RequireAuth>
                }
              />
            </Route>
            <Route path="fields">
              <Route
                index
                element={
                  <RequireAuth>
                    <Filiere />
                  </RequireAuth>
                }
              />
              <Route
                path=":fieldId"
                element={
                  <RequireAuth>
                    <SingleFiliere />
                  </RequireAuth>
                }
              />
              <Route
                path="newFiliere"
                element={
                  <RequireAuth>
                    <NewFiliere inputs={filiereInputs} title="Add New Filiere" />
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
            <Route path="prof" index
                element={
                  <RequireAuth>
<Prof />                  </RequireAuth>
                } />
            <Route path="/courses/:userId" element={
                  <RequireAuth><Courses /></RequireAuth>} />
            <Route path="/profile/:userId" element={<Profile />} />
            <Route path="/dash/:userId" element={<DashboardProf />} />
            <Route path="/notif/:userId" element={<Notification />} />
            <Route path="/details/:elementModuleId" element={<Details />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
