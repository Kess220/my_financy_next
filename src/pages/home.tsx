import React, { useState} from "react";
import styled from "styled-components";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import CardTransaction from "@/components/CardTransaction/CardTransaction";
import TransactionsChart from "@/components/TransactionsChart/TransactionsChart";



const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 76vh;
  max-height: 100%;
`;

const TransactionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  margin-top: 10px;
      height: 68vh;
      @media (max-width: 768px) {
    width: 100%;
        height: 89%;
    margin-bottom: 25px;
  }
`;

const HomePage: React.FC = () => {
  const [showChart, setShowChart] = useState(false);
  const toggleChart = () => {
    setShowChart((prev: boolean) => !prev);
  };
 


 
  
  

  return (
    <>
      <Header />
      <Container>
      <TransactionsContainer>
  {showChart ? <TransactionsChart /> : <CardTransaction />}
</TransactionsContainer>
      </Container>
      <Footer toggleChart={toggleChart} />
    </>
  );
};




export default HomePage;


