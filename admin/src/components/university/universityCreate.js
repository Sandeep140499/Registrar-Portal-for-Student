import React, { useEffect, useState } from "react";
import { GetDataByIdApi } from "../../common/api/api";
import { apiEndpoints } from "../../common/api/apiEndpoints";
import useRegionHook from "../../common/hooks/region";
import Select from "react-select";
import useUniversityHook from "./universityHook";

const UniversityForm = () => {
  const {
    onSubmit,
    register,
    handleSubmit,
    errors,
    setValue,
    editUser,
    onUserUpdate,
    id,
    watch,
  } = useUniversityHook();

  const fetchUserById = async () => {
    const response = await GetDataByIdApi(
      `${apiEndpoints?.universityById(id)}`
    );
    if (response) {
      setValue("name", response?.name);
      setValue("university", response?.university);
      setValue("short_name", response?.short_name);
      setValue("email", response?.email);
      setValue("phone", response?.phone);
      setValue("type", response?.type);
      setValue("fax_no", response?.fax_no);
      setValue("city", response?.city);
      setValue("state", response?.state);
      setValue("country", response?.country);
      setValue("landmark", response?.landmark);
      setValue("locality", response?.locality);
      setValue("street", response?.street);
      setValue("pincode", response?.pincode);
      setValue("website", response?.website);
      setValue("status", response?.status || "Active");
    }
  };
  useEffect(() => {
    fetchUserById();
  }, [id]);

  const { countryData, stateData, stateRefetch, cityData, cityRefetch } =
    useRegionHook({
      countryId: watch("country") ?? "",
      stateId: watch("state") ?? "",
    });
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    if (selectedCountry) {
      stateRefetch(selectedCountry._id);
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (watch("state")) {
      cityRefetch(watch("state"));
    }
  }, [watch("state")]);

  const handleChange = (selectedOption) => {
    setValue("country", selectedOption?.value);
    setSelectedCountry(selectedOption);
  };

  const handleStateChange = (selectedOption) => {
    setValue("state", selectedOption?.value);
  };

  const handleCityChange = (selectedOption) => {
    setValue("city", selectedOption?.label);
  };

  const state = stateData ? stateData?.state : [];
  const city = cityData ? cityData?.city : [];
  return (
    <div className="container">
      <div className="card p-2 m-2">
        <div className=" col-12 ">
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
              <div className="row mt-2 text-capitalize">
                <div className="col-md-6 col-12">
                  <label htmlFor="Fname" className=" form-label">
                    Name
                  </label>
                  <div className="">
                    <input
                      type="text"
                      className={` ${
                        errors.name ? "border-danger" : ""
                      } form-control`}
                      placeholder="Name"
                      {...register("name", { required: true })}
                    />
                    {errors.name && (
                      <span className="text-danger">Name is required.</span>
                    )}
                  </div>
                </div>
            
                <div className="col-md-6 col-12">
                  <label htmlFor="Fname" className=" form-label">
                    Short Name
                  </label>
                  <div className="">
                    <input
                      type="text"
                      className={` ${
                        errors.short_name ? "border-danger" : ""
                      } form-control`}
                      placeholder="Short Name"
                      {...register("short_name", { required: true })}
                    />
                    {errors.short_name && (
                      <span className="text-danger">
                        Short name is required.
                      </span>
                    )}
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <label htmlFor="university_name" className=" form-label mt-1">
                    university name
                  </label>
                  <div className="">
                    <input
                      type="text"
                      className={` ${
                        errors.university_name ? "border-danger" : ""
                      } form-control`}
                      placeholder="university Name"
                      {...register("university_name", { required: true })}
                    />
                    {errors.university_name && (
                      <span className="text-danger">
                        university name is required.
                      </span>
                    )}
                  </div>
                </div>

                <div className="col-md-6 col-12 mt-1">
                  <label htmlFor="Fname" className=" form-label">
                    Email
                  </label>
                  <div className="">
                    <input
                      type="email"
                      className={` ${
                        errors.email ? "border-danger" : ""
                      } form-control`}
                      placeholder="email"
                      {...register("email", { required: true })}
                    />
                    {errors.email && (
                      <span className="text-danger">Email is required.</span>
                    )}
                  </div>
                </div>
                <div className="col-md-6 col-12 mt-1">
                  <label htmlFor="Fname" className=" form-label">
                    phone
                  </label>
                  <div className="">
                    <input
                      type="number"
                      className={` ${
                        errors.phone ? "border-danger" : ""
                      } form-control`}
                      placeholder="phone"
                      {...register("phone", { required: true })}
                      onInput={(e) => {
                        e.currentTarget.value = e.currentTarget.value.slice(
                          0,
                          10
                        );
                      }}
                    />
                    {errors.phone && (
                      <span className="text-danger">phone is required.</span>
                    )}
                  </div>
                </div>

                <div className="col-md-6 col-12">
                  <label htmlFor="Country" className=" form-label mt-1">
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
                {/* State dropdown */}
                <div className="col-md-6 col-12">
                  <label htmlFor="state" className=" form-label mt-1">
                    State
                  </label>
                  <div className="">
                  <input
                      type="text"
                      className={` ${
                        errors.state ? "border-danger" : ""
                      } form-control`}
                      placeholder=" state"
                      {...register("state", { required: true })}
                    />
                    {errors.state && (
                      <span className="text-danger">State is required.</span>
                    )}
                    {/* <Select
                      name="state"
                      onChange={handleStateChange}
                      isClearable
                      isSearchable
                      options={state.map((item) => ({
                        value: item.code,
                        label: item.name,
                      }))}
                      className={` ${errors.state ? "border-danger" : ""}`}
                    />
                    {errors.state && (
                      <span className="text-danger">
                        {errors.state.message}
                      </span>
                    )} */}
                  </div>
                </div>
                {/* City dropdown */}
                <div className="col-md-6 col-12">
                  <label htmlFor="city" className=" form-label mt-1">
                    City
                  </label>
                  <div className="">
                  <input
                      type="text"
                      className={` ${
                        errors.city ? "border-danger" : ""
                      } form-control`}
                      placeholder=" city"
                      {...register("city", { required: true })}
                    />
                    {errors.city && (
                      <span className="text-danger">City is required.</span>
                    )}
                    {/* <Select
                      name="city"
                      onChange={handleCityChange}
                      isClearable
                      isSearchable
                      options={city.map((item) => ({
                        value: item._id,
                        label: item.name,
                      }))}
                      className={` ${errors.city ? "border-danger" : ""}`}
                    />
                    {errors.city && (
                      <span className="text-danger">{errors.city.message}</span>
                    )} */}
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <label htmlFor="lankmark" className=" col-form-label ">
                    lankmark
                  </label>
                  <div className="">
                    <input
                      type="text"
                      className={` ${
                        errors.landmark ? "border-danger" : ""
                      } form-control`}
                      placeholder=" Landmark"
                      {...register("landmark", { required: true })}
                    />
                    {errors.landmark && (
                      <span className="text-danger">Lankmark is required.</span>
                    )}
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <label htmlFor="locality" className=" col-form-label ">
                    locality
                  </label>
                  <div className="">
                    <input
                      type="text"
                      className={` ${
                        errors.locality ? "border-danger" : ""
                      } form-control`}
                      placeholder=" locality"
                      {...register("locality", { required: true })}
                    />
                    {errors.locality && (
                      <span className="text-danger">locality is required.</span>
                    )}
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <label htmlFor="" className=" col-form-label ">
                    street
                  </label>
                  <div className="">
                    <input
                      type="text"
                      className={` ${
                        errors.street ? "border-danger" : ""
                      } form-control`}
                      placeholder=" street"
                      {...register("street", { required: true })}
                    />
                    {errors.street && (
                      <span className="text-danger">street is required.</span>
                    )}
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <label htmlFor="" className=" col-form-label ">
                    pincode
                  </label>
                  <div className="">
                    <input
                      type="number"
                      className={` ${
                        errors.pincode ? "border-danger" : ""
                      } form-control`}
                      placeholder=" pincode"
                      {...register("pincode", { required: true })}
                      onInput={(e) => {
                        e.currentTarget.value = e.currentTarget.value.slice(
                          0,
                          6
                        );
                      }}
                    />
                    {errors.pincode && (
                      <span className="text-danger">pincode is required.</span>
                    )}
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <label htmlFor="" className=" col-form-label ">
                    Fax no
                  </label>
                  <div className="">
                    <input
                      type="number"
                      className={` ${
                        errors.fax_no ? "border-danger" : ""
                      } form-control`}
                      placeholder=" fax no"
                      {...register("fax_no", { required: true })}
                      onInput={(e) => {
                        e.currentTarget.value = e.currentTarget.value.slice(
                          0,
                          8
                        );
                      }}
                    />
                    {errors.fax_no && (
                      <span className="text-danger">fax no is required.</span>
                    )}
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <label htmlFor="" className=" col-form-label">
                    Website
                  </label>
                  <div className="">
                    <input
                      type="text"
                      className={`form-control ${
                        errors.website ? "border-danger" : ""
                      }`}
                      placeholder=" "
                      {...register("website", {
                        required: true,
                        pattern: {
                          value: /^(ftp|http|https):\/\/[^ "]+$/,
                          message: "Please enter a valid URL.",
                        },
                      })}
                    />
                    {errors.website && (
                      <span className="text-danger">
                        {errors.website.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <label htmlFor="type" className=" col-form-label ">
                    Type
                  </label>
                  <div className="">
                    <input
                      type="text"
                      className={` ${
                        errors.type ? "border-danger" : ""
                      } form-control`}
                      placeholder=" type"
                      {...register("type", { required: true })}
                    />
                    {errors.type && (
                      <span className="text-danger">type is required.</span>
                    )}
                  </div>
                </div>

                <div className="col-md-6 col-12">
                  <label htmlFor="type" className=" col-form-label ">
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
              </div>
              <div className=" col-12 mt-3 ">
                <div className="justify-content-end d-flex">
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

export default UniversityForm;
