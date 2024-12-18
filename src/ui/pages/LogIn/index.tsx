import { useState, FormEvent } from "react";
import { Typography } from "@mui/material";

import { postRequest } from "../../../core/utils/api";

import SignUpLayout from "../../Layout/AuthLayout";
import EmailField from "../../components/Form/EmailField";
import PasswordField from "../../components/Form/PasswordField";
import Logo from "../../components/Form/Logo";
import ButtonLink from "../../components/Form/ButtonLink";
import SubmitButton from "../../components/Form/SubmitButton";

const LogIn = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

  const validation = () => {
    let isValid: boolean = true;

    if (!email.trim()) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      setEmailError("Invalid email format");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!password.trim()) {
      setPasswordError("Password is required");
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      isValid = false;
    } else if (
      !/(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~])/g.test(password)
    ) {
      setPasswordError(
        "Password must contain at least 1 number && 1 special character"
      );
      isValid = false;
    } else {
      setPasswordError("");
    }

    return isValid;
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();

    if (!validation()) return;

    try {
      const response = await postRequest("/register", {
        email,
        password,
      });
      console.log("User Logged In Successfully!:", response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <SignUpLayout>
      <Logo />
      <Typography
        variant="h5"
        sx={{ color: "#ffffff", textAlign: "center", mb: 2 }}
      >
        LOG IN
      </Typography>

      <form onSubmit={submit}>
        <EmailField
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!emailError}
          helperText={emailError}
        />

        <PasswordField
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!passwordError}
          helperText={passwordError}
        />

        <SubmitButton />

        <ButtonLink text="Don't have an account? Sign up" />
      </form>
    </SignUpLayout>
  );
};

export default LogIn;
