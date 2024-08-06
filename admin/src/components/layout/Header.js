import { useNavigate } from "react-router-dom";
import useAuth from "../../pages/auth/hook/useAuth";

const Header = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const userData = localStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : null;
  const handleLogout = () => {
    console.log("logout");
    logout();
  };

  return (
    <>
      {/* <!-- BEGIN: Header--> */}
      <nav className="header-navbar navbar-expand-md navbar navbar-with-menu fixed-top navbar-light navbar-border">
        <div className="navbar-wrapper">
          <div className="navbar-header">
            <ul className="nav navbar-nav flex-row">
              <li className="nav-item mobile-menu d-md-none mr-auto">
                <a
                  className="nav-link nav-menu-main menu-toggle hidden-xs"
                  href="#"
                >
                  <i className="feather icon-menu font-large-1"></i>
                </a>
              </li>
              <li className="nav-item">
                <a
                  // className="navbar-brand"
                  href="/dashboard"
                >
                  <img
                    className="brand-logo"
                    alt="stack admin logo"
                    src="/image/logo.png"
                    width={60}
                  />
                  {/* <h2 className="brand-text">Stack</h2> */}
                </a>
              </li>
              <li className="nav-item d-md-none">
                <a
                  className="nav-link open-navbar-container"
                  data-toggle="collapse"
                  data-target="#navbar-mobile"
                >
                  <i className="fa fa-ellipsis-v"></i>
                </a>
              </li>
            </ul>
          </div>
          <div className="navbar-container content">
            <div className="collapse navbar-collapse" id="navbar-mobile">
              <ul className="nav navbar-nav mr-auto float-left"></ul>

              <ul className="nav navbar-nav float-right">
                <li className="dropdown dropdown-user nav-item">
                  <a
                    className="dropdown-toggle nav-link dropdown-user-link"
                    href="#"
                    data-toggle="dropdown"
                  >
                    <div className="avatar avatar-online">
                      <img
                        src="/themes/default/assets/images/portrait/small/avatar-s-1.png"
                        alt="avatar"
                      />
                      <i></i>
                    </div>
                    <span className="user-name">{user?.name}</span>
                  </a>
                  <div className="dropdown-menu dropdown-menu-right">
                    <a className="dropdown-item" href="#">
                      <i className="feather icon-user"></i> Edit Profile
                    </a>

                    <div className="dropdown-divider"></div>
                    <a
                      className="dropdown-item"
                      onClick={(e) => {
                        e?.preventDefault();
                        handleLogout();
                      }}
                    >
                      <i className="feather icon-power"></i> Logout
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      {/* <!-- END: Header--> */}
    </>
  );
};
export default Header;
