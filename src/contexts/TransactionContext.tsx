import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo, useCallback } from "react";
import api from "@/utils/api";

interface Transaction {
  id: number;
  value: number;
  type: string;
  date: string;
  description: string;
}

interface TransactionContextType {
  transactions: Transaction[];
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
  updateTransactions: () => void;
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export const TransactionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchData = async () => {
      try {
        const response = await api.get("/transaction", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTransactions(response.data);
      } catch (error) {
        console.error("Erro ao buscar transações:", error);
      }
    };

    if (token) {
      fetchData();
    }
  }, []);

  const updateTransactions = useCallback(async () => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const response = await api.get("/transaction", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTransactions(response.data);
      } catch (error) {
        console.error("Erro ao atualizar transações:", error);
      }
    }
  }, []);

  const contextValue = useMemo(() => ({ transactions, setTransactions, updateTransactions }), [
    transactions,
    setTransactions,
    updateTransactions,
  ]);

  return <TransactionContext.Provider value={contextValue}>{children}</TransactionContext.Provider>;
};

export const useTransactions = (): TransactionContextType => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error("useTransactions must be used within a TransactionProvider");
  }
  return context;
};
