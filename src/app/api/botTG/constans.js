export const BOT_TOKEN = process.env.BOT_TOKEN;

export const forbiddenWords = ["کیر", "کص"];

export const regex = {
  telegramUsername: /^@[a-zA-Z0-9_]{5,32}$/,
  telegramChat: /^(@[a-zA-Z0-9_]{5,32}|-100\d{10,15})$/
};
