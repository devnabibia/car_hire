import { createContext, useState } from "react";

interface AddVihicleModalProps {
  children: React.ReactNode;
}

export const AddVihicleContext = createContext({});

export const AddVihicleContextProvider = ({
  children,
}: AddVihicleModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAddVihicleModal = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <AddVihicleContext.Provider value={{ toggleAddVihicleModal, isOpen }}>
      {children}
    </AddVihicleContext.Provider>
  );
};
