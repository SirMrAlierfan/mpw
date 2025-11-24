"use client";
import { useState } from "react";

// کلمات ممنوعه
const forbiddenWords = ["کیر", "کص"];

const MessageBot = () => {
    const [msgType, setMesgType] = useState<string>("normal");
    const [text, setText] = useState("");
    const [username, setUsername] = useState("");
    const [chatUserName, setChatUsername] = useState("");
    const [reciverType, setResiverType] = useState("person");
    const [targetId, setTargetId] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    // بررسی کلمات ممنوعه در متن
    const containsForbiddenWords = (message: string) => {
        return forbiddenWords.some(word =>
            message.toLowerCase().includes(word.toLowerCase())
        );
    };

    // ولیدیشن targetId برای یوزرنیم تلگرام
    const isValidTelegramUsername = (id: string) => {
        return /^@[a-zA-Z0-9_]{5,32}$/.test(id);
    };
    const isValidTelegramChat = (id: string) => {
        return (
            /^@[a-zA-Z0-9_]{5,32}$/.test(id) ||      // گروه عمومی
            /^-100\d{10,15}$/.test(id)              // گروه خصوصی
        );
    };

    const sendMessage = async () => {

        if (!text.trim()) return alert("متن پیام را وارد کنید!");
        if (msgType === "normal" && !username.trim()) return alert("نام نویسنده را وارد کنید!");
        if (!targetId.trim()) return alert("ایدی مخاطب پیام را وارد کنید!");
        if (!isValidTelegramUsername(targetId)) return alert("ایدی مخاطب باید یک یوزرنیم معتبر تلگرام باشد (شروع با @ و شامل حروف انگلیسی، اعداد یا _)");
        if (containsForbiddenWords(text)) return alert("پیام شامل کلمات ممنوعه است!");
        if (reciverType === "person") {
            if (!isValidTelegramUsername(targetId)) {
                return alert("ایدی شخص باید یک یوزرنیم معتبر باشد (مثال: @username)");
            }
        } else if (reciverType === "group") {
            if (!isValidTelegramChat(chatUserName)) {
                return alert("ایدی گروه معتبر نیست (باید @groupname یا -100xxxxxxxxxxx باشد)");
            }
        }


        setLoading(true);

        try {
            const res = await fetch("/api/botTG/sendMessage", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    type: msgType,
                    text,
                    username: msgType === "normal" ? username : null,
                    targetId,
                    resiver: reciverType === "person" ? targetId : chatUserName
                }),
            });

            let data;
            try {
                data = await res.json();
            } catch {
                alert("مشکلی سمت سرور پیش آمد!");
                return;
            }

            if (data.ok) {
                setSuccess(true);
                setText("");
                setUsername("");
                setChatUsername("")
                setResiverType("person")
                setTargetId("");
                setTimeout(() => setSuccess(false), 2500);
            } else {
                alert(data.error || "مشکلی پیش آمد!");
            }
        } catch (err) {
            alert("خطا در ارسال پیام!");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col mt-5 gap-4 w-full max-w-lg mx-auto p-6 bg-white text-black rounded-2xl shadow-md px-5 sm:px-10">

            <h2 className="text-xl font-semibold text-center">یه پیام بنویس</h2>

            {/* Success Alert */}
            {success && (
                <div className="p-3 rounded-xl bg-green-100 text-green-800 text-center animate-fadeIn">
                    پیام با موفقیت ارسال شد ✔
                </div>
            )}

            {/* messageType */}
            <div className="flex justify-center gap-3">
                <button
                    className={`px-4 py-2 rounded-lg text-white transition-all duration-150 hover:scale-105 ${msgType === "normal" ? "bg-[#3232ba]" : "bg-gray-500"
                        }`}
                    onClick={() => setMesgType("normal")}
                >
                    عادی
                </button>

                <button
                    className={`px-4 py-2 rounded-lg text-white transition-all duration-150 hover:scale-105 ${msgType === "unknown" ? "bg-[#3232ba]" : "bg-gray-500"
                        }`}
                    onClick={() => setMesgType("unknown")}
                >
                    ناشناس
                </button>
                <div className="mx-5"></div>
                <button
                    className={`px-4 py-2 rounded-lg text-white transition-all duration-150 hover:scale-105 ${reciverType === "person" ? "bg-[#3232ba]" : "bg-gray-500"
                        }`}
                    onClick={() => setResiverType("person")}
                >
                    شخصی
                </button>
                <button
                    className={`px-4 py-2 rounded-lg text-white transition-all duration-150 hover:scale-105 ${reciverType === "group" ? "bg-[#3232ba]" : "bg-gray-500"
                        }`}
                    onClick={() => setResiverType("group")}
                >
                    گروه
                </button>
            </div>

            {/* Inputs */}
            <div className="flex flex-col gap-3">

                <textarea
                    placeholder={reciverType === "person" ? "ارسال پیام برای شخص" : "ارسال پیام در گروه"}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="w-full min-h-[120px] p-3 rounded-lg border border-gray-300
          focus:border-[#3232ba] focus:ring-2 focus:ring-[#3232ba] outline-none
          resize-none bg-gray-50 text-black"
                ></textarea>

                {msgType === "normal" && (
                    <input
                        type="text"
                        placeholder="نام نویسنده (فارسی)"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full h-12 p-3 rounded-lg border border-gray-300
            focus:border-[#3232ba] focus:ring-2 focus:ring-[#3232ba] outline-none
            bg-gray-50 text-black"
                    />
                )}

                <input
                    type="text"
                    placeholder="ایدی دریافت‌کننده (مثلا @username)"
                    value={targetId}
                    onChange={(e) => setTargetId(e.target.value)}
                    className="w-full h-12 p-3 rounded-lg border border-gray-300
          focus:border-[#3232ba] focus:ring-2 focus:ring-[#3232ba] outline-none
          bg-gray-50 text-black"
                />
                {reciverType === "group" ? (
                    <input
                        type="text"
                        placeholder="یوزر نیم گروه یا ایدی چت"
                        value={chatUserName}
                        onChange={(e) => setChatUsername(e.target.value)}
                        className="w-full h-12 p-3 rounded-lg border border-gray-300
          focus:border-[#3232ba] focus:ring-2 focus:ring-[#3232ba] outline-none
          bg-gray-50 text-black"
                    />
                ) : (
                    null
                )}
                <button
                    onClick={sendMessage}
                    disabled={loading}
                    className={`w-full mt-3 py-3 text-white rounded-xl text-lg font-medium transition-all shadow-sm ${loading
                        ? "bg-gray-500 scale-[0.98]"
                        : "bg-[#3232ba] hover:scale-[1.02] active:scale-95"
                        }`}
                >
                    {loading ? "ارسال شد ✔" : "ارسال"}
                </button>

            </div>
        </div>
    );
};

export default MessageBot;
