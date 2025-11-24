export async function POST(req) {
  const update = await req.json();

  const BOT_TOKEN = process.env.BOT_TOKEN;
  const api = (method, data) =>
    fetch(`https://api.telegram.org/bot${BOT_TOKEN}/${method}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });


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


  if (update.callback_query) {
    const data = update.callback_query.data;
    const chatId = update.callback_query.message.chat.id;

    if (data === "send_private") {
      await api("sendMessage", {
        chat_id: chatId,
        text: "یوزرنیم فرد موردنظر را ارسال کنید:",
      });
    }

    if (data === "send_group") {
      await api("sendMessage", {
        chat_id: chatId,
        text: "آیدی عددی گروه را ارسال کنید:\n\nمثال:\n-1001234567890",
      });
    }

    if (data === "help") {
      await api("sendMessage", {
        chat_id: chatId,
        text: "راهنما:\n\nاین ربات برای ارسال پیام به افراد یا گروه‌ها ساخته شده است.",
      });
    }

    return Response.json({ ok: true });
  }




  if (update.message?.text && update.message.chat) {
    await api("sendMessage", {
      chat_id: update.message.chat.id,
      text: "پیام شما دریافت شد ✔ (فعلاً هنوز متصل به سیستم ارسال نیست)",
    });
  }

  return Response.json({ ok: true });
}
