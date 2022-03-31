import { Link } from "remix";
import { Button, Box, Typography } from "@mui/material";

export default function Testing() {
  return (
    <Box>
      <Box>
        <Typography variant="h2" color="inherit">
          This is a testing page
        </Typography>
      </Box>
      <Box>
        <Button component={Link} to="/">
          Go back home
        </Button>
      </Box>
    </Box>
  );
}
