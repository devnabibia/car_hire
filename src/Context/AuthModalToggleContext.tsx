import { createContext, useState } from "react";

interface AuthModalProps {
  children: React.ReactNode;
}

export const AuthModalContext = createContext({});

export const AuthModalContextProvider = ({ children }: AuthModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAuthModal = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <AuthModalContext.Provider value={{ toggleAuthModal, isOpen }}>
      {children}
    </AuthModalContext.Provider>
  );
};
