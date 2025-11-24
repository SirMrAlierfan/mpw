
export const mainMenu = [
  [{ text: "✉️ ارسال پیام خصوصی", callback_data: "send_private" }],
  [{ text: "👥 ارسال پیام به گروه", callback_data: "send_group" }],
  [{ text: "❓ راهنما", callback_data: "help" }],
];


export const backToMenu = [
  [{ text: "🔙 بازگشت به منو اصلی", callback_data: "main_menu" }],
];


export const afterSendMenu = [
  [{ text: "🏠 بازگشت به منو اصلی", callback_data: "main_menu" }],
  [{ text: "🌐 باز کردن سایت", url: "https://Erphun.ir" }],
];


export const profileButton = (username) => [
  [
    {
      text: "👤 رفتن به پروفایل مخاطب",
      url: `https://t.me/${username.replace("@", "")}`,
    },
  ],
];
