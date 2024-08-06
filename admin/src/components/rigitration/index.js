import React, { useEffect, useRef, useState } from "react";
import "./style.css";
import { Stack } from "react-bootstrap";
import { GetDataByIdApi } from "../../common/api/api";
import { apiEndpoints } from "../../common/api/apiEndpoints";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import Barcode from "../bookings/barcode/barcode";
import config from "../../config";

import ReactToPrint, { useReactToPrint } from "react-to-print";

const ReceiptFile = ({ darshantData, htmlRef = null }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const pdfRef = useRef(null);
  const [parenBooking, setParentBooking] = useState(
    darshantData ? darshantData : {}
  );
  const fetchStoryById = async (_id) => {
    const response = await GetDataByIdApi(`${apiEndpoints.bookingById(_id)}`);
    if (response) {
      setParentBooking(response?.registration);
    }
  };
  useEffect(() => {
    if (id) {
      fetchStoryById(id);
    }
  }, [id]);
  console.log(darshantData, "htmlRef");
  return (
    <div className="container">
      <div className="card p-3">
        <div className={`text-right`}>
          <ReactToPrint
            trigger={() => {
              return (
                <button className="btn btn-primary">Print this out!</button>
              );
            }}
            content={() => pdfRef?.current}
          />
        </div>
        <div className="row justify-content-center">
          <div className="col-sm-9">
            <div className="show-pdf mt-3 text-capitalize" ref={htmlRef}>
              <div className="ticket airline" id="html-pdf" ref={pdfRef}>
                <div className="top">
                  <h1>श्री राम मंदिर दर्शन रशीद</h1>
                  <div className="big">
                    <img src="./img/ram-logo.png" />
                  </div>

                  <div className="top-right-img">
                    <img src="./img/ram.png" />
                  </div>
                </div>

                <div className="add-space">
                  <img src="./img/footer-add.jpg" />
                </div>
                <div className="bottom">
                  <div className="bg-light">
                    <div className="column">
                      <div className="row row-2 profile align-item-c">
                        {/* <img src="./img/profile.jpg" /> */}
                        <img
                          src={`${config?.fileUrl}/${parenBooking?.photo?.file_path}`}
                          alt="profile"
                        />

                        <p>
                          <span>Name:</span>
                          {parenBooking?.name || `-`}
                        </p>

                        <p>
                          <span>DOB: </span>
                          {moment(parenBooking?.dateOfBirth).format(
                            "DD-MM-YYYY"
                          ) || `-`}
                        </p>
                      </div>

                      <div className="row row-3 mt-3">
                        <p>
                          <span>Mobile:</span>+91 {parenBooking?.mobile || `-`}
                        </p>

                        <p>
                          <span>Email ID: </span>
                          {parenBooking?.email || `-`}
                        </p>
                      </div>

                      <div className="row row-3 mt-3">
                        <p>
                          <span>Gender:</span>
                          {parenBooking?.gender || `-`}
                        </p>

                        <p>
                          <span>Booking ID: </span>
                          {parenBooking?.bookingId || `-`}
                        </p>
                      </div>

                      <div className="row row-3 mt-3">
                        <p>
                          <span>Add:</span>
                          {parenBooking?.address1 || `-`}
                        </p>

                        <div className="bar-code">
                          {parenBooking?.bookingId && (
                            <Barcode value={parenBooking?.bookingId} />
                          )}
                        </div>
                      </div>
                    </div>

                    {parenBooking &&
                      parenBooking?.otherPersons?.length > 0 &&
                      parenBooking?.otherPersons?.map((person, key) => {
                        return (
                          <div className="column" key={key}>
                            <div className="row row-2 profile align-item-c">
                              <img
                                src={`${config?.fileUrl}/${person?.photo?.file_path}`}
                                alt="profile"
                              />
                              <p>
                                <span>Name:</span>
                                {person?.name || `-`}
                              </p>

                              <p>
                                <span>DOB: </span>
                                {moment(person?.dateOfBirth).format(
                                  "DD-MM-YYYY"
                                ) || `-`}
                              </p>
                            </div>

                            <div className="row row-3 mt-3">
                              <p>
                                <span>Mobile:</span>+91 {person?.mobile || `-`}
                              </p>

                              <p>
                                <span>Email ID: </span>
                                {person?.email || `-`}
                              </p>
                            </div>

                            <div className="row row-3 mt-3">
                              <p>
                                <span>Gender:</span>
                                {person?.gender || `-`}
                              </p>

                              <p>
                                <span>Booking ID: </span>
                                {person?.bookingId || `-`}
                              </p>
                            </div>

                            <div className="row row-3 mt-3">
                              <p>
                                <span>Add:</span>
                                {person?.address1 || `-`}
                              </p>

                              <div className="bar-code">
                                {person?.bookingId && (
                                  <Barcode value={person?.bookingId} />
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>

                  <div className="add-space1">
                    <img src="./img/footer-add1.jpg" />
                  </div>

                  <div className="footer1">
                    <p>Thanks</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceiptFile;
