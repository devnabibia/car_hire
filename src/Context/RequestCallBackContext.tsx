import { createContext, useState } from "react";

export const RequestCallBackContext = createContext({});

interface RCModalProps {
  children: React.ReactNode;
}
export const RequestCallBackContextProvider = ({ children }: RCModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleRCModal = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <RequestCallBackContext.Provider value={{ toggleRCModal, isOpen }}>
      {children}
    </RequestCallBackContext.Provider>
  );
};
