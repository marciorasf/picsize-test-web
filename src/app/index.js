import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes";
import { DataProvider } from "../contexts";

import { CssBaseline, createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";

import "typeface-roboto";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#98c7e6",
      main: "#5da2d5",
      dark: "#4285c2",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ffc3c9",
      main: "#f78888",
      dark: "#ea585b",
      contrastText: "#fff",
    },
    background: {
      paper: "#f9f9f9",
      default: "#eee",
    },
  },
});

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <DataProvider>
            <CssBaseline />
            <Routes />
          </DataProvider>
        </ThemeProvider>
      </BrowserRouter>
    );
  }
}

export default App;
