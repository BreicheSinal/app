import { useState, FormEvent } from "react";
import { Typography } from "@mui/material";

import { postRequest } from "../../../core/utils/api";

import SignUpLayout from "../../Layout/SignUpLayout";
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

  const [usernameError, setUsernameError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");

  const validation = () => {
    let isValid: boolean = true;

    if (!username.trim()) {
      setUsernameError("Username is required");
      isValid = false;
    } else if (!/^[a-zA-Z]+$/.test(username.trim())) {
      setUsernameError("Username must contain only letters");
      isValid = false;
    } else {
      setUsernameError("");
    }

    if (!email.trim()) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      setEmailError("Invalid email format");
      isValid = false;
    } else {
      setEmailError("");
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
        SIGN UP
      </Typography>

      <form onSubmit={submit}>
        <UsernameField
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          error={!!usernameError}
          helperText={usernameError}
        />

        <EmailField
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!emailError}
          helperText={emailError}
        />

        <PasswordField
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <RoleField value={role} onChange={(e) => setRole(e.target.value)} />

        <SubmitButton />

        <ButtonLink />
      </form>
    </SignUpLayout>
  );
};

export default SignUp;
