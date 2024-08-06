import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AuthWrapper from "./authWraper";

const PageRouter = () => {
  return (
    <Router>
      <AuthWrapper />
    </Router>
  );
};

export default PageRouter;
