import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useMemo,
  useCallback,
} from "react";
import api from "@/utils/api";

interface BalanceContextType {
  balance: number | null;
  setBalance: React.Dispatch<React.SetStateAction<number | null>>;
  updateBalance: () => void;
}

const BalanceContext = createContext<BalanceContextType | undefined>(undefined);

export const BalanceProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("accessToken")
        : null;

    const fetchData = async () => {
      try {
        const response = await api.get("/wallet", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBalance(response.data.balance);
      } catch (error) {
        console.error("Erro ao buscar dados da carteira:", error);
      }
    };

    if (token) {
      fetchData();
    }
  }, []);

  const updateBalance = useCallback(async () => {
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("token")
        : null;

    if (token) {
      try {
        const response = await api.get("/wallet", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBalance(response.data.balance);
      } catch (error) {
        console.error("Erro ao atualizar saldo:", error);
      }
    }
  }, []);

  const contextValue = useMemo(
    () => ({ balance, setBalance, updateBalance }),
    [balance, setBalance, updateBalance]
  );

  return (
    <BalanceContext.Provider value={contextValue}>
      {children}
    </BalanceContext.Provider>
  );
};

export const useBalance = (): BalanceContextType => {
  const context = useContext(BalanceContext);
  if (!context) {
    throw new Error("useBalance must be used within a BalanceProvider");
  }
  return context;
};
