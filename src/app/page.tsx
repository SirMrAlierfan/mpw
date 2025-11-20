"use client"
import GiftPopup from "@/com/WelcomePopup";

import { useRef, useState } from "react";

export default function Home() {
  const [answered, setAnswered] = useState<string>("");
  const inpRef = useRef<HTMLInputElement>(null);
  const [showPopup, setShowPopup] = useState(false);
  const handleSend = (): void => {
    const value = inpRef.current?.value || "";
    setAnswered(value);
   
  };
  
  return (
 <></>
  );
}
