export async function POST(req) {
  try {
    const body = await req.json();
    const { type, text, username, targetId } = body;

    // Validation
    if (!text || !targetId) {
      return Response.json({ ok: false, error: "Invalid data" }, { status: 400 });
    }

    const BOT_TOKEN = process.env.BOT_TOKEN;
    const CHAT_ID = process.env.TARGET_GROUP;

    if (!BOT_TOKEN || !CHAT_ID) {
      return Response.json(
        { ok: false, error: "Missing BOT_TOKEN or TARGET_GROUP in env" },
        { status: 500 }
      );
    }

    // Message template
    const finalMessage = `
📩 پیام جدید برای ${targetId}

👤 ارسال‌کننده: ${type === "unknown" ? "ناشناس" : username || "—"}
📝 متن:
${text}
    `.trim();

    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

    const tgRes = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: finalMessage,
      }),
    });

    const tgData = await tgRes.json();

    // اگر تلگرام ارور داد
    if (!tgData.ok) {
      return Response.json(
        { ok: false, error: tgData.description || "Telegram error" },
        { status: 500 }
      );
    }

    // موفقیت
    return Response.json({ ok: true });

  } catch (err) {
    console.error("API Error:", err);

    return Response.json(
      { ok: false, error: "Server error or Telegram unreachable" },
      { status: 500 }
    );
  }
}
