import { useState, FormEvent } from "react";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { postRequest } from "../../../core/utils/api";

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

  const validation = () => {
    let isValid: boolean = true;

    if (!username.trim()) {
      setGeneralError("Username is required");
      isValid = false;
    } else if (!/^[a-zA-Z\s]+$/.test(username.trim())) {
      setGeneralError("Username must contain only letters and spaces");
      isValid = false;
    } else {
      setGeneralError("");
    }

    if (!email.trim()) {
      setGeneralError("Email is required");
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      setGeneralError("Invalid email format");
      isValid = false;
    } else {
      setGeneralError("");
    }

    if (!password.trim()) {
      setGeneralError("Password is required");
      isValid = false;
    } else if (password.length < 6) {
      setGeneralError("Password must be at least 6 characters");
      isValid = false;
    } else if (
      !/(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~])/g.test(password)
    ) {
      setGeneralError(
        "Password must contain at least 1 number && 1 special character"
      );
      isValid = false;
    } else {
      setGeneralError("");
    }

    if (!role.trim()) {
      setGeneralError("Role is required");
      isValid = false;
    } else {
      setGeneralError("");
    }

    return isValid;
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();

    if (!validation()) return;

    const roles = role ? [parseInt(role)] : 1;

    try {
      const response = await postRequest("/register", {
        name: username,
        email,
        password,
        roles,
      });

      console.log("User registered:", response);

      if (response.token) {
        localStorage.setItem("authToken", response.token);
        navigate("/login");
      }
    } catch (error: any) {
      const { message } = error;

      console.error("Error:", error);

      setGeneralError(
        message === "User already exists" ? "User already exists" : ""
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
        SIGN UP
      </Typography>

      <form onSubmit={submit}>
        <UsernameField
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          error={!!generalError}
          helperText={generalError}
        />

        <EmailField
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!generalError}
          helperText={generalError}
        />

        <PasswordField
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!generalError}
          helperText={generalError}
        />

        <RoleField
          value={role}
          onChange={(e) => setRole(e.target.value)}
          error={!!generalError}
          helperText={generalError}
        />

        {generalError && (
          <Typography sx={{ color: "red", mt: 1 }}>{generalError}</Typography>
        )}

        <SubmitButton text="Sign Up" />

        <ButtonLink text="Already have an account? Log in" />
      </form>
    </SignUpLayout>
  );
};

export default SignUp;
