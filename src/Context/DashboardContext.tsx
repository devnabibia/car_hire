import { createContext, useState } from "react";

interface SideDrawerProps {
  show_sidebar: boolean;
  toggleSideBar: () => void;
}

const initialState = {
  show_sidedrawer: true,
};

export const SideDrawerContext = createContext<SideDrawerProps | null>(null);

export const SideDrawerContextProvider = ({ children }: any) => {
  const [show_sidebar, setShowSideBar] = useState<boolean>(
    initialState.show_sidedrawer
  );
  const toggleSideBar = (): void => {
    setShowSideBar((prev) => !prev);
  };

  return (
    <SideDrawerContext.Provider value={{ show_sidebar, toggleSideBar }}>
      {children}
    </SideDrawerContext.Provider>
  );
};
