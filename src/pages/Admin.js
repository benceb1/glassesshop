import React, { useEffect, useState } from "react";
import { Box, Button, Container } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useAuth } from "context/AuthContext";
import { useNavigate } from "react-router-dom";
import NewElementModal from "components/Modals/NewElementModal";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import Typography from "@mui/material/Typography";

const Admin = () => {
  const [open, setOpen] = useState(false);
  return (
    <Container>
      <Box>
        <Button
          onClick={() => setOpen(true)}
          variant="outlined"
          startIcon={<AddIcon />}
        >
          Új létrehozása
        </Button>
        {open && (
          <NewElementModal open={open} handleClose={() => setOpen(false)} />
        )}
      </Box>
    </Container>
  );
};

export default Admin;
