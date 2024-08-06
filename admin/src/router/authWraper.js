import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/auth/Login";
import Dashboard from "../pages/Dashboard";
import DepartmentPage from "../pages/department";
import DepartmentForms from "../pages/department/department";
import UniversityPage from "../pages/university";
import UniversityForms from "../pages/university/university";
import CollegePage from "../pages/college";
import CollegeForms from "../pages/college/college";
import DestinationForms from "../pages/designation/destination";
import DestinationPage from "../pages/designation";
import EmployeePage from "../pages/employee";
import EmployeeForms from "../pages/employee/employee";
import CountryPage from "../pages/region/country";
import CountryForms from "../pages/region/country/country";
import StatePage from "../pages/region/state";
import StateForms from "../pages/region/state/state";
import useAuth from "../pages/auth/hook/useAuth";
import Register from "../pages/auth/register";

const AuthWrapper = ({ children }) => {
  const { isAuthenticated } = useAuth();
  //   useEffect(() => {
  //     const checkAuth = async () => {
  //       const authenticated = isAuthenticated();
  //       if (!authenticated) {
  //         window.location.replace("/login");
  //       }
  //     };

  //     checkAuth();
  //   }, []);

  return (
    <Routes>
      {isAuthenticated() ? (
        <>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Departmet  */}
          <Route path="/department" element={<DepartmentPage />} />
          <Route path="/department/create" element={<DepartmentForms />} />
          <Route path="/department/update/:id" element={<DepartmentForms />} />

          {/* University  */}
          <Route path="/university" element={<UniversityPage />} />
          <Route path="/university/create" element={<UniversityForms />} />
          <Route path="/university/update/:id" element={<UniversityForms />} />

          {/* College  */}
          <Route path="/college" element={<CollegePage />} />
          <Route path="/college/create" element={<CollegeForms />} />
          <Route path="/college/update/:id" element={<CollegeForms />} />

          {/* College  */}
          <Route path="/designation" element={<DestinationPage />} />
          <Route path="/designation/create" element={<DestinationForms />} />
          <Route
            path="/designation/update/:id"
            element={<DestinationForms />}
          />

          {/* Employee */}
          <Route path="/employee" element={<EmployeePage />} />
          <Route path="/employee/create" element={<EmployeeForms />} />
          <Route path="/employee/update/:id" element={<EmployeeForms />} />

          {/* Country */}
          <Route path="/region/country" element={<CountryPage />} />
          <Route path="/region/country/create" element={<CountryForms />} />
          <Route path="/region/country/update/:id" element={<CountryForms />} />

          {/* State */}
          <Route path="/region/state" element={<StatePage />} />
          <Route path="/region/state/create" element={<StateForms />} />
          <Route path="/region/state/update/:id" element={<StateForms />} />

          {/* City */}
          <Route path="/region/country" element={<CountryPage />} />
          <Route path="/region/country/create" element={<CountryForms />} />
          <Route path="/region/country/update/:id" element={<CountryForms />} />
        </>
      ) : (
        <>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<Register />} />
        </>
      )}
    </Routes>
  );
};

export default AuthWrapper;
