import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { Fragment } from "react";

import Spinner from "./Spinner";
import Nav from "./Nav";

// Actions
import { postAd } from "../actions/ad";
import { setAlert, clearAlerts } from "../actions/alert";

import styles from "./css/AdForm.module.css";

const AdForm = (props) => {
  // Check if user is logged
  //   if (!props.isAuth) {
  //     return <Navigate to="/login" />;
  //   }

  const handleImageOnChange = (e) => {
    let inp = document.getElementById(e.target.id);
    inp.parentElement.children[0].textContent = e.target.files[0].name;
  };

  return (
    <Fragment>
      <Nav />
      <div
        style={{
          width: "100vw",
          height: "92.8vh",
          backgroundColor: "#F5F6FA",
          padding: "2rem",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "row",
            backgroundColor: "#fff",
            borderRadius: "1rem",
            padding: "1.5rem",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              width: "45%",
              height: "100%",
            }}
          >
            <h2
              style={{
                fontFamily: "GilroyBold",
                fontSize: "2rem",
              }}
            >
              Post Ad
            </h2>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "90%",
              }}
            >
              <label className={styles["form-control-label"]}>
                Product Name
              </label>
              <input
                type="text"
                className={styles["form-control"]}
                name="productName"
                required={true}
                pattern="[a-zA-Z]+"
                placeholder="Enter the name of the product"
                maxLength={15}
                style={{
                  marginBottom: "5px",
                  fontFamily: "GilroyLight",
                  fontSize: ".9rem",
                }}
              />
              <p
                style={{
                  fontFamily: "GilroyLight",
                  fontSize: ".9rem",
                  color: "#9f9f9d",
                  margin: "0",
                }}
              >
                Do not exceed 15 characters when entering the product name.
              </p>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "90%",
              }}
            >
              <label className={styles["form-control-label"]}>Category</label>
              <input
                type="text"
                className={styles["form-control"]}
                name="category"
                pattern="[a-zA-Z]+"
                placeholder="Enter the category of the product"
                style={{
                  marginBottom: "5px",
                  fontFamily: "GilroyLight",
                  fontSize: ".9rem",
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "90%",
              }}
            >
              <label className={styles["form-control-label"]}>Base Price</label>

              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <input
                  type="text"
                  className={styles["form-control"]}
                  name="basePrice"
                  placeholder="Auction will start from this price"
                  style={{
                    marginBottom: "5px",
                    fontFamily: "GilroyLight",
                    fontSize: ".9rem",
                    width: "80%",
                  }}
                />
                <div
                  style={{
                    width: "15%",
                    height: "40px",
                    border: "2px solid #c9c9c6",
                    borderRadius: "8px",
                    textAlign: "center",
                    marginTop: "3px",
                  }}
                >
                  <h4
                    style={{
                      fontFamily: "GilroySemiBold",
                      color: "#696969",
                      margin: "0",
                      marginTop: "3px",
                    }}
                  >
                    Rs
                  </h4>
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "90%",
              }}
            >
              <label className={styles["form-control-label"]}>
                Description
              </label>
              <textarea
                name="description"
                className={styles["form-control-textarea"]}
              ></textarea>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              justifyContent: "space-around",
              width: "55%",
              // backgroundColor: "#000",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                height: "45%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  height: "100%",
                }}
              >
                <label className={styles["form-control-label"]}>
                  Product Image
                </label>
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    margin: ".5rem 0",
                  }}
                >
                  <label
                    htmlFor="file1"
                    className={styles["custom-file-upload"]}
                  >
                    <div>
                      <p>
                        <i className="fa fa-cloud-upload"></i> Upload Image
                      </p>
                      <input
                        type="file"
                        name="img1"
                        id="file1"
                        accept="image/*"
                        onChange={(e) => {
                          handleImageOnChange(e);
                        }}
                      />
                    </div>
                  </label>
                  <label
                    htmlFor="file2"
                    className={styles["custom-file-upload"]}
                  >
                    <div>
                      <p>
                        <i className="fa fa-cloud-upload"></i> Upload Image
                      </p>
                      <input
                        type="file"
                        name="img2"
                        id="file2"
                        accept="image/*"
                        onChange={(e) => {
                          handleImageOnChange(e);
                        }}
                      />
                    </div>
                  </label>
                  <div
                    style={{
                      width: "33%",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <label
                      htmlFor="file3"
                      className={styles["custom-file-upload"]}
                      style={{
                        height: "47%",
                        width: "100%",
                      }}
                    >
                      <div>
                        <p>
                          <i className="fa fa-cloud-upload"></i> Upload Image
                        </p>
                        <input
                          type="file"
                          name="img3"
                          id="file3"
                          accept="image/*"
                          onChange={(e) => {
                            handleImageOnChange(e);
                          }}
                        />
                      </div>
                    </label>
                    <label
                      htmlFor="file4"
                      className={styles["custom-file-upload"]}
                      style={{
                        height: "47%",
                        width: "100%",
                      }}
                    >
                      <div>
                        <p>
                          <i className="fa fa-cloud-upload"></i> Upload Image
                        </p>
                        <input
                          type="file"
                          name="img4"
                          id="file4"
                          accept="image/*"
                          onChange={(e) => {
                            handleImageOnChange(e);
                          }}
                        />
                      </div>
                    </label>
                  </div>
                </div>
                <p
                  style={{
                    fontFamily: "GilroyLight",
                    fontSize: ".9rem",
                    color: "#9f9f9d",
                    margin: "0",
                  }}
                >
                  You need to upload atleast 4 images of the product to post an
                  ad. Pay attention to quality of the images.
                </p>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <div
                style={{
                  width: "45%",
                }}
              >
                <label className={styles["form-control-label"]}>
                  Auction Start Date
                </label>
                <input
                  type="date"
                  className={styles["form-control"]}
                  style={{
                    fontFamily: "GilroyLight",
                    fontSize: ".9rem",
                  }}
                  id="start-date"
                />
              </div>
              <div
                style={{
                  width: "45%",
                }}
              >
                <label className={styles["form-control-label"]}>
                  Auction Start Time
                </label>
                <input
                  type="time"
                  // value="00:00:00"
                  step={1}
                  className={styles["form-control"]}
                  // style={{ width: "95%" }}
                  id="start-time"
                />
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <div
                style={{
                  width: "45%",
                }}
              >
                <label className={styles["form-control-label"]}>
                  Auction End Date
                </label>
                <input
                  type="date"
                  className={styles["form-control"]}
                  style={{
                    fontFamily: "GilroyLight",
                    fontSize: ".9rem",
                  }}
                  id="end-date"
                />
              </div>
              <div
                style={{
                  width: "45%",
                }}
              >
                <label className={styles["form-control-label"]}>
                  Auction End Time
                </label>
                <input
                  type="time"
                  // value="00:00:00"
                  step={1}
                  className={styles["form-control"]}
                  // style={{ width: "95%" }}
                  id="end-time"
                />
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <button
                className={`${styles["form-control-btn"]} ${styles["add-btn"]}`}
              >
                Add Product
              </button>
              <button
                className={`${styles["form-control-btn"]} ${styles["cancel-btn"]}`}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AdForm;
