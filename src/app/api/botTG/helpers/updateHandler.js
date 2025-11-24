import { backToMenu, mainMenu } from "./keyboard";
import { userState } from "./userState";
import { makeApi } from "./telegramApi";

export async function handleUpdate(update, BOT_TOKEN) {
  const { call } = makeApi(BOT_TOKEN);

  const chatId =
    update.callback_query?.message?.chat?.id ||
    update.message?.chat?.id;

  const from =
    update.message?.from ||
    update.callback_query?.from;

  // ========== /start ==========
  if (update.message?.text === "/start") {
    await call("sendMessage", {
      chat_id: chatId,
      text: "به ربات خوش آمدید 🌟",
      reply_markup: { inline_keyboard: mainMenu },
    });

    return { ok: true };
  }

  // ========== CALLBACK BUTTONS ==========
  if (update.callback_query) {
    const data = update.callback_query.data;

    if (data === "main_menu") {
      userState[chatId] = undefined;
      await call("sendMessage", {
        chat_id: chatId,
        text: "منوی اصلی:",
        reply_markup: { inline_keyboard: mainMenu },
      });
      return { ok: true };
    }

    if (data === "help") {
      await call("sendMessage", {
        chat_id: chatId,
        text: "راهنما:\n1. ارسال خصوصی یا گروه\n2. انتخاب نوع پیام\n3. تعیین مقصد\n4. ارسال متن",
        reply_markup: { inline_keyboard: backToMenu },
      });
      return { ok: true };
    }

    // ===== PRIVATE =====
    if (data === "send_private") {
      userState[chatId] = {
        step: "choose_msg_type",
        mode: "private",
        msgType: "",
        target: "",
      };

      await call("sendMessage", {
        chat_id: chatId,
        text: "ارسال خصوصی\nنوع پیام را انتخاب کنید:",
        reply_markup: {
          inline_keyboard: [
            [
              { text: "🔵 عادی", callback_data: "msg_normal" },
              { text: "🟣 ناشناس", callback_data: "msg_unknown" },
            ],
            ...backToMenu,
          ],
        },
      });

      return { ok: true };
    }

    // ===== GROUP =====
    if (data === "send_group") {
      userState[chatId] = {
        step: "choose_msg_type",
        mode: "group",
        msgType: "",
        target: "",
      };

      await call("sendMessage", {
        chat_id: chatId,
        text: "ارسال در گروه\nنوع پیام را انتخاب کنید:",
        reply_markup: {
          inline_keyboard: [
            [
              { text: "🔵 عادی", callback_data: "msg_normal" },
              { text: "🟣 ناشناس", callback_data: "msg_unknown" },
            ],
            ...backToMenu,
          ],
        },
      });

      return { ok: true };
    }

    // ===== MESSAGE TYPE =====
    if (data === "msg_normal" || data === "msg_unknown") {
      const state = userState[chatId];
      if (!state) return { ok: true };

      state.msgType = data === "msg_normal" ? "normal" : "unknown";
      state.step = "enter_target";

      const prompt =
        state.mode === "private"
          ? "یوزرنیم فرد یا آیدی عددی را بفرست:"
          : "آیدی گروه یا @GroupName را بفرست:";

      await call("sendMessage", {
        chat_id: chatId,
        text: prompt,
        reply_markup: { inline_keyboard: backToMenu },
      });

      return { ok: true };
    }
  }

  // ========== HANDLE TEXT INPUTS BASED ON STATE ==========
  const state = userState[chatId];

  // ===== TARGET INPUT =====
  if (update.message && state?.step === "enter_target") {
    state.target = update.message.text.trim();
    state.step = "enter_text";

    await call("sendMessage", {
      chat_id: chatId,
      text: "متن پیام را ارسال کنید:",
      reply_markup: { inline_keyboard: backToMenu },
    });

    return { ok: true };
  }

  // ===== FINAL MESSAGE TEXT =====
  if (update.message && state?.step === "enter_text") {
    const message = update.message.text || "";
    state.step = "sending";

    // resolve chat_id
    const resolved = await call("getChat", {
      chat_id: state.target,
    });

    if (!resolved.ok) {
      await call("sendMessage", {
        chat_id: chatId,
        text: "❌ مقصد پیدا نشد. یوزرنیم یا آیدی اشتباه است.",
        reply_markup: { inline_keyboard: backToMenu },
      });
      userState[chatId] = undefined;
      return { ok: false };
    }

    const destId = resolved.result.id;

    // build final message
    let finalMessage;

    if (state.msgType === "normal") {
      const senderName =
        from.first_name ||
        from.username ||
        "یک کاربر";

      finalMessage = `✉️ پیام از ${senderName}:\n\n${message}`;
    } else {
      finalMessage = message;
    }

    // send to target
    const sent = await call("sendMessage", {
      chat_id: destId,
      text: finalMessage,
    });

    if (!sent.ok) {
      await call("sendMessage", {
        chat_id: chatId,
        text: "❌ ارسال نشد. ربات شاید عضو گروه نیست.",
      });
      userState[chatId] = undefined;
      return { ok: false };
    }

    // confirm to user
    await call("sendMessage", {
      chat_id: chatId,
      text: "✔ پیام با موفقیت ارسال شد!",
      reply_markup: { inline_keyboard: mainMenu },
    });

    userState[chatId] = undefined;
    return { ok: true };
  }

  return { ok: true };
}
