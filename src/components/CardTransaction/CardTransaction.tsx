import React, { useState } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { useTransactions } from "@/contexts/TransactionContext";

interface Transaction {
  id: number;
  value: number;
  type: string;
  date: string;
  description: string;
}



const customStyles: Modal.Styles = {
  overlay: {
    backgroundColor: "rgba(51, 51, 51, 0.5)",
  },
  content: {
    width: "60%",
    height: "auto",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "none",
    borderRadius: "8px",
    padding: "20px",
    backgroundColor: "#333",
    color: "#fff",
  },
};

const CardTransaction = styled.div`
  background-color: #ccc;
  border-radius: 8px;
  padding: 8px;
  margin-bottom: 10px;
  width: 346px;
  height: 100px;
  display: flex;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  @media (max-width: 768px) {
  width: 286px;
  height: auto;
  }
`;

const CardTransactionHeader = styled.div`
  display: flex;
  align-items: center;
  margin-left: 15px;
 
`;

const DataContainer = styled.div`
  display: flex;
  margin-left: 20px;
`;

const ModalContent = styled.div`
  max-height: 80vh;
  > * {
    margin-bottom: 7px;
  }
`;

const InfoCard = styled.div`
  display: flex;
`;

const IconCard = styled.div`
  display: flex;
  margin-top: 30px;
  margin-left: 10px;
`;
const DescriptionCard = styled.div`
  display: flex;
  margin-top: 10px;
  margin-left: 25px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 220px; 
`;


const InboundIcon = () => (
  <FontAwesomeIcon
    icon={faArrowUp}
    style={{ color: "green", fontSize: "24px" }}
  />
);

const OutboundIcon = () => (
  <FontAwesomeIcon
    icon={faArrowDown}
    style={{ color: "red", fontSize: "24px" }}
  />
);

const CustomButton = styled.button`
  background-color: #216f57;
  margin-top:10px;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #195241;
  }
`;

const ModalDescriptionCard = styled.div`
  max-height: 80px; 
  overflow-y: auto; 
  word-wrap: break-word; 
`;
const ModalTitle = styled.h2`
  color: #fff;
  margin-bottom: 10px;
  font-size:20px;
    width: 217px;
`;



const CardTransactionComponent: React.FC = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const { transactions } = useTransactions();
  const openModal = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedTransaction(null);
    setModalIsOpen(false);
  };

  return (
    <div>
      {transactions
        .slice()
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .map((transaction) => (
          <CardTransaction
            key={transaction.id}
            onClick={() => openModal(transaction)}
          >
            <IconCard>
              {transaction.type === "deposit" ? (
                <InboundIcon />
              ) : (
                <OutboundIcon />
              )}
            </IconCard>
            <div>
              <CardTransactionHeader>
                <InfoCard>
                  <strong>Valor:</strong> R$ {transaction.value} <br />
                </InfoCard>
                <InfoCard>
                  <DataContainer>
                    <strong>Data:</strong>{" "}
                  </DataContainer>
                  {new Date(transaction.date).toLocaleDateString()}
                </InfoCard>
              </CardTransactionHeader>
              <DescriptionCard>
                <span>{transaction.description}</span>
              </DescriptionCard>
            </div>
          </CardTransaction>
        ))}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Transaction Details"
        style={customStyles}
      >
        {selectedTransaction && (
          <ModalContent>
            <ModalTitle>Detalhes da Transação</ModalTitle>
            <p>
              <strong>Valor:</strong> R$ {selectedTransaction.value}
            </p>
            <p>
              <strong>Data:</strong>{" "}
              {new Date(selectedTransaction.date).toLocaleDateString()}
            </p>
              <ModalDescriptionCard>
            <p>

              <strong>Descrição:</strong> {selectedTransaction.description}
              </p>

              </ModalDescriptionCard>
            <CustomButton onClick={closeModal}>Fechar</CustomButton>
          </ModalContent>
        )}
      </Modal>
    </div>
  );
};

export default CardTransactionComponent;
