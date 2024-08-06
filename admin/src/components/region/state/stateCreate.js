import React, { useEffect } from "react";
import { GetDataByIdApi } from "../../../common/api/api";
import { apiEndpoints } from "../../../common/api/apiEndpoints";
import useCountryHook from "./stateHook";
import Select from "react-select";
import UseRegion from "../../../common/hooks/region";

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
  const { countryData, stateData, stateRefetch, cityData, cityRefetch } =
    UseRegion({
      countryId: "",
      stateId: "",
    });
  const fetchStateById = async () => {
    const response = await GetDataByIdApi(`${apiEndpoints?.stateById(id)}`);
    if (response) {
      setValue("name", response?.state?.name);
      setValue("code", response?.state?.code);
      setValue("iso_code", response?.state?.iso_code);
      setValue("status", response?.state?.status ?? "Active");
    }
  };
  useEffect(() => {
    fetchStateById();
  }, [id]);

  const handleChange = (selectedOption) => {
    setValue("country", selectedOption?.value);
  };

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
                <label htmlFor="State Code" className=" form-label ">
                  Code
                </label>
                <div className="">
                  <input
                    type="text"
                    className={` ${
                      errors.code ? "border-danger" : ""
                    } form-control`}
                    placeholder="State code"
                    {...register("code", { required: true })}
                  />
                  {errors.code && (
                    <span className="text-danger">Name is required.</span>
                  )}
                </div>
              </div>
              <div className="col-md-6 col-12">
                <label htmlFor="Country" className=" form-label">
                  Country
                </label>
                <div className="">
                  <Select
                    name="country"
                    onChange={handleChange}
                    isClearable
                    isSearchable
                    options={countryData?.country?.map((item) => ({
                      value: item.iso_code,
                      label: item.name,
                    }))}
                    className={` ${errors.country ? "border-danger" : ""}`}
                  />
                  {errors.country && (
                    <span className="text-danger">
                      {errors.country.message}
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
