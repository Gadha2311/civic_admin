import React from "react";
import AdminDashboard from "./pages/adminDashboard/adminDashboard";
import Adminlogin from "./pages/adminlogin/adminlogin";
import Userlist from "./pages/userlist/userlist";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAdminAuth } from "./context/adminAuthcontext";

function App() {
  const { isAdminAuthenticated } = useAdminAuth();
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            !isAdminAuthenticated ? <Adminlogin /> : <Navigate to="/dashbord" />
          }
        >
          {" "}
        </Route>
        <Route
          path="/adminlogin"
          element={
            !isAdminAuthenticated ? <Adminlogin /> : <Navigate to="/dashbord" />
          }
        >
          {" "}
        </Route>
        <Route
          path="/dashbord"
          element={
            isAdminAuthenticated ? (
              <AdminDashboard />
            ) : (
              <Navigate to="/adminlogin" />
            )
          }
        >
          {" "}
        </Route>
        <Route
          path="/userlist"
          element={
            isAdminAuthenticated ? <Userlist /> : <Navigate to="/adminlogin" />
          }
        >
          {" "}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
