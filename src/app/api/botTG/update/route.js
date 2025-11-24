import { backToMenu, mainMenu } from "../helpers/keyboard";


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
      text: "به ربات  گاتهام خوش اومدین'",
      reply_markup: { inline_keyboard: mainMenu },
    });

    return Response.json({ ok: true });
  }

  
  

  return Response.json({ ok: true });
}
