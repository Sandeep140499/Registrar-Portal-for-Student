import React, { useEffect } from "react";
import useVidhanSabhaHook from "./destinationHook";
import { GetDataByIdApi } from "../../common/api/api";
import { apiEndpoints } from "../../common/api/apiEndpoints";

const DestinationForm = () => {
  const {
    onSubmit,
    register,
    handleSubmit,
    errors,
    setValue,
    editUser,
    onUserUpdate,
    id,
  } = useVidhanSabhaHook();

  const fetchUserById = async () => {
    const response = await GetDataByIdApi(
      `${apiEndpoints?.deignationById(id)}`,
      {
        // status: "Active",
        // pagination: false,
      }
    );
    if (response) {
      setValue("name", response?.name);
      setValue("status", response?.status || "Active");
    }
  };
  useEffect(() => {
    fetchUserById();
  }, [id]);

  return (
    <div className="container">
      <div className="card">
        <div className="card col-md-9 p-2 m-2">
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
            >
              <div className="row mb-2">
                <label htmlFor="Fname" className="col-sm-12 form-label">
                  Designation Name
                </label>
                <div className="col-sm-12">
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

              <div className="row mb-2">
                <label htmlFor="type" className="col-sm-12 col-form-label ">
                  Status
                </label>
                <div className="col-sm-12">
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
              <div className="row mb-2">
                <div className="col-sm-12 text-end">
                  <button
                    // id="#closeCanvas"
                    className="btn btn-primary"
                    // data-bs-dismiss="offcanvas"
                    type="submit"
                  >
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

export default DestinationForm;
