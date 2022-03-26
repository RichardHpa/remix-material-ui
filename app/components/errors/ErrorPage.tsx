import { Link } from "remix";
import { Typography, Button } from "@mui/material";

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

      <main>
        <Typography variant="h4" gutterBottom>
          {heroProps.title}
        </Typography>
        <Typography gutterBottom>{heroProps.subtitle}</Typography>
        <Button component={Link} to="/">
          Return Home
        </Button>
      </main>
    </>
  );
}
