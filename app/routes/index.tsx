import { Link } from "remix";
import { Button, Box, Typography } from "@mui/material";
// import { useOptionalUser } from "~/utils";

import { Theme, useTheme } from "~/utils/ThemeProvider";

export default function Index() {
  // const user = useOptionalUser();
  const [theme, setTheme] = useTheme();

  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT
    );
  };
  return (
    <Box>
      <Box>
        <Button onClick={toggleTheme}>
          Current is {theme === Theme.LIGHT ? "Light" : "Dark"} Mode
        </Button>
      </Box>
      <Box>
        <Button component={Link} to="/random-url">
          Go to /single 404 Page
        </Button>
      </Box>
      <Box>
        <Button component={Link} to="/random/random">
          Go to /random/random
        </Button>
      </Box>
      <Box>
        <Typography variant="h2" color="inherit">
          Hey there 👋
        </Typography>
      </Box>
    </Box>
  );
}
