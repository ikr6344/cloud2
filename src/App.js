import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import SingleFiliere from "./pages/single/SingleFiliere";
import New from "./pages/new/New";
import NewFiliere from "./pages/new/NewFiliere";
import Filiere from "./pages/list/Filiere";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { productInputs, userInputs, filiereInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import AdminWork from "./pages/admin/AdminWork";
import Prof from "./pages/prof/Prof";
import Profs from "./pages/list/Profs";
import Courses from "./pages/prof/course/Courses";
import Profile from "./pages/prof/profile/Profile";
import DashboardProf from "./pages/prof/dashboard/Home";
import Details from "./pages/prof/course/Details";
import Notification from "./pages/prof/course/Notification";
import SingleProf from "./pages/single/SingleProf";
import Note from "./pages/list/Note";
import Module from "./pages/list/Module";
import NotFound from "./pages/NotFound";
import ElementModule from "./pages/list/ElementModule";
import Student from "./pages/student/Student";
import Notes from "./pages/student/note/note";
import Profile1 from "./pages/student/profile/profile";
import DevoirsEtudiant from "./pages/student/devoir/devoir";
function App() {
  const { darkMode } = useContext(DarkModeContext);
  const { currentUser, userId } = useContext(AuthContext); // Utilisez userId ici

  console.log("id", userId);

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
        <Route path="/login" element={<Login />} />

          <Route path="/">
          <Route path="/profile/:userId" element={<RequireAuth><Profile /></RequireAuth>} />
          {/* Routes for admin */}
          {currentUser && currentUser.role === 'admin' && (
              <>
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
                path="view/:studentId"
                element={
                  <RequireAuth>
                    <Single />
                  </RequireAuth>
                }
              />
              
            </Route>
            <Route path="module">
              <Route
                index
                element={
                  <RequireAuth>
                    <Module />
                  </RequireAuth>
                }
              />
             
              
            </Route>
            <Route path="element">
              <Route
                index
                element={
                  <RequireAuth>
                    <ElementModule />
                  </RequireAuth>
                }
              />
             
              
            </Route>
            <Route path="notes">
              <Route
                index
                element={
                  <RequireAuth>
                    <Note />
                  </RequireAuth>
                }
              />
              
            </Route>
            <Route path="profs">
              <Route
                index
                element={
                  <RequireAuth>
                    <Profs />
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
                path="newFiliere"
                element={
                  <RequireAuth>
                    <NewFiliere inputs={filiereInputs} title="Add New Filiere" />
                  </RequireAuth>
                }
              />
            </Route>
              </>
            )}
{currentUser && currentUser.role === 'prof' && (
              <>
                <Route path="prof" index element={<RequireAuth><Prof /></RequireAuth>} />
                <Route path="/courses/:userId" element={<RequireAuth><Courses /></RequireAuth>} />
                <Route path="/dash/:userId" element={<RequireAuth><DashboardProf /></RequireAuth>} />
                <Route path="/notif/:userId" element={<RequireAuth><Notification /></RequireAuth>} />
                <Route path="/details/:elementModuleId" element={<RequireAuth><Details /></RequireAuth>} />
              </>
            )}
            {currentUser && currentUser.role === 'etudiant' && (
              <>
              <Route path="/student" element={<Student />} />
              <Route path="/notes" element={<Notes />} />
              <Route path="/profile" element={<Profile1 />} />
              <Route path="/devoir" element={<DevoirsEtudiant/>} />
              </>
             )}

                        <Route path="/error" element={< NotFound/>} />

            <Route path="*" element={<Navigate to="/error" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
