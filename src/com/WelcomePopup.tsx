"use client";
import { useState } from "react";

export default function GiftPopup() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* دکمه باز کردن پاپ‌آپ */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 bg-pink-600 text-white px-5 py-3 rounded-full shadow-lg text-lg hover:bg-pink-700 z-40"
      >
        🎁 کادو
      </button>

      {/* اگر باز نبود نمایش نده */}
      {!open ? null : (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* تاریک‌کننده */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          {/* باکس کادو */}
          <div className="relative bg-white rounded-3xl p-6 text-center shadow-2xl w-80 animate-bounce-short">
            

            <h2 className="text-xl font-bold mb-2 text-pink-600">
             آقای مهدی عباس پور کون بلبلی من تولدت 17 سالگیت مبارک
            </h2>

            <p className="text-sm text-gray-700 mb-4">
             با تشکر بتمن
            </p>

            <button
              onClick={() => setOpen(false)}
              className="px-5 py-2 bg-pink-600 text-white rounded-xl shadow-md hover:bg-pink-700"
            >
              بای بای
            </button>
          </div>

          <style jsx>{`
            @keyframes bounce-short {
              0% {
                transform: scale(0) translateY(-50px);
                opacity: 0;
              }
              60% {
                transform: scale(1.1) translateY(10px);
                opacity: 1;
              }
              100% {
                transform: scale(1) translateY(0);
              }
            }
            .animate-bounce-short {
              animation: bounce-short 0.5s ease-out;
            }
          `}</style>
        </div>
      )}
    </>
  );
}
