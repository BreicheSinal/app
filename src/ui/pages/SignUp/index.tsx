import { useState, FormEvent } from "react";
import { Typography } from "@mui/material";
import axios from "axios";

import SignUpLayout from "../../Layout/SignUpLayout";
import UsernameField from "../../components/Form/UsernameField";
import EmailField from "../../components/Form/EmailField";
import PasswordField from "../../components/Form/PasswordField";
import RoleField from "../../components/Form/RoleField";
import Logo from "../../components/Form/Logo";
import ButtonLink from "../../components/Form/ButtonLink";
import SubmitButton from "../../components/Form/SubmitButton";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const submit = async (event: FormEvent) => {
    event.preventDefault();

    const roles = role ? [parseInt(role)] : 1;

    try {
      const response = await axios.post(
        "http://localhost:8080/register",
        {
          name: username,
          email,
          password,
          roles,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("User registered:", response.data);
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
        />

        <EmailField value={email} onChange={(e) => setEmail(e.target.value)} />

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
