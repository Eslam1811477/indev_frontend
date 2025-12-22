import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import Home from "../pages/dashboard/Home";
import Users from "../pages/dashboard/Users";
import Login from "../pages/auth/Login";
import { isAuthenticated } from "../auth/func";

const AppRouter = () => {
  const ISAuthenticated = isAuthenticated()

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={
          !ISAuthenticated ? <Login /> : <Navigate to="/" />
        } />

        <Route
          path="/"
          element={
            ISAuthenticated ? <DashboardLayout /> : <Navigate to="/login" />
          }
        >
          <Route index element={<Home />} />
          <Route path="users" element={<Users />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
