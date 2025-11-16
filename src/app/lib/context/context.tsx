"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type LangCode = string;

interface LanguageContextType {
  lang: LangCode;
  setLang: (lang: LangCode) => void;
  apiBase: string;
}


const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<LangCode>("fa");

  const apiBase ="https://690861422d902d0651b00a59.mockapi.io/languges"
    

  return (
    <LanguageContext.Provider value={{ lang, setLang, apiBase }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLang = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLang must be used inside a LanguageProvider");
  }
  return context;
};
