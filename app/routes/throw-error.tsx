import { json, LoaderFunction } from "remix";

import Typography from "@mui/material/Typography";

export const loader: LoaderFunction = async ({ request }) => {
  throw json({ message: "Unauthorized" }, 401);
};

const ThrowError = () => {
  return (
    <Typography component="h1" variant="h3">
      Private Route
    </Typography>
  );
};

export default ThrowError;
