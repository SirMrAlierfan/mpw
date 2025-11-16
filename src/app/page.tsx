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
    <>
      <div className="w-full text-center mt-60 ">
        <h3 className="font-bold tracking-wider text-5xl">بیا بازی کنیم ممد</h3>
        <span>مهدی زن کیه؟</span>

        <input
          type="text"
          placeholder="جواب"
          className="m-3 p-3 border-2 rounded-xl border-amber-950"
          ref={inpRef}
        />

        <button
          onClick={handleSend}
          className="bg-white text-black p-3 m-3 rounded-md cursor-pointer"
        >
          ارسال
        </button>

        {answered==="بتمن"?(
          <div>افرین</div>
        ):(
          <div>ریدی</div>
        )}
        <GiftPopup />
      </div>
      

          
  
      
  



    </>
  );
}
