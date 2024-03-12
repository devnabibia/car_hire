import { createContext, useState } from "react";
interface UserProfileProviderProps {
  children: React.ReactNode;
}

export const UserProfileContext = createContext({});

export const UserProfileContextProvider = ({
  children,
}: UserProfileProviderProps) => {
  const [isUserProfileOpen, setIsUserProfileOpen] = useState<boolean>(false);

  const toggleUserProfile = () => {
    setIsUserProfileOpen((prev) => !prev);
  };

  return (
    <UserProfileContext.Provider
      value={{ toggleUserProfile, isUserProfileOpen }}
    >
      {children}
    </UserProfileContext.Provider>
  );
};
