import { createContext, useState } from "react";

interface AddPackageModalProps {
  children: React.ReactNode;
}

export const AddPackageContext = createContext({});

export const AddPackageContextProvider = ({
  children,
}: AddPackageModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAddPackageModal = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <AddPackageContext.Provider value={{ toggleAddPackageModal, isOpen }}>
      {children}
    </AddPackageContext.Provider>
  );
};
