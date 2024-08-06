import React, { useEffect, useState } from "react";
import { GetDataByIdApi } from "../../common/api/api";
import { apiEndpoints } from "../../common/api/apiEndpoints";
import useEmployeeHook from "./employeeHook";

const EmployeeForm = () => {
  const [age, setAge] = useState(null);
  const {
    onSubmit,
    register,
    handleSubmit,
    errors,
    setValue,
    editUser,
    onUserUpdate,
    id,
  } = useEmployeeHook();

  const fetchEmployeeById = async () => {
    const response = await GetDataByIdApi(`${apiEndpoints?.employeeById(id)}`);
    if (response) {
      setValue("employee_id", response?.employee_id);
      setValue("name", response?.name);
      setValue("gender", response?.gender);
      setValue("dob", response?.dob);
      setValue("mobile", response?.mobile);
      setValue("email", response?.email);
      setValue("official_email", response?.official_email);
      setValue("marital_status", response?.marital_status);
      setValue("address", response?.address);
      setValue("permanent_address", response?.permanent_address);
      setValue("certification", response?.certification);
      setValue("ctc", response?.ctc);
      setValue("work_experience", response?.work_experience);
      setValue("status", response?.status || "Active");
    }
  };
  useEffect(() => {
    fetchEmployeeById();
  }, [id]);

  const validateDate = (value) => {
    const selectedDate = new Date(value);
    const currentDate = new Date();
    if (selectedDate > currentDate) {
      return false;
    }
    return true;
  };

  const calculateAge = (dob) => {
    const dobDate = new Date(dob);
    const currentDate = new Date();
    let age = currentDate.getFullYear() - dobDate.getFullYear();
    const monthDiff = currentDate.getMonth() - dobDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && currentDate.getDate() < dobDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  const handleDateChange = (e) => {
    const dob = e.target.value;
    setAge(calculateAge(dob));
  };
  return (
    <div className="container">
      <div className="card">
        <div className=" p-2 m-2">
          <div>
            <h3>
              <strong>{id ? `Update` : `Create`}</strong>
            </h3>
          </div>
          <div>
            <form
              onSubmit={
                id ? handleSubmit(onUserUpdate) : handleSubmit(onSubmit)
              }
              className="row g-0 pt-2"
            >
              <div className="col-md-6 col-12 mb-1">
                <label
                  htmlFor="empoyeeId"
                  className="form-label text-capitalize"
                >
                  empoyee Id
                </label>
                <div className="">
                  <input
                    type="text"
                    className={` ${
                      errors.employee_id ? "border-danger" : ""
                    } form-control`}
                    placeholder="Please enter empoyeeId"
                    {...register("employee_id", { required: true })}
                  />
                  {errors.employee_id && (
                    <span className="text-danger text-capitalize">
                      empoyee Id is required.
                    </span>
                  )}
                </div>
              </div>
              <div className="col-md-6 col-12 mb-1">
                <label htmlFor="name" className="form-label text-capitalize">
                  name
                </label>
                <div className="">
                  <input
                    type="text"
                    className={` ${
                      errors.name ? "border-danger" : ""
                    } form-control`}
                    placeholder="Please enter name"
                    {...register("name", { required: true })}
                  />
                  {errors.empoyeeId && (
                    <span className="text-danger text-capitalize">
                      name is required.
                    </span>
                  )}
                </div>
              </div>
              <div className="col-md-6 col-12 mb-1">
                <label htmlFor="gender" className=" form-label text-capitalize">
                  gender
                </label>
                <div className="">
                  <select
                    {...register("gender", { required: true })}
                    className={` ${
                      errors.gender ? "border-danger" : ""
                    } form-control`}
                  >
                    <option value=""></option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.gender && (
                    <span className="text-danger text-capitalize">
                      Gender is required.
                    </span>
                  )}
                </div>
              </div>
              <div className="col-md-6 col-12 mb-1">
                <label htmlFor="dob" className="form-label text-capitalize">
                  Date of birth{age > 0 && ` (age : ${age})`}
                </label>
                <div className="">
                  <input
                    type="date"
                    max={new Date().toISOString().split("T")[0]}
                    className={` ${
                      errors.dob ? "border-danger" : ""
                    } form-control`}
                    {...register("dob", {
                      required: true,
                      validate: { validDate: validateDate },
                    })}
                    onChange={handleDateChange}
                  />
                  {errors.dob && (
                    <span className="text-danger text-capitalize">
                      Date of birth is required.
                    </span>
                  )}
                  {errors.dob?.type === "validDate" && (
                    <span className="text-danger text-capitalize">
                      Future dates are not allowed.
                    </span>
                  )}
                </div>
              </div>
              <div className="col-md-6 col-12 mb-1">
                <label htmlFor="mobile" className="form-label text-capitalize">
                  mobile
                </label>
                <div className="">
                  <input
                    type="text"
                    className={` ${
                      errors.mobile ? "border-danger" : ""
                    } form-control`}
                    placeholder="Please enter mobile"
                    {...register("mobile", { required: true })}
                    onInput={(e) => {
                      e.currentTarget.value = e.currentTarget.value.slice(
                        0,
                        10
                      );
                    }}
                  />
                  {errors.mobile && (
                    <span className="text-danger text-capitalize">
                      mobile is required.
                    </span>
                  )}
                </div>
              </div>
              <div className="col-md-6 col-12 mb-1">
                <label htmlFor="email" className="form-label text-capitalize">
                  email
                </label>
                <div className="">
                  <input
                    type="text"
                    className={` ${
                      errors.email ? "border-danger" : ""
                    } form-control`}
                    placeholder="Please enter email"
                    {...register("email", { required: true })}
                  />
                  {errors.email && (
                    <span className="text-danger text-capitalize">
                      email is required.
                    </span>
                  )}
                </div>
              </div>
              <div className="col-md-6 col-12 mb-1">
                <label
                  htmlFor="official_email"
                  className="form-label text-capitalize"
                >
                  official email
                </label>
                <div className="">
                  <input
                    type="email"
                    className={` form-control`}
                    placeholder="Please enter official email"
                    {...register("official_email")}
                  />
                  {/* {errors.official_email && (
                    <span className="text-danger text-capitalize">
                      official email is required.
                    </span>
                  )} */}
                </div>
              </div>
              <div className="col-md-6 col-12 mb-1">
                <label htmlFor="gender" className=" form-label text-capitalize">
                  marital status
                </label>
                <div className="">
                  <select
                    {...register("marital_status", { required: true })}
                    className={` ${
                      errors.marital_status ? "border-danger" : ""
                    } form-control`}
                  >
                    <option value=""></option>
                    <option value="married">Married</option>
                    <option value="un-married">Un-Married</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.marital_status && (
                    <span className="text-danger text-capitalize">
                      marital status is required.
                    </span>
                  )}
                </div>
              </div>
              <div className="col-md-12 col-12 mb-1">
                <label htmlFor="address" className="form-label text-capitalize">
                  address
                </label>
                <div className="">
                  <input
                    type="text"
                    className={` ${
                      errors.address ? "border-danger" : ""
                    } form-control`}
                    placeholder="Please enter address"
                    {...register("address", { required: true })}
                  />
                  {errors.address && (
                    <span className="text-danger text-capitalize">
                      address is required.
                    </span>
                  )}
                </div>
              </div>
              <div className="col-md-12 col-12 mb-1">
                <label
                  htmlFor="permanent_address"
                  className="form-label text-capitalize"
                >
                  permanent address
                </label>
                <div className="">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Please enter permanent address"
                    {...register("permanent_address")}
                  />
                </div>
              </div>
              <div className="col-md-6 col-12 mb-1">
                <label htmlFor="ctc" className="form-label text-capitalize">
                  ctc ( Cost to company )
                </label>
                <div className="">
                  <input
                    type="text"
                    className={` ${
                      errors.ctc ? "border-danger" : ""
                    } form-control`}
                    placeholder="Please enter ctc"
                    {...register("ctc", { required: true })}
                  />
                  {errors.ctc && (
                    <span className="text-danger text-capitalize">
                      ctc is required.
                    </span>
                  )}
                </div>
              </div>
              <div className="col-md-6 col-12 mb-1">
                <label
                  htmlFor="work_experience"
                  className="form-label text-capitalize"
                >
                  work experience
                </label>
                <div className="">
                  <input
                    type="text"
                    className={` ${
                      errors.work_experience ? "border-danger" : ""
                    } form-control`}
                    placeholder="Please enter work experience"
                    {...register("work_experience", { required: true })}
                  />
                  {errors.work_experience && (
                    <span className="text-danger text-capitalize">
                      work experience is required.
                    </span>
                  )}
                </div>
              </div>
              <div className="col-md-12 col-12 mb-1">
                <label
                  htmlFor="certification"
                  className="form-label text-capitalize"
                >
                  certification
                </label>
                <div className="">
                  <input
                    type="text"
                    className={` ${
                      errors.certification ? "border-danger" : ""
                    } form-control`}
                    placeholder="Please enter certification"
                    {...register("certification", { required: true })}
                  />
                  {errors.certification && (
                    <span className="text-danger text-capitalize">
                      certification is required.
                    </span>
                  )}
                </div>
              </div>

              <div className="col-md-12 col-12">
                <label htmlFor="type" className="form-label ">
                  Status
                </label>
                <div className="">
                  <select
                    name="status"
                    {...register("status")}
                    className="form-control"
                  >
                    <option value={"Active"}>Active</option>
                    <option value={"Inactive"}>InActive</option>
                  </select>
                </div>
              </div>

              <div className="col-12 mb-1 mt-4">
                <div className="d-flex justify-content-end">
                  <button className="btn btn-primary" type="submit">
                    {id ? `Update` : `Submit`}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeForm;
