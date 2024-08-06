import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Menu from "./Menu";
import { Link, useLocation } from "react-router-dom";
// import '../../assets/themes/default/assets/js/jquery.min.js';
// import '../../assets/themes/default/assets/js/bootstrap/bootstrap.bundle.min.js';
// import '../../assets/themes/default/assets/js/icons/feather-icon/feather.min.js';
// import '../../assets/themes/default/assets/js/scrollbar/simplebar.js';

const MainContainer = ({ children }) => {
  const location = useLocation();
  const currentYear = new Date().getFullYear();
  const getBreadcrumb = () => {
    const paths = location.pathname.split("/").filter((path) => path !== "");
    let breadcrumbItems = [];

    breadcrumbItems.push(
      <li key="home" className="breadcrumb-item">
        <Link to="/dashboard">Home</Link>
      </li>
    );

    for (let i = 0; i < paths.length; i++) {
      const path = `/${paths.slice(0, i + 1).join("/")}`;
      const name = paths[i].charAt(0).toUpperCase() + paths[i].slice(1);
      breadcrumbItems.push(
        <li key={path} className="breadcrumb-item">
          <Link to={path}>{name}</Link>
        </li>
      );
    }

    return breadcrumbItems;
  };
  return (
    <>
      <Header />

      {/* <!-- BEGIN: Main Menu--> */}
      <Menu />
      {/* <!-- END: Main Menu--> */}

      {/* <!-- BEGIN: Content--> */}

      <div className="app-content content">
        <div className="content-overlay"></div>
        <div className="content-wrapper">
          <div className="content-header row">
            <div className="content-header-left col-md-6 col-12 mb-1">
              {/* <h3 className="content-header-title">Dual Listbox</h3> */}
            </div>
            <div className="content-header-right breadcrumbs-right breadcrumbs-top col-md-6 col-12 mb-2">
              <div className="breadcrumb-wrapper col-12">
                <ol className="breadcrumb">{getBreadcrumb()}</ol>
              </div>
            </div>
          </div>
          <div className="content-body">{children}</div>
        </div>
      </div>
      {/* <!-- END: Content--> */}

      {/* <!-- BEGIN: Footer--> */}
      <Footer />
      {/* <!-- END: Footer--> */}
    </>
  );
};

export default MainContainer;
