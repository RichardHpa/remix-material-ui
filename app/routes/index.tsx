import { Box, Typography } from "@mui/material";

import { useOptionalUser } from "~/utils";

export default function Index() {
  const user = useOptionalUser();

  return (
    <Box>
      <Box>
        <Typography variant="h3" color="inherit">
          Hey there {user ? user.email : "👋"}
        </Typography>
      </Box>
    </Box>
  );
}
