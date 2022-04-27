import * as React from "react";
import type { ActionFunction, LoaderFunction, MetaFunction } from "remix";
import {
  Form,
  json,
  Link,
  useActionData,
  redirect,
  useSearchParams,
} from "remix";
import {
  Link as MuiLink,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Button,
  Typography,
  Container,
} from "@mui/material";

import { createUserSession, getUserId } from "~/session.server";
import { verifyLogin } from "~/models/user.server";
import { validateEmail } from "~/utils";

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request);
  if (userId) return redirect("/");
  return json({});
};

interface ActionData {
  errors?: {
    email?: string;
    password?: string;
  };
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const redirectTo = formData.get("redirectTo");
  const remember = formData.get("remember");

  if (!validateEmail(email)) {
    return json<ActionData>(
      { errors: { email: "Email is invalid" } },
      { status: 400 }
    );
  }

  if (typeof password !== "string") {
    return json<ActionData>(
      { errors: { password: "Password is required" } },
      { status: 400 }
    );
  }

  if (password.length < 8) {
    return json<ActionData>(
      { errors: { password: "Password is too short" } },
      { status: 400 }
    );
  }

  const user = await verifyLogin(email, password);

  if (!user) {
    return json<ActionData>(
      { errors: { email: "Invalid email or password" } },
      { status: 400 }
    );
  }

  return createUserSession({
    request,
    userId: user.id,
    remember: remember === "on" ? true : false,
    redirectTo: typeof redirectTo === "string" ? redirectTo : "/notes",
  });
};

export const meta: MetaFunction = () => {
  return {
    title: "Login",
  };
};

export default function LoginPage() {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/";
  const actionData = useActionData() as ActionData;
  const emailRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (actionData?.errors?.email) {
      emailRef.current?.focus();
    } else if (actionData?.errors?.password) {
      passwordRef.current?.focus();
    }
  }, [actionData]);

  return (
    <Container maxWidth="sm">
      <Form method="post" noValidate>
        <input type="hidden" name="redirectTo" value={redirectTo} />
        <Grid container spacing={2} sx={{ marginTop: 8 }}>
          <Grid item xs={12}>
            <Typography component="h1" variant="h5" align="center">
              Sign in
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <TextField
              ref={emailRef}
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              error={!!actionData?.errors?.email}
              helperText={actionData?.errors?.email}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              ref={passwordRef}
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={!!actionData?.errors?.password}
              helperText={actionData?.errors?.password}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox name="remember" color="primary" />}
              label="Remember me"
            />
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" fullWidth variant="contained">
              Sign In
            </Button>
          </Grid>

          <Grid item xs={12} container>
            <Grid item xs>
              <MuiLink variant="body2">Forgot password?</MuiLink>
            </Grid>
            <Grid item>
              <MuiLink component={Link} to="/register" variant="body2">
                Don't have an account? Sign Up
              </MuiLink>
            </Grid>
          </Grid>
        </Grid>
      </Form>
    </Container>
  );
}
