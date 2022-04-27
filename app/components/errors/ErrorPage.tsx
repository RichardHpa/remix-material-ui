import { Link } from "remix";
import { Typography, Button, Box } from "@mui/material";

interface HeroSectionProps {
  title: string;
  subtitle: string;
}

export function ErrorPage({ heroProps }: { heroProps: HeroSectionProps }) {
  return (
    <>
      <noscript>
        <div
          style={{
            backgroundColor: "black",
            color: "white",
            padding: 30,
          }}
        >
          <h1 style={{ fontSize: "2em" }}>{heroProps.title}</h1>
          <p style={{ fontSize: "1.5em" }}>{heroProps.subtitle}</p>
          <small>
            Also, this site works much better with JavaScript enabled...
          </small>
        </div>
      </noscript>

      <Box
        sx={{
          padding: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
        m="auto"
      >
        <Typography variant="h4" gutterBottom textAlign="center">
          {heroProps.title}
        </Typography>
        <Typography gutterBottom textAlign="center">
          {heroProps.subtitle}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
          <Button component={Link} to="/" variant="outlined">
            Return Home
          </Button>
        </Box>
      </Box>
    </>
  );
}
