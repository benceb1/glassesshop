import { Button, TextField } from "@mui/material";
import React from "react";

const DataUpload = ({ preview }) => {
  return (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <img
        src={preview}
        style={{ objectFit: "cover", margin: "30px auto" }}
        alt=""
      />
      <TextField fullWidth label="Márka" margin="normal" />
      <TextField fullWidth label="Modell" margin="normal" />
      <TextField fullWidth label="Méret" margin="normal" />
      <TextField fullWidth label="Nem" margin="normal" />
      <Button variant="outlined">Mentés</Button>
    </form>
  );
};

export default DataUpload;
