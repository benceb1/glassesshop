import React from "react";

import NavbarMenu from "./Navbar";
import Zoom from "@mui/material/Zoom";
import Fab from "@mui/material/Fab";
import { useScrollTrigger } from "@mui/material";
import { makeStyles } from "@mui/styles";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

function ScrollTop(props) {
  const { children } = props;
  const classes = useStyles();
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );

    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.root}>
        {children}
      </div>
    </Zoom>
  );
}

const menuItems = [
  { link: "/", label: "Home" },
  { link: "admin", label: "Admin" },
];

const Navbar = () => {
  return (
    <>
      <div id="back-to-top-anchor">
        <NavbarMenu menuItems={menuItems} />
      </div>
      <ScrollTop>
        <Fab
          style={{ backgroundColor: "#fff" }}
          size="large"
          aria-label="scroll back to top"
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </>
  );
};

export default Navbar;
