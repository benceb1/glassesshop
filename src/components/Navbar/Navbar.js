import React, { useEffect, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { Link, useNavigate } from "react-router-dom";
import { Divider, ListItem } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";

import { makeStyles } from "@mui/styles";
import List from "@mui/material/List";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import Drawer from "@mui/material/Drawer";
import PropTypes from "prop-types";
import { useAuth } from "context/AuthContext";

const useStyles = makeStyles((theme) => ({
  logo: {
    flexGrow: 1,
    display: "flex",
    textDecoration: "none",
    color: "inherit",
    fontSize: "2rem",
  },

  list: {
    display: "flex",
    fontSize: "1rem",
    margin: 0,
    paddingLeft: "0",
    listStyle: "none",
    paddingTop: "0",
    paddingBottom: "0",
    color: "inherit",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
    },
  },
  listItem: {
    float: "left",
    color: "#555",
    position: "relative",
    display: "block",
    width: "auto",
    margin: "0",
    padding: "0.5rem !important",
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  },
  navLink: {
    color: "inherit !important",
    position: "relative",
    padding: "0.6rem",
    fontWeight: "400",
    fontSize: "1rem !important",
    borderRadius: "3px",
    textDecoration: "none",
    margin: "0px",
    display: "inline-flex",
    whiteSpace: "nowrap",
    "&:hover,&:focus": {
      color: "inherit",
      background: "rgba(200, 200, 200, 0.2) !important",
    },
    [theme.breakpoints.down("md")]: {
      width: "calc(100% - 30px)",
      marginLeft: "15px",
      marginBottom: "8px",
      marginTop: "8px",
      textAlign: "left",
      "& > span:first-child": {
        justifyContent: "flex-start",
      },
    },
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 2),
    height: "60px",
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "space-between",
  },
}));

const CustomAppbar = styled(AppBar)(({ theme, shadow }) => ({
  boxShadow: shadow
    ? "0 4px 18px 0px rgba(0, 0, 0, 0.12), 0 7px 10px -5px rgba(0, 0, 0, 0.15)"
    : "none",
  backdropFilter: "blur(6px)",
  WebkitBackdropFilter: "blur(6px)",
  backgroundColor: alpha(theme.palette.navColor.main, 0.9),
}));

const Navbar = ({ menuItems }) => {
  const classes = useStyles();
  const isDesktopView = useMediaQuery("(min-width:900px)");
  const [open, setOpen] = useState(false);
  const [navShadow, setNavShadow] = useState(false);
  const navigate = useNavigate();

  const { currentUser, logout } = useAuth();

  useEffect(() => {
    window.addEventListener("scroll", handleNavShadow);

    return () => window.removeEventListener("scroll", handleNavShadow);
  }, []);

  function handleNavShadow() {
    setNavShadow(!(window.scrollY === 0));
  }

  let logoutButton = (
    <ListItem key={"logout"} className={classes.listItem}>
      <Button
        variant="outlined"
        className={classes.navLink}
        onClick={async () => {
          setOpen(false);
          try {
            await logout();
          } catch (e) {
            console.log(e);
          }
          navigate("/");
        }}
      >
        logout
      </Button>
    </ListItem>
  );

  let navLinks = (
    <List className={classes.list}>
      {menuItems.map(({ label, link }, i) => (
        <ListItem key={i} className={classes.listItem}>
          <Button
            className={classes.navLink}
            onClick={() => {
              setOpen(false);
              navigate(link);
            }}
          >
            {label}
          </Button>
        </ListItem>
      ))}
      {currentUser && logoutButton}
    </List>
  );

  let drawer = (
    <Drawer
      sx={{
        width: "100vw",
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: "100vw",
          boxSizing: "border-box",
        },
      }}
      anchor="top"
      open={open}
      onClose={() => setOpen(false)}
    >
      <div className={classes.drawerHeader}>
        <IconButton sx={{ mr: 2 }} onClick={() => setOpen(false)}>
          <CloseIcon />
        </IconButton>
      </div>
      <Divider />
      {navLinks}
      <Divider />
    </Drawer>
  );
  return (
    <>
      <CustomAppbar position="fixed" shadow={navShadow ? 1 : 0}>
        <Container>
          <Toolbar style={{ height: "70px" }} disableGutters>
            <Box className={classes.logo}>
              <Button
                className={classes.navLink}
                onClick={() => {
                  setOpen(false);
                  navigate("/");
                }}
              >
                👓
              </Button>
            </Box>
            {isDesktopView ? (
              <>{navLinks}</>
            ) : (
              <IconButton
                aria-label="open drawer"
                onClick={() => setOpen(true)}
                edge="start"
                sx={{
                  mr: 2,
                  fontColor: "black",
                  ...(open && { display: "none" }),
                }}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Toolbar>
        </Container>
      </CustomAppbar>
      {isDesktopView ? null : drawer}
    </>
  );
};

export default Navbar;
