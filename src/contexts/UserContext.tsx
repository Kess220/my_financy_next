import React, { createContext, useContext, useState, useEffect } from "react";

interface UserContextData {
  username: string | null;
  token: string | null;
  updateUsername: (newUsername: string | null) => void;
  updateToken: (newToken: string | null) => void;
}

const UserContext = createContext<UserContextData | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export const UserProvider: React.FC = ({ children }) => {
  const [username, setUsername] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const updateUsername = (newUsername: string | null) => {
    setUsername(newUsername);
    localStorage.setItem("username", newUsername || "");
  };

  const updateToken = (newToken: string | null) => {
    setToken(newToken);
    localStorage.setItem("token", newToken ?? "");
  };

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const value = { username, token, updateUsername, updateToken };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
