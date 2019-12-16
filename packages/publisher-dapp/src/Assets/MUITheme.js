import { createMuiTheme } from "@material-ui/core/styles";

export const MUITheme = createMuiTheme({
  breakpoints: {
    keys: ["xs", "sm", "md", "lg", "xl"],
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  palette: {
    text: {
      primary: "#666",
      secondary: "#fff",
      disabled: "#D6D6D6",
      red: "#D0021B",
      darkGrey: '#212121',
      lightGrey: '#9b9b9b',
      hover: {
        blue: "#005ACB",
        red: "#D0021B",
        black: "#333",
      },
    },
    primary: {
      main: "#4086ff",
      dark: "#005ACB",
    },
    secondary: {
      main: "#E67381",
      dark: "#D0021B",
    },
    purple:{
      main: "#220D3A",
      light: "#412f55"
    },
    background: {
      disabled:{
        gray: '#D6D6D6',
      },
      hover:{
        blue: '#ecf3fe',
        red: "#D0021B",
        black: '#333',
      },
      mainContent: '#fafafa',
      footer: "#211D24",
      white: "#fff",
      black: "#333",
      red: "#D0021B",
      succesBox: "#E7FFF8",
      alertBox: "#FDE5E8",
      warningBox: "#FDF3E5",
      infoBox: "#DEEAFF"
    },
    border:{
       main: '#f5f7f8',
      alertBox: "#E67381",
      warningBox: "#F18D5A"
    },
    success: '#00C48C',
    infoBoxLink: "#067AD7"
  },
  typography: {
    fontFamily: 'Muli',
    h2:{
      color: '#212121',
      fontSize: 36,
      fontWeight: 600,
      lineHeight: '45px'
    },
    h3:{
      color: '#212121',
      fontSize: 32,
      fontWeight: 600,
      letterSpacing: -0.5,
      lineHeight: '32px'
    }, 
    h4:{
      color: '#212121',
      fontSize: 24,
      fontWeight: 600,
      lineHeight: '30px'
    },  
    h5:{
      color: '#212121',
      fontSize: 20,
      lineHeight: '50px'
    }, 
    body1:{
      color: '#9b9b9b',
      fontSize: 24,
      lineHeight: '30px'
    },
    body2:{
      color: '#616161',
      fontSize: 18,
      lineHeight: '28px'
    },
    subtitle1:{
      color: '#212121',
      fontSize: 18,
      fontWeight: 'bold'
    },
  }
});

export default MUITheme;