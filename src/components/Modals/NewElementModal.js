import React, { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  Modal,
  Stepper,
  Typography,
  Step,
  StepLabel,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/system";
import ImageUpload from "./StepperViews/ImageUpload";
import DataUpload from "./StepperViews/DataUpload";

const ModalHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 2),
  height: "60px",
  justifyContent: "space-between",
}));

const steps = ["Kép feltöltése", "Adatok feltöltése"];

const NewElementModal = ({ open, handleClose }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [preview, setPreview] = useState(); // string
  const [url, setUrl] = useState();

  useEffect(() => {
    return () => {
      console.log("cleanup");
    };
  }, []);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => {
      if (prevActiveStep + 1 < steps.length) {
        return prevActiveStep + 1;
      } else {
        return prevActiveStep;
      }
    });
    if (activeStep === steps.length - 1) {
      handleClose();
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const getActiveView = (index) => {
    switch (index) {
      case 0:
        return (
          <ImageUpload
            preview={preview}
            setPreview={setPreview}
            url={url}
            setUrl={setUrl}
          />
        );
      case 1:
        return <DataUpload preview={preview} />;
      default:
        return null;
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          borderRadius: "1rem",
          boxShadow: 24,
          display: "flex",
          flexDirection: "column",
          width: "350px",
        }}
      >
        <ModalHeader>
          <Typography variant="h6">Új létrehozása</Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </ModalHeader>

        {/* content */}
        <Box
          sx={{
            p: 3,
          }}
        >
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};

              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          <React.Fragment>
            {getActiveView(activeStep)}
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleNext}>
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </Box>
          </React.Fragment>
        </Box>
      </Box>
    </Modal>
  );
};

export default NewElementModal;
