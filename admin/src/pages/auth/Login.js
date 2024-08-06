import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { toast } from "react-toastify";
import config from "../../config";
import { useForm } from "react-hook-form";
import useAuth from "./hook/useAuth";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { login, user } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (user && location.pathname === "/") {
      navigate("/dashboard", { replace: true });
    }
  }, [user, location, navigate]);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${config.apiUrl}/auth/login`, data);
      const responseData = response.data;
      if (response.status === 200) {
        login(responseData.user, responseData.token);
        navigate("/dashboard", { replace: true });
        window.location.reload();
      } else {
        toast.error(response.data.error);
      }
    } catch (error) {
      toast.error("Enter correct email or password.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <>
      <div className="app-content content">
        <div className="content-overlay"></div>
        <div className="content-wrapper">
          <div className="content-header row"></div>
          <div className="content-body">
            <section className="row flexbox-container">
              <div className="col-12 d-flex align-items-center justify-content-center">
                <div className="col-lg-4 col-md-8 col-10 box-shadow-2 p-0">
                  <div className="card border-grey border-lighten-3 m-0">
                    <div className="card-header border-0">
                      <div className="card-title text-center">
                        <div className="p-1">
                          <img
                            src="/themes/default/assets/images/logo/stack-logo-dark.png"
                            alt="branding logo"
                          />
                        </div>
                      </div>
                      <h6 className="card-subtitle line-on-side text-muted text-center font-small-3 pt-2">
                        <span>Login with Stack</span>
                      </h6>
                    </div>
                    <div className="card-content">
                      <div className="card-body">
                        <form
                          onSubmit={handleSubmit(onSubmit)}
                          className="form-horizontal form-simple"
                        >
                          <fieldset className="form-group position-relative has-icon-left mb-1">
                            <input
                              type="text"
                              className={`form-control ${
                                errors.email ? "is-invalid" : ""
                              }`}
                              id="email"
                              placeholder="Email"
                              name="email"
                              {...register("email", {
                                required: "Please enter your email.",
                                pattern: {
                                  value:
                                    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                  message:
                                    "Please enter a valid email address.",
                                },
                              })}
                            />
                            {errors.email && (
                              <div className="invalid-feedback">
                                {errors.email.message}
                              </div>
                            )}
                            <div className="form-control-position">
                              <i className="feather icon-user"></i>
                            </div>
                          </fieldset>
                          <fieldset className="form-group position-relative has-icon-left">
                            <input
                              type="password"
                              className={`form-control ${
                                errors.password ? "is-invalid" : ""
                              }`}
                              id="password"
                              placeholder="Password"
                              // value={password} // Bind to state variable
                              {...register("password", {
                                required: "Please enter your password.",
                              })}
                            />
                            {errors.password && (
                              <div className="invalid-feedback">
                                {errors.password.message}
                              </div>
                            )}
                            <div className="form-control-position">
                              <i className="fa fa-key"></i>
                            </div>
                          </fieldset>
                          <div className="form-group row">
                            <div className="col-sm-6 col-12 text-center text-sm-left">
                              <fieldset>
                                <input
                                  type="checkbox"
                                  id="remember-me"
                                  className="chk-remember"
                                />
                                <label htmlFor="remember-me">
                                  {" "}
                                  Remember Me
                                </label>
                              </fieldset>
                            </div>
                            <div className="col-sm-6 col-12 text-center text-sm-right">
                              <a
                                href="recover-password.html"
                                className="card-link"
                              >
                                Forgot Password?
                              </a>
                            </div>
                          </div>
                          <button
                            type="submit"
                            className="btn btn-primary btn-lg btn-block"
                            onClick={onSubmit}
                          >
                            <i className="feather icon-unlock"></i> Login
                          </button>
                        </form>
                      </div>
                    </div>
                    <div className="card-footer">
                      <div className="">
                        <p className="float-sm-left text-center m-0">
                          <a href="recover-password.html" className="card-link">
                            Recover password
                          </a>
                        </p>
                        <p className="float-sm-right text-center m-0">
                          New to Stack?{" "}
                          <Link to="/sign-up" className="card-link">
                            Sign Up
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
