import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import config from "../config";
import { apiEndpoints } from "./api/apiEndpoints";
import axios from "axios";
import Swal from "sweetalert2";

export const MyDropzone = ({
  setValue,
  name,
  register,
  getValues,
  imageUrl,
}) => {
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);

  const { getRootProps, getInputProps } = useDropzone({
    // accept: {
    //   "image/*": [],
    // },
    onDrop: (acceptedFiles) => {
      HandleUploadImage(acceptedFiles);
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });
  const HandleUploadImage = async (files) => {
    let data = {};

    try {
      if (files?.length > 0) {
        // const formData = new FormData();
        data.status = "Active";
        const res = await axios.post(
          `${config.fileUrl}/${apiEndpoints.upload}`,
          { files: files[0] },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (res.data.length) {
          setValue(`${name}.file_name`, res.data[0].file_name);
          setValue(`${name}.file_path`, res.data[0].file_path);
          setValue(`${name}.file_Id`, res.data[0]._id);

          Swal.fire({
            text: `File uploaded successfully.`,
            icon: `success`,
          });
        }
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const thumbsContainer = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 16,
  };

  const thumb = {
    display: "inline-flex",
    borderRadius: 2,
    border: "1px solid #eaeaea",
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: "border-box",
  };

  const thumbInner = {
    display: "flex",
    minWidth: 0,
    overflow: "hidden",
  };

  const img = {
    display: "block",
    width: "auto",
    height: "100%",
  };
  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
    </div>
  ));
  return (
    <>
      <div
        {...getRootProps({
          className: "dropzone border text-center hero-image",
        })}
      >
        <input {...getInputProps()} />
        <i className="fa fa-cloud-upload"></i>
        <p>Upload Files</p>
      </div>

      <aside style={thumbsContainer}>{thumbs}</aside>
    </>
  );
};
