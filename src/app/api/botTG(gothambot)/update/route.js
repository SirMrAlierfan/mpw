export async function POST(req) {
  const update = await req.json();
  
  const BOT_TOKEN = process.env.BOT_TOKEN;
  const api = (method, data) =>
    fetch(`https://api.telegram.org/bot${BOT_TOKEN}/${method}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

  // اگر کاربر /start زد
  if (update.message?.text === "/start") {
    await api("sendMessage", {
      chat_id: update.message.chat.id,
      text: "به ربات خوش آمدید 🌟\n\nیک گزینه را انتخاب کنید:",
      reply_markup: {
        inline_keyboard: [
          [{ text: "ارسال پیام خصوصی", callback_data: "send_private" }],
          [{ text: "ارسال پیام به گروه", callback_data: "send_group" }],
          [{ text: "راهنما", callback_data: "help" }],
        ],
      },
    });

    return Response.json({ ok: true });
  }

  return Response.json({ ok: true });
}
