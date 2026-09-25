exports.handler = async () => {
  try {
    const { getPool } = require("./lib/db");
    const p = getPool();
    if (!p) return { statusCode: 200, body: "No DB - using fallback, nothing to clean" };
    await p.query("DELETE FROM generation_history WHERE generation_date < CURRENT_DATE - INTERVAL '30 days'");
    return { statusCode: 200, body: "Cleaned 30 days, recipes preserved" };
  } catch (e) { return { statusCode: 500, body: e.message }; }
};
