/**
 * Skycoin Data Types Version 0.1 - last updated december 9th
 */

/**
 * Elementary Types
 */

export class Address {
  address: string;
  next_seed?: string;
  secret_key?: string;
  public_key?: string;
  balance?: number;
  hours?: number;
}

export class Block {
  id: number;
  hash: string;
  timestamp: number;
  transactions: Transaction[];
}

export class Blockchain {
  blocks: number;
}

export class Output {
  address: string;
  coins: number;
  hash: string;
  hours: number;
}

export class Transaction {
  inputs: any[];
  outputs: Output[];
}

export class Wallet {
  label: string;
  addresses: Address[];
  seed?: string;
  balance?: number;
  hours?: number;
  hidden?: boolean;
}

/**
 * Node Response Types
 */

export class GetBlocksResponse {
  blocks: GetBlocksResponseBlock[];
}

export class GetBlocksResponseBlock {
  body: GetBlocksResponseBlockBody;
  header: GetBlocksResponseBlockHeader;
}

export class GetBlocksResponseBlockBody {
  txns: GetBlocksResponseBlockBodyTransaction[];
}

export class GetBlocksResponseBlockBodyTransaction {
  inputs: string[];
  outputs: GetBlocksResponseBlockBodyTransactionOutput[];
}

class GetBlocksResponseBlockBodyTransactionOutput {
  coins: string;
  dst: string;
  hours: number;
  uxid: string;
}

export function parseGetBlocksResponseTransaction(transaction: GetBlocksResponseBlockBodyTransaction): Transaction {
  return {
    inputs: transaction.inputs,
    outputs: transaction.outputs.map(output => parseGetBlocksResponseOutput(output)),
  }
}

function parseGetBlocksResponseOutput(raw: GetBlocksResponseBlockBodyTransactionOutput): Output {
  return {
    address: raw.dst,
    coins: parseFloat(raw.coins),
    hash: raw.uxid,
    hours: raw.hours,
  }
}

export class GetBlocksResponseBlockHeader {
  block_hash: string;
  seq: number;
  timestamp: number;
}

export class GetBlockchainMetadataResponse {
  head: GetBlockchainMetadataResponseHead;
}

export class GetBlockchainMetadataResponseHead {
  seq: number;
}

export class GetOutputsRequest {
  head_outputs: GetOutputsRequestOutput[];
  outgoing_outputs: any[];
  incoming_outputs: any[];
}

export class GetOutputsRequestOutput {
  hash: string;
  src_tx: string;
  address: string;
  coins: string;
  hours: number;
}

/**
 * Web Cipher Types
 */

export class TransactionInput {
  hash: string;
  secret: string;
}

export class TransactionOutput {
  address: string;
  coins: number;
  hours: number;
}
