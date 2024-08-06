import React, { useEffect, useState } from "react";
import { Pencil, Trash } from "react-bootstrap-icons";
import { Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { CheckAccess } from "../../common/roleAccess";
import Pagination from "../pagination";
import useEmployeeHook from "./employeeHook";

function Employee() {
  const {
    pageTitle,
    handleDelete,
    setEditUser,
    currentPage,
    setCurrentPage,
    totalPages,
    employeeList,
  } = useEmployeeHook();
  const navigate = useNavigate();
  const [loading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  }, []);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <>
      <div className="container">
        <div className="card ">
          <div className="card-header">
            <h3>
              <strong>{pageTitle}</strong>
            </h3>
            {!CheckAccess("user", "create") && (
              <div className="timeline-footer text-right">
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={() => {
                    navigate("/employee/create");
                  }}
                >
                  Add Employee
                </button>
              </div>
            )}
          </div>
          <div className="card-body">
            <table className="table table-responsive">
              <thead>
                <tr className="text-capitalize">
                  <th scope="col">#</th>
                  <th scope="col">employee id</th>
                  <th scope="col">Name</th>
                  <th scope="col">mobile</th>
                  <th scope="col">email</th>
                  <th scope="col">CTC</th>
                  <th scope="col">work experience</th>
                  <th scope="col">gender</th>
                  <th scope="col">marital status</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {!employeeList?.length > 0 && loading ? (
                  <>
                    <tr>
                      <div id="loader">
                        <div className="d-flex flex-column align-items-center">
                          <div className="spinner-grow text-gold"></div>
                          <span className="text-gold mt-1">Loading...</span>
                        </div>
                      </div>
                    </tr>
                  </>
                ) : (
                  employeeList?.map((user, key) => {
                    return (
                      <tr key={key} className="">
                        <td scope="row">{key + 1}</td>
                        <td>{user?.employee_id || `-`}</td>
                        <td>{user?.name || `-`}</td>
                        <td>{user?.mobile || `-`}</td>
                        <td>{user?.email || `-`}</td>
                        <td style={{ width: 50 }}>{user?.ctc || `-`}</td>
                        <td>{user?.work_experience || `-`}</td>
                        <td>{user?.gender || `-`}</td>
                        <td>
                          <Badge
                            bg={
                              user?.marital_status?.toLowerCase() ===
                              "un-married"
                                ? "success"
                                : "danger"
                            }
                            text="white"
                          >
                            {user.marital_status}
                          </Badge>
                        </td>
                        <td>
                          <Badge
                            bg={
                              user?.status?.toLowerCase() === "active"
                                ? "success"
                                : "danger"
                            }
                            text="white"
                          >
                            {user.status}
                          </Badge>
                        </td>
                        <td>
                          <div className="d-flex gap-2">
                            {!CheckAccess("user", "update") && (
                              <button
                                type="button"
                                onClick={() => {
                                  setEditUser(user);
                                  navigate(`/employee/update/${user?._id}`);
                                }}
                                className="btn btn"
                                data-bs-toggle="offcanvas"
                                data-bs-target="#offcanvasRight"
                                aria-controls="offcanvasRight"
                              >
                                <Pencil
                                  color="royalblue"
                                  size={16}
                                  data-toggle="tooltip"
                                  title="Edit"
                                />
                              </button>
                            )}
                            {!CheckAccess("user", "delete") && (
                              <button
                                type="button"
                                className="btn btn"
                                onClick={() => handleDelete(user._id)}
                              >
                                <Trash
                                  color="royalblue"
                                  size={16}
                                  data-toggle="tooltip"
                                  title="Delete"
                                />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
            {totalPages ? (
              <div className={`container`}>
                <div className={`row`}>
                  <div
                    className={`col-sm-12 d-flex justify-content-center px-0`}
                  >
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                    />
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Employee;
