import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Container,
  Tooltip,
  styled,
  Button,
} from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { Form, Link } from "remix";
import { Themes } from "~/themes";
import { useSettings } from "~/utils/SettingsProvider";
import { useOptionalUser } from "~/utils";

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

export const Navbar = () => {
  const { theme, setTheme } = useSettings();
  const user = useOptionalUser();

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
              {user ? (
                <Box sx={{ display: "inline-flex" }}>
                  <Form action="/logout" method="post">
                    <Button type="submit" color="inherit">
                      Logout
                    </Button>
                  </Form>
                </Box>
              ) : (
                <>
                  <Button color="inherit" component={Link} to="/login">
                    Login
                  </Button>
                  <Button color="inherit" component={Link} to="/register">
                    Register
                  </Button>
                </>
              )}
              <Tooltip
                title={
                  theme === Themes.LIGHT
                    ? "Turn off the light"
                    : "Turn on the light"
                }
              >
                <IconButton
                  sx={{ p: 0 }}
                  color="inherit"
                  onClick={handleThemeChange}
                >
                  {theme === Themes.LIGHT ? (
                    <DarkModeIcon />
                  ) : (
                    <LightModeIcon />
                  )}
                </IconButton>
              </Tooltip>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Offset sx={{ marginBottom: 2 }} />
    </>
  );
};
