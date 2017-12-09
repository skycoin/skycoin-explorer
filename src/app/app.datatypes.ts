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
  parent_hash: string;
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
  id: string;
  inputs: Output[];
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

class GetBlocksResponseBlock {
  body: GetBlocksResponseBlockBody;
  header: GetBlocksResponseBlockHeader;
}

export function parseGetBlocksBlock(block: GetBlocksResponseBlock): Block {
  return {
    id: block.header.seq,
    hash: block.header.block_hash,
    parent_hash: block.header.previous_block_hash,
    timestamp: block.header.timestamp,
    transactions: block.body.txns.map(transaction => parseGetBlocksTransaction(transaction))
  }
}

function parseGetBlocksTransaction(transaction: GetBlocksResponseBlockBodyTransaction): Transaction {
  return {
    id: transaction.txid,
    inputs: transaction.inputs.map(input => ({ address: null, coins: null, hash: input, hours: null })),
    outputs: transaction.outputs.map(output => parseGetBlocksOutput(output)),
  }
}

function parseGetBlocksOutput(raw: GetBlocksResponseBlockBodyTransactionOutput): Output {
  return {
    address: raw.dst,
    coins: parseFloat(raw.coins),
    hash: raw.uxid,
    hours: raw.hours,
  }
}

class GetBlocksResponseBlockBody {
  txns: GetBlocksResponseBlockBodyTransaction[];
}

class GetBlocksResponseBlockBodyTransaction {
  txid: string;
  inputs: string[];
  outputs: GetBlocksResponseBlockBodyTransactionOutput[];
}

class GetBlocksResponseBlockBodyTransactionOutput {
  coins: string;
  dst: string;
  hours: number;
  uxid: string;
}

class GetBlocksResponseBlockHeader {
  block_hash: string;
  previous_block_hash: string;
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

export class GetUxoutResponse {
  coins: number;
  hours: number;
  owner_address: string;
  uxid: string;
}

export function parseGetUxout(raw: GetUxoutResponse): Output {
  return {
    address: raw.owner_address,
    coins: raw.coins / 1000000,
    hours: raw.hours,
    hash: raw.uxid,
  }
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
