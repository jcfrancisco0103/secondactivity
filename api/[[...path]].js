// Vercel serverless: forward all /api/* requests to the Express app
const app = require("../server");

module.exports = (req, res) => app(req, res);
