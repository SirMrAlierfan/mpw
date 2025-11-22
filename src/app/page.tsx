"use client"

import Link from "next/link";
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
      {/* Bots */}
      <section className="container mt-[30px] flex justify-baseline flex-wrap  md:px-11 lg:px-45 sm:px-7">
        <h2 className="w-full font-bold text-2xl mr-7">رباتا </h2>
        <div className="w-9/12 m-auto mt-5 flex flex-col">

          {<Link className="w-30 hover:w-full bg-white text-black px-5 py-2 rounded-md duration-500 hover:rounded-xl hover:bg-blue-200 " href={"/MessageBot"}>پیام تلگرام</Link>}
        </div>

      </section>


    </>
  );
}
