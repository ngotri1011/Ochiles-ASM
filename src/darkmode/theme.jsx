// theme.jsx
import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#dc004e" }, /* #dc004e */
    secondary: { main: "#1976d2" }, /* #1976d2 */
    background: { default: "#f5f5f5", paper: "#fff" }, /* #f5f5f5 */ /* #ffffff */
    text: { primary: "#000", secondary: "#555" }, /* #000000 */ /* #555555 */
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",  
    primary: { main: "#f48fb1" }, /* #f48fb1 */
    secondary: { main: "#90caf9" }, /* #90caf9 */
    background: { default: "#00020b", paper: "#01051f" }, /* #00020b */ /* #01051f*/
    text: { primary: "#fff", secondary: "#bbb" }, /* #ffffff */ /* #bbbbbb */
  },
});
