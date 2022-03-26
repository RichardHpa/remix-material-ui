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
// import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

export const Navbar = () => {
  return (
    <>
      <AppBar position="fixed">
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Typography variant="h6" noWrap component="div" sx={{ mr: 2 }}>
              LOGO
            </Typography>

            <Box />

            <Box>
              <Tooltip title="Change Settings">
                <IconButton sx={{ p: 0 }} color="inherit">
                  <LightModeIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Offset />
    </>
  );
};
