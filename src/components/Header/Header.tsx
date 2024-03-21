import React, { useEffect } from "react";
import styled from "styled-components";
import api from "@/utils/api";
import { useBalance } from "@/contexts/BalanceContext";
import { useUser } from "@/contexts/UserContext";




const HeaderWrapper = styled.header`
  background-color: #333;
  color: #fff;
  padding: 20px 0;
  width: 80%;
  margin-left: 43px;
  border-radius: 12px;
  height: 100px;
`;

const Container = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const UserName = styled.div`
  font-size: 18px;
  margin-left: 20px;
`;

const Balance = styled.div`
  font-size: 16px;
  position: absolute;
  top: 74px;
  left: 153px;
`;

const CreateWalletButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 117px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;







const fetchWalletData = async (token: string | null) => {
  try {
    const response = await api.get("/wallet", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.balance;
  } catch (error) {
    console.error("Erro ao buscar dados da carteira:", error);
    return null;
  }
};



const Header = () => {
const { balance, setBalance } = useBalance();
const {username} = useUser();


 

const handleCreateWallet = async () => {
  try {
    
const token = typeof window !== 'undefined' ? localStorage.getItem('token') : '';
   

    const response = await api.post("/wallet/create", null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setBalance(response.data.balance);
  } catch (error) {
    console.error("Erro ao criar carteira:", error);
  }
};


useEffect(() => {
    const fetchData = async () => {
const token = typeof window !== 'undefined' ? localStorage.getItem('token') : '';
     
      const newBalance = await fetchWalletData(token);
      setBalance(newBalance);
    };
    fetchData();
  }, [setBalance]);







  return (
    <HeaderWrapper>
      <Container>
        <UserName>{username}</UserName>
        {balance !== null ? (
          <Balance>Saldo: R$ {balance}</Balance>
        ) : (
          <CreateWalletButton onClick={handleCreateWallet}>
            Crie sua carteira
          </CreateWalletButton>
        )}
      </Container>
    </HeaderWrapper>
  );
};

export default Header;
