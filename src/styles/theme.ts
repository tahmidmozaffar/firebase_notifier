import { createMuiTheme } from '@material-ui/core/styles';
import { paletteColors } from '../styles/palette';

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: paletteColors.primaryMain,
    },
    secondary: {
      main: paletteColors.secondaryMain,
    },
    text: {
      primary: paletteColors.textPrimary,
      secondary: paletteColors.primaryMain,
    },
    type: 'dark',
  },
});
