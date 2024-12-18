import { useState, FormEvent } from "react";
import { Typography, Button, Box } from "@mui/material";
import axios from "axios";

import AuthLayout from "../../Layout/SignUpLayout";
import UsernameField from "../../components/Form/UsernameField";
import EmailField from "../../components/Form/EmailField";
import PasswordField from "../../components/Form/PasswordField";
import RoleField from "../../components/Form/RoleField";
import Logo from "../../components/Form/Logo";
import ButtonLink from "../../components/Form/ButtonLink";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/register",
        {
          username,
          email,
          password,
          role,
        }
      );
      console.log("User registered:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <AuthLayout>
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

        <Box className="flex justify-center" sx={{ mt: 3 }}>
          <Button
            type="submit"
            variant="contained"
            sx={{ backgroundColor: "#2684FF" }}
          >
            Sign Up
          </Button>
        </Box>
        <ButtonLink />
      </form>
    </AuthLayout>
  );
};

export default SignUp;
