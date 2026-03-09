const express = require("express");
const path = require("path");
const { Blockchain } = require("./blockchain.js");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const blockchain = new Blockchain(2);

app.get("/api/chain", (req, res) => {
  res.json({
    chain: blockchain.chain,
    length: blockchain.chain.length,
    valid: blockchain.isValid(),
  });
});

app.post("/api/block", (req, res) => {
  const data = req.body.data ?? req.body;
  if (data === undefined || (typeof data === "object" && Object.keys(data).length === 0)) {
    return res.status(400).json({ error: "Provide 'data' in the request body." });
  }
  try {
    const block = blockchain.addBlock(data);
    res.status(201).json({
      message: "Block added",
      block: {
        index: block.index,
        timestamp: block.timestamp,
        data: block.data,
        previousHash: block.previousHash,
        nonce: block.nonce,
        hash: block.hash,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/validate", (req, res) => {
  res.json({ valid: blockchain.isValid() });
});

app.get("*", (req, res) => {
  const indexPath = path.join(__dirname, "index.html");
  const publicPath = path.join(__dirname, "public", "index.html");
  const fs = require("fs");
  if (fs.existsSync(indexPath)) {
    return res.sendFile(indexPath);
  }
  res.sendFile(publicPath);
});

// Only listen when run directly (local); on Vercel we export the app
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Blockchain simulator running at http://localhost:${PORT}`);
  });
}

module.exports = app;
