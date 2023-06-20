"use client"
import React, { createContext, useContext, useState, ReactNode } from "react";

interface UserInfo {
  username: string;
  password: string;
}

interface UserInfoContextType {
  userInfo: UserInfo;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>;
}

const UserInfoContext = createContext<UserInfoContextType | undefined>(undefined);

export const UserInfoContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userInfo, setUserInfo] = useState<UserInfo>({ username: "", password: "" });

  return (
    <UserInfoContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserInfoContext.Provider>
  );
};

export const useUserInfoContext = (): UserInfoContextType => {
  const context = useContext(UserInfoContext);
  if (!context) {
    throw new Error("useUserInfoContext must be used within a UserInfoContextProvider");
  }
  return context;
};

