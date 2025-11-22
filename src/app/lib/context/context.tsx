"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type LangCode = string;

interface LanguageContextType {
  lang: LangCode;
  setLang: (lang: LangCode) => void;
  langApiBase: any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);
const MsgType=createContext<msg | undefined>(undefined);
export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<LangCode>("fa");

  const langApiBase = process.env.NEXT_PUBLIC_LANG_API;


  return (
    <LanguageContext.Provider value={{ lang, setLang, langApiBase }}>
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
interface msg {
  normalMsg: string;
  unknownMsg: string;
}
