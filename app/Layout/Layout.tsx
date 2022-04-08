import { Box, CssBaseline, Container, Typography } from "@mui/material";

import { Navbar } from "~/components/Navbar";

import type { Breakpoint } from "@mui/system";

export const Layout = ({
  children,
  containerWidth = "md",
  disableNavigation = false,
}: {
  children: React.ReactNode;
  containerWidth?: Breakpoint;
  disableNavigation?: boolean;
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <CssBaseline />

      {!disableNavigation && <Navbar />}

      <Container
        component="main"
        maxWidth={containerWidth}
        sx={{ display: "flex", flex: 1, alignItems: "flex-start" }}
      >
        {children}
      </Container>
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: "auto",
        }}
      >
        <Container maxWidth={containerWidth}>
          <Copyright />
        </Container>
      </Box>
    </Box>
  );
};

function Copyright() {
  return (
    <Typography color="text.secondary">
      All rights reserved © Richard M. Hpa {new Date().getFullYear()}
    </Typography>
  );
}
