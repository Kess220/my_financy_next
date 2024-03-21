import React, { useState } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import api from "@/utils/api";
import { useBalance } from "@/contexts/BalanceContext"
import { useTransactions } from "@/contexts/TransactionContext";
interface AddModalProps {
  isOpen: boolean;
  closeModal: () => void;
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

const ModalHeader = styled.h2`
  color: #fff;
`;

const CloseButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const Select = styled.select`
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const SubmitButton = styled.button`
  background-color: #28a745;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #218838;
  }
`;

const AddModal: React.FC<AddModalProps> = ({ isOpen, closeModal }) => {
  const [value, setValue] = useState("");
  const { updateTransactions } = useTransactions();
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const { updateBalance } = useBalance();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
       await api.post(
        "/transaction",
        {
          value: parseFloat(value),
          description,
          type: type.toLowerCase(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      closeModal();
      updateBalance();
      updateTransactions();
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Adicionar Transação"
    >
      <ModalHeader>Adicionar Transação</ModalHeader>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Valor"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="">Selecione...</option>
          <option value="deposit">Depósito</option>
          <option value="withdrawal">Retirada</option>
        </Select>

        <SubmitButton type="submit">Enviar</SubmitButton>
      </Form>
      <CloseButton onClick={closeModal}>Fechar</CloseButton>
    </Modal>
  );
};

export default AddModal;
