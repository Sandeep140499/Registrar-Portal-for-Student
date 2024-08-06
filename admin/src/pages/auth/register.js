import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import config from "../../config";
import "./profile.css";

const Register = () => {
  const {
    register,
    formState: { errors },
    watch,
    getValues,
    reset,
    handleSubmit,
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${config.apiUrl}/auth/register`, data);
      if (response?.status === 200) {
        toast.success(response?.data?.message);
        reset();
        return <Navigate to="/login" replace={true} />;

        // window.location.reload();
      } else {
        if (response?.data?.message) {
          toast.error(response.data.message);
        } else {
          toast.error("An error occurred while creating the account.");
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  return (
    <div className="overflow-hidden">
      <div className="row g-0 ">
        <div className="col-md-4">
          <img
            className="bg-img-cover bg-center img-fluid"
            src="/themes/default/assets/images/login/3.jpg"
            alt="looginpage"
          />
        </div>
        <div className="col-md-8 p-0">
          <div className="login-card login-dark px-5">
            <div>
              <div className="mb-2">
                {/* <Link className="" to="/dashboard"> */}
                <img
                  className="img-fluid for-light"
                  src="/image/logo/logo.png"
                  alt="looginpage"
                />
                {/* </Link> */}
              </div>
              <div className="login-main">
                <form className="theme-form" onSubmit={handleSubmit(onSubmit)}>
                  <h4>Create your account</h4>
                  <p>Enter your personal details to create account</p>
                  <div>
                    <div className="form-group">
                      <label htmlFor="name" className="form-label">
                        {" "}
                        Name
                      </label>
                      <div className="">
                        <div className="">
                          <input
                            className={`${
                              errors?.name ? "border-danger" : " "
                            } form-control`}
                            type="text"
                            required=""
                            placeholder="Pleaes enter your name"
                            {...register("name", {
                              required: true,
                            })}
                          />
                          {errors.name && (
                            <span className="text-danger">
                              Name is required
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label " htmlFor="mobile">
                        Mobile
                      </label>
                      <div className="">
                        <div className="">
                          <input
                            className={`${
                              errors?.mobile ? "border-danger" : " "
                            } form-control`}
                            type="number"
                            required=""
                            placeholder="Pleaes enter your number"
                            {...register("mobile", {
                              required: true,
                            })}
                            onInput={(e) => {
                              e.currentTarget.value =
                                e.currentTarget.value.slice(0, 10);
                            }}
                            style={{ appearance: "none" }}
                          />
                          {errors.mobile && (
                            <span className="text-danger">
                              Mobile is required
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="email">
                        Email Address
                      </label>
                      <input
                        className={`${
                          errors?.email ? "border-danger" : " "
                        } form-control`}
                        type="email"
                        placeholder="Pleaes enter your email"
                        {...register("email", {
                          required: true,
                        })}
                      />
                      {errors.email && (
                        <span className="text-danger">Email is required</span>
                      )}
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="password">
                        Password
                      </label>
                      <div className="form-input position-relative">
                        <input
                          className={`${
                            errors?.password ? "border-danger" : ""
                          } form-control`}
                          type={showPassword ? "text" : "password"}
                          placeholder="Please enter your password"
                          {...register("password", { required: true })}
                        />
                        {errors.password && (
                          <span className="text-danger">
                            Password is required
                          </span>
                        )}
                        <div
                          className="show-hide"
                          onClick={togglePasswordVisibility}
                        >
                          <span
                            className={`feather icon-eye${
                              showPassword ? "-off" : ""
                            } show-password`}
                          ></span>
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="checkbox p-0">
                        <input id="checkbox1" type="checkbox" />
                        <label className="text-muted mx-1" htmlFor="checkbox1">
                          Agree with
                          <a className="ms-2" href="#">
                            {" "}
                            Privacy Policy
                          </a>
                        </label>
                      </div>
                      <button
                        className="btn btn-primary btn-block w-100 mt-5"
                        type="submit"
                      >
                        Create Account
                      </button>
                    </div>
                  </div>
                  <p className="mt-4 text-center">
                    Already have an account?
                    <span className="mx-1">
                      <Link to="/login">Sign in</Link>
                    </span>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
