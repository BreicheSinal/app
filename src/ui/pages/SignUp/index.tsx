/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-useless-escape */
import { useState, FormEvent, useEffect } from "react";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { requestApi } from "../../../core/utils/request";

import SignUpLayout from "../../Layout/AuthLayout";
import UsernameField from "../../components/Form/UsernameField";
import EmailField from "../../components/Form/EmailField";
import PasswordField from "../../components/Form/PasswordField";
import RoleField from "../../components/Form/RoleField";
import Logo from "../../components/Form/Logo";
import ButtonLink from "../../components/Form/ButtonLink";
import SubmitButton from "../../components/Form/SubmitButton";

const SignUp = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<string>("");

  const [generalError, setGeneralError] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.clear();
  });

  const validation = () => {
    let isValid = true;
    setGeneralError("");

    // checking for missing fields
    if (!username.trim() || !email.trim() || !password.trim() || !role.trim()) {
      setGeneralError("Missing Fields!");
      isValid = false;
    }

    // additional validations for all fields
    if (username.trim() && !/^[a-zA-Z\s]+$/.test(username.trim())) {
      setGeneralError("Username must contain only letters and spaces");
      isValid = false;
    }

    if (email.trim() && !/^\S+@\S+\.\S+$/.test(email)) {
      setGeneralError("Invalid email format");
      isValid = false;
    }

    if (password.trim()) {
      if (password.length < 6) {
        setGeneralError("Password must be at least 6 characters");
        isValid = false;
      } else if (
        !/(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~])/g.test(password)
      ) {
        setGeneralError(
          "Password must contain at least 1 number & 1 special character"
        );
        isValid = false;
      }
    }

    return isValid;
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();

    if (!validation()) return;

    const roles = role ? [parseInt(role)] : 1;

    try {
      const response = await requestApi("/register", "POST", {
        name: username,
        email,
        password,
        roles,
      });

      if (response.token) {
        localStorage.setItem("authToken", response.token);
        navigate("/login");
      }
    } catch (error: any) {
      const { message } = error;

      console.error("Error:", error);

      if (error === "Too many registration attempts. Please try again later")
        setGeneralError(error);
      else if (message === "User already exists") setGeneralError(message);
      else setGeneralError("");
    }
  };

  const navigateToLogIn = async () => {
    navigate("/login");
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
        SIGN UP
      </Typography>

      <form onSubmit={submit}>
        <UsernameField
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          error={!!generalError && !username.trim()}
        />

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

        <RoleField
          value={role}
          onChange={(e) => setRole(e.target.value)}
          error={!!generalError && !role.trim()}
        />

        {generalError && (
          <Typography sx={{ color: "red", mt: 1 }}>{generalError}</Typography>
        )}

        <SubmitButton text="Sign Up" />

        <ButtonLink
          onClick={navigateToLogIn}
          text="Already have an account? Login"
        />
      </form>
    </SignUpLayout>
  );
};

export default SignUp;
