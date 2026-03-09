const crypto = require("crypto");

class Block {
  constructor(index, timestamp, data, previousHash, nonce = 0) {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.nonce = nonce;
    this.hash = this.computeHash();
  }

  computeHash() {
    const blockString = JSON.stringify({
      index: this.index,
      timestamp: this.timestamp,
      data: this.data,
      previousHash: this.previousHash,
      nonce: this.nonce,
    });
    return crypto.createHash("sha256").update(blockString).digest("hex");
  }

  mineBlock(difficulty) {
    const target = "0".repeat(difficulty);
    while (this.hash.substring(0, difficulty) !== target) {
      this.nonce++;
      this.hash = this.computeHash();
    }
  }
}

class Blockchain {
  constructor(difficulty = 2) {
    this.chain = [];
    this.difficulty = difficulty;
    this.createGenesisBlock();
  }

  createGenesisBlock() {
    const genesis = new Block(0, Date.now() / 1000, "Genesis Block", "0");
    genesis.mineBlock(this.difficulty);
    this.chain.push(genesis);
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(data) {
    const latest = this.getLatestBlock();
    const newBlock = new Block(
      this.chain.length,
      Date.now() / 1000,
      data,
      latest.hash
    );
    newBlock.mineBlock(this.difficulty);
    this.chain.push(newBlock);
    return newBlock;
  }

  isValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const current = this.chain[i];
      const previous = this.chain[i - 1];
      if (current.hash !== current.computeHash()) return false;
      if (current.previousHash !== previous.hash) return false;
    }
    return true;
  }
}

module.exports = { Block, Blockchain };
