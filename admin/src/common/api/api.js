import axios from "axios";
import { toast } from "react-toastify";
import config from "../../config";
const userData = sessionStorage.getItem("user");
const token = sessionStorage.getItem("token");

const user = userData ? JSON.parse(userData) : null;
let dt = new Date();

const GetListApi = async (endpoints, params = {}) => {
  const res = await axios
    .get(`${config.apiUrl}/${endpoints}`, {
      params: params,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Error fetching contact requests:", error);
      return error;
    });
  return res?.data;
};
const GetDataByIdApi = async (endpoints, params = {}) => {
  const res = await axios
    .get(`${config.apiUrl}/${endpoints}`, {
      params: params,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Error fetching contact requests:", error);
      return error;
    });
  return res?.data;
};
const CreateDataApi = async (endpoints, data) => {
  const res = await axios
    .post(`${config.apiUrl}/${endpoints}`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Error User:", error?.message);
      return error;
    });
  return res?.data;
};

const UpdateDataApi = async (endpoints, data) => {
  const res = await axios
    .patch(`${config.apiUrl}/${endpoints}`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Error User:", error?.message);
      return error;
    });
  return res?.data;
};
const UpdateData = async (endpoints, data) => {
  const res = await axios
    .put(`${config.apiUrl}/${endpoints}`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Error User:", error?.message);
      return error;
    });
  return res?.data;
};
const UpdateDataApiByPatch = async (endpoints, data) => {
  const res = await axios
    .patch(`${config.apiUrl}/${endpoints}`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Error User:", error?.message);
      return error;
    });
  return res?.data;
};

const DeleteApi = async (endpoints) => {
  const response = await axios
    .delete(`${config.apiUrl}/${endpoints}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Error deleting user:", error);
      toast.error("An error occurred while deleting");
      return error;
    });
  return response;
};

const GetNewCustomSlug = async (data) => {
  try {
    const response = await axios.post(`${config.apiUrl}/stories/custom-slug`, {
      custom_slug: data?.slug,
      id: data?.id,
    });

    return response;
  } catch (error) {
    return error?.message;
  }
};

export {
  GetListApi,
  GetDataByIdApi,
  CreateDataApi,
  UpdateDataApi,
  DeleteApi,
  UpdateDataApiByPatch,
  GetNewCustomSlug,
  UpdateData,
};
