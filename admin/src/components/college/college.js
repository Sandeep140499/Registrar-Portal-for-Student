import React, { useEffect, useState } from "react";
import { Pencil, Trash } from "react-bootstrap-icons";
import { Badge, Offcanvas } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { CheckAccess } from "../../common/roleAccess";
import Pagination from "../pagination";
import useCollegeHook from "./collegeHook";

function College() {
  const {
    onSubmit,
    collegeList,
    pageTitle,
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
  } = useCollegeHook();
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
                    navigate("/college/create");
                  }}
                >
                  Add College
                </button>
              </div>
            )}
          </div>
          <div className="card-body">
            <table className="table table-responsive">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">College Name</th>
                  <th scope="col">University Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Country</th>
                  <th scope="col">State</th>
                  <th scope="col">City</th>
                  <th scope="col">Website</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {!collegeList?.length > 0 && loading ? (
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
                  collegeList?.map((user, key) => {
                    return (
                      <tr key={key}>
                        <td scope="row">{key + 1}</td>
                        <td>{user?.name || `-`}</td>
                        <td>{user?.university || `-`}</td>
                        <td>{user?.email || `-`}</td>
                        <td>{user?.phone || `-`}</td>
                        <td>{user?.country || `-`}</td>
                        <td>{user?.state || `-`}</td>
                        <td>{user?.city || `-`}</td>
                        <td>{user?.website || `-`}</td>
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
                          {!CheckAccess("user", "update") && (
                            <button
                              type="button"
                              onClick={() => {
                                setEditUser(user);
                                navigate(`/college/update/${user?._id}`);
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
                        </td>
                      </tr>
                    );
                  })
                )}
                {/* ); */}
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

export default College;
