import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Container,
  Tooltip,
  styled,
} from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { Link } from "remix";
// import { useClientStyle } from "~/utils/ClientStyleContext";
import { Themes } from "~/themes";
// import { Form } from "remix";
import { useSettings } from "~/utils/SettingsProvider";

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

export const Navbar = () => {
  // const { theme, setTheme } = useClientStyle();
  const { theme, setTheme } = useSettings();

  const handleThemeChange = () => {
    if (theme === Themes.LIGHT) {
      setTheme(Themes.DARK);
    } else {
      setTheme(Themes.LIGHT);
    }
  };

  return (
    <>
      <AppBar position="fixed">
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Typography
              variant="h6"
              noWrap
              component={Link}
              to="/"
              sx={{ mr: 2 }}
              color="inherit"
            >
              LOGO
            </Typography>

            <Box />

            <Box>
              <Tooltip
                title={
                  theme === Themes.LIGHT
                    ? "Turn off the light"
                    : "Turn on the light"
                }
              >
                {/* <Form action="actions/set-theme" method="post"> */}
                <IconButton
                  sx={{ p: 0 }}
                  color="inherit"
                  // type="submit"
                  onClick={handleThemeChange}
                >
                  {theme === Themes.LIGHT ? (
                    <DarkModeIcon />
                  ) : (
                    <LightModeIcon />
                  )}
                </IconButton>
                {/* </Form> */}
              </Tooltip>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Offset sx={{ marginBottom: 2 }} />
    </>
  );
};
