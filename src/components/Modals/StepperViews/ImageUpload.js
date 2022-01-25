import React, { useState, useRef, useEffect } from "react";
import { projectStorage, projectFirestore } from "../../../firebase";
import { Button, TextField, Typography } from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import DoneIcon from "@mui/icons-material/Done";
import { LinearProgressWithLabel } from "./LinearProgressWithLabel";

const ImageUpload = ({ preview, setPreview, url, setUrl }) => {
  const [image, setImage] = useState();
  const [progress, setProgress] = useState(0);

  const fileInputRef = useRef();

  const handleUpload = () => {
    if (image) {
      const storageRef = projectStorage.ref(image.name);
      const collectionRef = projectFirestore.collection("images");

      storageRef.put(image).on(
        "state_changed",
        (snap) => {
          let precentage = (snap.bytesTransferred / snap.totalBytes) * 100;
          setProgress(precentage);
        },
        (err) => console.log(err),
        async () => {
          const url = await storageRef.getDownloadURL();
          //await collectionRef.add({ url });
          setUrl(url);
        }
      );
    }
  };

  const handleChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.substr(0, 5) === "image") {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImage(null);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {preview ? (
          <img
            src={preview}
            style={{ objectFit: "cover", margin: "30px auto" }}
            alt=""
            onClick={() => {
              setImage(null);
            }}
          />
        ) : (
          <Button
            startIcon={<FileUploadIcon />}
            variant="outlined"
            onClick={(event) => {
              event.preventDefault();
              fileInputRef.current.click();
            }}
            sx={{ m: 2 }}
          >
            Add Image
          </Button>
        )}

        <input
          type="file"
          style={{ display: "none" }}
          ref={fileInputRef}
          accept="image/*"
          onChange={handleChange}
        />
      </form>
      {image && (
        <>
          <Button
            variant="outlined"
            sx={{ mt: 2, mb: 2 }}
            onClick={handleUpload}
            endIcon={url && <DoneIcon sx={{ color: "green" }} />}
            disabled={url ? true : false}
          >
            Feltöltés
          </Button>
          <LinearProgressWithLabel variant="determinate" value={progress} />
          {url && (
            <TextField fullWidth value={url} sx={{ margin: "0.5rem auto" }} />
          )}
        </>
      )}
    </div>
  );
};

export default ImageUpload;
