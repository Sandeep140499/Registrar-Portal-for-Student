import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import {
  CreateDataApi,
  DeleteApi,
  GetListApi,
  UpdateData,
} from "../../common/api/api";
import { apiEndpoints } from "../../common/api/apiEndpoints";
import { encryptData } from "../../common/encrypt";

const useEmployeeHook = () => {
  const [employeeList, setEmployeeList] = useState([]);
  const [editUser, setEditUser] = useState({});
  const [show, setShow] = useState(false);
  const [isOpenCanvas, setIsOpenCanvas] = useState(false);
  const pageTitle = "Employee";
  const OffcanvasTitle = "Create User ";
  const navigate = useNavigate();
  const userData = localStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : null;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const onSubmit = async (data) => {
    const token = localStorage.getItem("token");

    data.created_by = user.id;
    data.updated_by = user.id;

    const encrypt = encryptData(data, token);
    console.log(encryptData, "encryptData");
    const response = await CreateDataApi(apiEndpoints?.employee, data);
    if (response) {
      fetchUserList();
      toast.success("Employee added successfully.");
      navigate("/employee");
    }
  };

  const onUserUpdate = async (data) => {
    try {
      data.updated_by = user.id;
      data.name = `${data?.name}`;
      const response = await UpdateData(apiEndpoints?.employeeById(id), data);
      if (response) {
        setIsOpenCanvas(false);
        fetchUserList();
        navigate("/employee");
        toast.success("Data updated successfully.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUserList = async (name, status) => {
    let params = {
      // name: name,
      // // name:name,
      // mobile: mobile,
      // email: email,
      // user_role: user_role,
      page: currentPage,
      // status: status,
      pageSize: 20,
    };
    const res = await GetListApi("employee", params);
    setEmployeeList(res?.employees);
    setTotalPages(res?.pages);
  };

  useEffect(() => {
    fetchUserList();
  }, [currentPage]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await DeleteApi(apiEndpoints?.employeeById(id));
        if (response) {
          fetchUserList();
          toast.success("Data deleted successfully");
        }
      }
    });
  };

  return {
    onSubmit,
    employeeList,
    setEmployeeList,
    pageTitle,
    OffcanvasTitle,
    navigate,
    register,
    handleSubmit,
    errors,
    setValue,
    handleDelete,
    isOpenCanvas,
    setIsOpenCanvas,
    editUser,
    setEditUser,
    onUserUpdate,
    fetchUserList,
    currentPage,
    setCurrentPage,
    totalPages,
    show,
    setShow,
    id,
  };
};

export default useEmployeeHook;
