"""
Simple Blockchain Simulator
Uses only Python standard library - no pip install needed.
"""

import hashlib
import json
import time
from typing import Any, List, Optional


class Block:
    """A single block in the blockchain."""

    def __init__(
        self,
        index: int,
        timestamp: float,
        data: Any,
        previous_hash: str,
        nonce: int = 0,
    ):
        self.index = index
        self.timestamp = timestamp
        self.data = data
        self.previous_hash = previous_hash
        self.nonce = nonce
        self.hash = self.compute_hash()

    def compute_hash(self) -> str:
        """Compute SHA-256 hash of the block."""
        block_string = json.dumps(
            {
                "index": self.index,
                "timestamp": self.timestamp,
                "data": self.data,
                "previous_hash": self.previous_hash,
                "nonce": self.nonce,
            },
            sort_keys=True,
        )
        return hashlib.sha256(block_string.encode()).hexdigest()

    def mine_block(self, difficulty: int) -> None:
        """Proof of work: find nonce so hash starts with 'difficulty' zeros."""
        target = "0" * difficulty
        while self.hash[:difficulty] != target:
            self.nonce += 1
            self.hash = self.compute_hash()

    def to_dict(self) -> dict:
        return {
            "index": self.index,
            "timestamp": self.timestamp,
            "data": self.data,
            "previous_hash": self.previous_hash,
            "nonce": self.nonce,
            "hash": self.hash,
        }

    def __str__(self) -> str:
        return json.dumps(self.to_dict(), indent=2)


class Blockchain:
    """A simple blockchain with proof-of-work."""

    def __init__(self, difficulty: int = 2):
        self.chain: List[Block] = []
        self.difficulty = difficulty
        self._create_genesis_block()

    def _create_genesis_block(self) -> None:
        """Create the first block in the chain."""
        genesis = Block(
            index=0,
            timestamp=time.time(),
            data="Genesis Block",
            previous_hash="0",
        )
        genesis.mine_block(self.difficulty)
        self.chain.append(genesis)

    def get_latest_block(self) -> Block:
        return self.chain[-1]

    def add_block(self, data: Any) -> Block:
        """Add a new block with the given data."""
        latest = self.get_latest_block()
        new_block = Block(
            index=len(self.chain),
            timestamp=time.time(),
            data=data,
            previous_hash=latest.hash,
        )
        new_block.mine_block(self.difficulty)
        self.chain.append(new_block)
        return new_block

    def is_valid(self) -> bool:
        """Validate the entire chain (hashes and links)."""
        for i in range(1, len(self.chain)):
            current = self.chain[i]
            previous = self.chain[i - 1]

            if current.hash != current.compute_hash():
                return False
            if current.previous_hash != previous.hash:
                return False
        return True

    def __str__(self) -> str:
        lines = [f"Blockchain (length={len(self.chain)}, valid={self.is_valid()})"]
        for block in self.chain:
            lines.append("-" * 40)
            lines.append(str(block))
        return "\n".join(lines)


def main() -> None:
    print("=== Blockchain Simulator ===\n")

    blockchain = Blockchain(difficulty=2)

    print("Adding blocks...")
    blockchain.add_block({"from": "Alice", "to": "Bob", "amount": 10})
    blockchain.add_block({"from": "Bob", "to": "Charlie", "amount": 5})
    blockchain.add_block({"message": "Hello Blockchain!"})

    print(blockchain)
    print("\nChain valid:", blockchain.is_valid())


if __name__ == "__main__":
    main()
