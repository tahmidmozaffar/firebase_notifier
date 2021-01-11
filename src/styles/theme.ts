import { orange, blue, brown } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: blue[500],
    },
    secondary: {
      main: orange[500],
    },
    background: {
      default: brown[500]
    },
    text: {
      primary: "#000000",
      secondary: "#919191"
    }
  },
});
