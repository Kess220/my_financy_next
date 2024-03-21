import React, { useState, FormEvent } from "react";
import { useRouter } from "next/router";
import {
  SignInContainer,
  StyledButton,
  ErrorMessage,
  FormContainer,
  TitleContainer,
  RegisterLink,
  TitleLogin,
} from "../components/LoginStyles/LoginStyled";
import StyledInput from "@/components/Input/StyledInput";
import api from "@/utils/api";
import LogoImage from "@/components/Image/Image";

const RegisterPage: React.FC = () => {
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await api.post("/sign-up", {
        name,
        email,
        password,
      });
      if (response.status === 200) {
        router.push("/login");
      } else {
        setError("Erro ao registrar. Por favor, tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao registrar:", error);
      setError("Erro ao registrar. Por favor, tente novamente mais tarde.");
    }
  };

  return (
    <SignInContainer>
      <LogoImage />
      <TitleContainer>
        <TitleLogin>My Financy</TitleLogin>
      </TitleContainer>
      <FormContainer onSubmit={handleRegister}>
        <StyledInput
          placeholder="Nome"
          className="login"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <StyledInput
          placeholder="E-mail"
          className="login"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <StyledInput
          placeholder="Senha"
          className="login"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <StyledButton type="submit">Registrar</StyledButton>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </FormContainer>

      <RegisterLink
        href="/
      "
      >
        <h2>Já tem uma conta? Entre aqui!</h2>
      </RegisterLink>
    </SignInContainer>
  );
};

export default RegisterPage;
