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

const useCollegeHook = () => {
  const [collegeList, setCollegeList] = useState([]);
  const [editUser, setEditUser] = useState({});
  const [show, setShow] = useState(false);
  const [isOpenCanvas, setIsOpenCanvas] = useState(false);
  const pageTitle = "College";
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
    getValues,
    watch,
  } = useForm();
  const onSubmit = async (data) => {
    const token = localStorage.getItem("token");

    data.created_by = user.id;
    data.updated_by = user.id;

    const encrypt = encryptData(data, token);
    console.log(encryptData, "encryptData");
    const response = await CreateDataApi(apiEndpoints?.college, data);
    if (response) {
      fetchUserList();
      toast.success("Data added successfully.");
      navigate("/college");
    }
  };
  const onUserUpdate = async (data) => {
    try {
      data.updated_by = user.id;
      data.name = `${data?.name}`;
      const response = await UpdateData(apiEndpoints?.collegeById(id), data);
      if (response) {
        setIsOpenCanvas(false);
        fetchUserList();
        navigate("/college");
        toast.success("Data updated successfully.");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const fetchUserList = async (name, mobile, email, user_role, status) => {
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
    const res = await GetListApi("college", params);
    setCollegeList(res?.colleges);
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
        const response = await DeleteApi(apiEndpoints?.collegeById(id));
        if (response) {
          fetchUserList();
          toast.success("Data deleted successfully");
        }
      }
    });
  };
  return {
    onSubmit,
    collegeList,
    setCollegeList,
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
    getValues,
    watch,
  };
};

export default useCollegeHook;
