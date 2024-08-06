import React, { useEffect } from "react";
import { GetDataByIdApi } from "../../common/api/api";
import { apiEndpoints } from "../../common/api/apiEndpoints";
import useDepartmentHook from "./departmentHook";

const DepartmentForm = () => {
  const {
    onSubmit,
    register,
    handleSubmit,
    errors,
    setValue,
    editUser,
    onUserUpdate,
    id,
  } = useDepartmentHook();

  const fetchUserById = async () => {
    const response = await GetDataByIdApi(
      `${apiEndpoints?.departmentById(id)}`,
      {
        // status: "Active",
        // pagination: false,
      }
    );
    if (response) {
      console.log(response, "hhhhhhhhhhhhhhhh");
      setValue("name", response?.name);
      setValue("ID", response?.ID);
      setValue("status", response?.status || "Active");
    }
  };
  useEffect(() => {
    fetchUserById();
  }, [id]);

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
              className="row"
            >
              <div className="col-md-12 col-12">
                <label htmlFor="Fname" className="form-label mt-1">
                  Department Name
                </label>
                <div className="">
                  <input
                    type="text"
                    className={` ${
                      errors.ID ? "border-danger" : ""
                    } form-control`}
                    placeholder="Name"
                    {...register("name", { required: true })}
                  />
                  {errors.name && (
                    <span className="text-danger">
                      Department name is required.
                    </span>
                  )}
                </div>
              </div>
              <div className="col-md-12 col-12">
                <label htmlFor="Fname" className="form-label mt-1">
                  Department Id
                </label>
                <div className="">
                  <input
                    type="text"
                    className={` ${
                      errors.ID ? "border-danger" : ""
                    } form-control`}
                    placeholder="Department Id"
                    {...register("ID", { required: true })}
                  />
                  {errors.ID && (
                    <span className="text-danger">
                      Department Id is required.
                    </span>
                  )}
                </div>
              </div>

              <div className="col-md-12 col-12 ">
                <label htmlFor="type" className="col-form-label ">
                  Status
                </label>
                <div className="">
                  <select
                    name="status"
                    {...register("status")}
                    className="form-control"
                    defaultValue={"Active"}
                  >
                    <option value={"Active"}>Active</option>
                    <option value={"Inactive"}>InActive</option>
                  </select>
                </div>
              </div>
              <div className="col-12 w-100">
                <div className="d-flex justify-content-end mt-2 ">
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

export default DepartmentForm;
