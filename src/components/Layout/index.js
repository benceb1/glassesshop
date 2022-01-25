import React from "react";
import { makeStyles } from "@mui/styles";
import Navbar from "../Navbar";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    backgroundColor: theme.palette.mainBackground.main,
  },
  header: {},
  footer: {},
  main: {
    flex: "auto",
    marginTop: "75px",
  },
}));

const Layout = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Navbar />
      <div className={classes.main}>{children}</div>
      <div>Footer</div>
    </div>
  );
};

export default Layout;
