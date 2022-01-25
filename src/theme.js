import { createTheme } from "@mui/material/styles";
import { orange, purple, yellow } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: orange,

    mainBackground: {
      main: "#fff",
    },
    navColor: {
      main: "#fff",
    },
    orange: {
      main: "#FF6C2C",
    },
    dark: {
      main: "#202124",
    },
  },
  components: {
    MuiContainer: {
      defaultProps: {
        maxWidth: "lg",
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
  },
});

export default theme;
