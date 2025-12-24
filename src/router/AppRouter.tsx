import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import Home from "../pages/dashboard/Home";
import Users from "../pages/dashboard/Users";
import Templates from "../pages/dashboard/Templates";

import Login from "../pages/auth/Login";
import {} from "../store/auth/auth.slice";
import TemplatesList from "../pages/templates/TemplatesList";
import CreateTemplate from "../pages/templates/CreateTemplate";
import ViewTemplate from "../pages/templates/ViewTemplate";
import EditTemplate from "../pages/templates/EditTemplate";
import { isAuthenticated } from "../store/auth/auth.selectors";
import { useSelector } from "react-redux";

const AppRouter = () => {

    const isAuth = useSelector(isAuthenticated);


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={
          !isAuth ? <Login /> : <Navigate to="/" />
        } />

        <Route
          path="/"
          element={
            isAuth ? <DashboardLayout /> : <Navigate to="/login" />
          }
        >
          <Route index element={<Home />} />
          <Route path="users" element={<Users />} />
          <Route path="/templates" element={<TemplatesList />} />
          <Route path="/templates/new" element={<CreateTemplate />} />
          <Route path="/templates/:id" element={<ViewTemplate />} />
          <Route path="/templates/:id/edit" element={<EditTemplate />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
