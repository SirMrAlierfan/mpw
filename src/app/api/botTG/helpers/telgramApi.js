export function makeApi(BOT_TOKEN) {
  const base = `https://api.telegram.org/bot${BOT_TOKEN}`;

  async function call(method, data = {}) {
    const res = await fetch(`${base}/${method}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    try {
      const json = await res.json();
      return json;
    } catch (e) {
      return { ok: false, error: "invalid-json-response", detail: e.message };
    }
  }

  return { call };
}
