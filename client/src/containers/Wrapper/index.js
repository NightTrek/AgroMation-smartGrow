import React from "react";
import "./style.css";

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#E2D83B',
      contrastText: 'white',
    },
    secondary: {
      main: '#2D2F33',
      dark: '#1F2124',
      contrastText: 'white',
    },
    roomStatus:{
        clone:'#3669AE',
        veg:'#32B561',
        flower:'#843FA0',
        warning:'#DC4346',
        fault:"#121315"
    },
    text:{
      main:"white",
      deactive:"#656565"
    },
  },
});

//<div className={"backgroundPattern"}></div>

const Wrapper = props => <div className="wrapper"><ThemeProvider theme={theme}>{props.children}</ThemeProvider></div>;

export default Wrapper;
