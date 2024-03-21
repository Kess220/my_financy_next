import React, { useState, FormEvent } from "react";
import {
  TitleLogin,
  SignInContainer,
  StyledButton,
  ErrorMessage,
  RegisterLink,
  FormContainer,
  TitleContainer,
} from "../components/LoginStyles/LoginStyled";
import StyledInput from "@/components/Input/StyledInput";
import { useTransactions } from "@/contexts/TransactionContext";
import LogoImage from "@/components/Image/Image";
import api from "@/utils/api";
import { useRouter } from "next/router";
import { useUser } from "@/contexts/UserContext";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const { updateTransactions } = useTransactions();
  const { updateUsername,updateToken } = useUser(); 
  const router = useRouter();



  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      const response = await api.post('/sign-in', {
        email,
        password,
      });
      
      console.log('Login successful:', response.data);
      updateToken(response.data.token);
      updateUsername( response.data.user.name)
      localStorage.setItem('token', response.data.token)
      updateTransactions()

      
       router.push('/home');
    } catch (error) {
      setError('Erro ao fazer login. Verifique suas credenciais.');
    }
  };

  return (
    <SignInContainer>
      <LogoImage />
      <TitleContainer>
        <TitleLogin>My Financy</TitleLogin>
      </TitleContainer>
      <FormContainer onSubmit={handleLogin}>
        <StyledInput
          className="login"
          placeholder="E-mail"
          type="email"
          value={email}
          
          
          onChange={(e) => setEmail(e.target.value)}
        />
        <StyledInput
          placeholder="Senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login"
        />
        <StyledButton type="submit">Entrar</StyledButton>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </FormContainer>

      <RegisterLink href="/sign-up">
        <h2>Cadastre-se aqui!</h2>
      </RegisterLink>
    </SignInContainer>
  );
};

export default LoginPage;
