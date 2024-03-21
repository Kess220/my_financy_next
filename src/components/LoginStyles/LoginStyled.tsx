import styled from "styled-components";

export const SignInContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 200px;
`;
export const TitleContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
`;

export const TitleLogin = styled.h1`
  color: white;
`;

export const StyledButton = styled.button`
  background-color: #30437c;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 300px;
  margin-top: 10px;

  &:hover {
    background-color: #0056b3;
  }
`;

export const ErrorMessage = styled.p`
  color: red;
  margin-top: 10px;
  font-size: 12px;
`;

export const RegisterLink = styled.a`
  margin-top: 20px;
  text-decoration: none;
  color: #00d87a;
  cursor: pointer;
  font-size: 10px;
`;
