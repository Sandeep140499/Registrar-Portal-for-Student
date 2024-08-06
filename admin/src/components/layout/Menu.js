import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Menu = () => {
  const location = useLocation();
  const [isRegionOpen, setIsRegionOpen] = useState(true); // Set initial state to true

  const isBaseRouteActive = (baseRoute, route) => {
    return (
      location.pathname.startsWith(baseRoute) && route.startsWith(baseRoute)
    );
  };

  const menuList = [
    { title: "Dashboard", path: "/dashboard", icon: "icon-home" },
    { title: "Designation", path: "/designation", icon: "icon-user" },
    { title: "Department", path: "/department", icon: "icon-users" },
    { title: "University", path: "/university", icon: "icon-book" },
    { title: "College", path: "/college", icon: "icon-book-open" },
    { title: "Employee", path: "/employee", icon: "icon-users" },
    {
      title: "Region",
      icon: "icon-globe",
      path: "/region",
      submenu: [
        { title: "Country", path: "/region/country", icon: "icon-globe" },
        // { title: "State", path: "/region/state", icon: "icon-map" },
        // { title: "City", path: "/region/city", icon: "icon-map-pin" },
      ],
    },
  ];

  const handleRegionClick = () => {
    setIsRegionOpen(!isRegionOpen);
  };

  return (
    <>
      <div
        className="main-menu menu-fixed menu-light menu-accordion"
        data-scroll-to-active="true"
      >
        <div className="main-menu-content">
          <ul
            className="navigation navigation-main"
            id="main-menu-navigation"
            data-menu="menu-navigation"
          >
            <li className=" navigation-header">
              <span>E-Attendance</span>
              <i
                className=" feather icon-minus"
                data-toggle="tooltip"
                data-placement="right"
                data-original-title="General"
              ></i>
            </li>
            {menuList?.map((item, index) => {
              return (
                <li className={` nav-item `} key={index}>
                  {item.submenu ? (
                    <>
                      <a
                        className={`nav-link ${isRegionOpen ? "active" : ""}`}
                        onClick={handleRegionClick}
                      >
                        <i className={` feather ${item.icon}`}></i>
                        <span className="menu-title">{item.title}</span>
                      </a>
                      <ul
                        className={`menu-content`}
                        style={{ display: isRegionOpen ? "block" : "none" }}
                      >
                        {item.submenu.map((subItem, subIndex) => (
                          <li key={subIndex}>
                            <Link
                              to={subItem.path}
                              className={`nav-link ${
                                isBaseRouteActive(
                                  subItem.path,
                                  location.pathname
                                )
                                  ? "active"
                                  : ""
                              }`}
                            >
                              <i className={` feather ${subItem?.icon}`}></i>
                              <span className="menu-title">
                                {subItem.title}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <Link
                      to={item?.path}
                      className={`nav-link ${
                        isBaseRouteActive(item.path, location.pathname)
                          ? "active"
                          : ""
                      }`}
                    >
                      <i className={` feather ${item?.icon}`}></i>
                      <span className="menu-title">{item.title}</span>
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Menu;
