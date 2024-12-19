import { useState, FormEvent } from "react";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

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

  const [generalError, setGeneralError] = useState<string>("");

  const navigate = useNavigate();

  const validation = () => {
    let isValid = true;
    setGeneralError("");

    // checking for missing fields
    if (!email.trim() || !password.trim()) {
      setGeneralError("Missing Fields!");
      isValid = false;
    }

    return isValid;
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();

    if (!validation()) return;

    try {
      const response = await postRequest("/login", {
        email,
        password,
      });

      console.log("User Logged In Successfully!:", response);

      if (response.token) {
        localStorage.setItem("authToken", response.token);
        navigate("/");
      }
    } catch (error: any) {
      const { message } = error;

      console.error("Error:", error);

      setGeneralError(
        message === "Invalid email or password"
          ? "Invalid email or password"
          : ""
      );
    }
  };

  return (
    <SignUpLayout>
      <Logo />
      <Typography
        variant="h5"
        sx={{
          color: "#ffffff",
          textAlign: "center",
          mb: 2,
          fontWeight: "bold",
        }}
      >
        LOG IN
      </Typography>

      <form onSubmit={submit}>
        <EmailField
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!generalError && !email.trim()}
        />

        <PasswordField
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!generalError && !password.trim()}
        />

        {generalError && (
          <Typography sx={{ color: "red", mt: 1 }}>{generalError}</Typography>
        )}

        <SubmitButton text="Log In" />

        <ButtonLink text="Don't have an account? Sign up" />
      </form>
    </SignUpLayout>
  );
};

export default LogIn;
