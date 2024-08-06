import React, { useEffect } from "react";
import { GetDataByIdApi } from "../../../common/api/api";
import { apiEndpoints } from "../../../common/api/apiEndpoints";
import useCountryHook from "./stateHook";

const StateForm = () => {
  const {
    onSubmit,
    register,
    handleSubmit,
    errors,
    setValue,
    editUser,
    onUserUpdate,
    id,
  } = useCountryHook();

  const fetchStateById = async () => {
    const response = await GetDataByIdApi(`${apiEndpoints?.stateById(id)}`);
    if (response) {
      setValue("name", response?.state?.name);
      setValue("code", response?.state?.code);
      setValue("status", response?.state?.status ?? "Active");
    }
  };
  useEffect(() => {
    fetchStateById();
  }, [id]);

  return (
    <div className="container">
      <div className="card">
        <div className="p-2 m-2">
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
              className="row mt-2"
            >
              <div className="col-md-6 col-12 mb-1">
                <label htmlFor="name" className=" form-label ">
                  Name
                </label>
                <div className="">
                  <input
                    type="text"
                    className={` ${
                      errors.name ? "border-danger" : ""
                    } form-control`}
                    name="name"
                    placeholder="Name"
                    {...register("name", { required: true })}
                  />
                  {errors.name && (
                    <span className="text-danger">Name is required.</span>
                  )}
                </div>
              </div>
              <div className="col-md-6 col-12 mb-1">
                <label htmlFor="country_code" className=" form-label ">
                  country code
                </label>
                <div className="">
                  <input
                    type="text"
                    className={` ${
                      errors.country_code ? "border-danger" : ""
                    } form-control`}
                    placeholder="country code"
                    {...register("country_code", { required: true })}
                  />
                  {errors.country_code && (
                    <span className="text-danger">
                      country code is required.
                    </span>
                  )}
                </div>
              </div>

              <div className="col-md-6 col-12 mb-1">
                <label htmlFor="type" className=" form-label ">
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
              <div className="col-12 mt-3">
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

export default StateForm;
