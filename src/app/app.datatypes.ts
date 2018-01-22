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
  block: number;
  id: string;
  inputs: Output[];
  outputs: Output[];
  status: boolean;
  timestamp: number;
  incoming: boolean;
}

export class UnconfirmedTransaction {
  id: string;
  inputs: string[];
  outputs: Output[];
  valid: boolean;
  timestamp: number;
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

export class GetAddressResponseTransaction {
  inputs: GetAddressResponseTransactionInput[];
  outputs: GetAddressResponseTransactionOutput[];
  status: any;
  timestamp: number;
  txid: string;
}

export function parseGetAddressTransaction(raw: GetAddressResponseTransaction, address: string): Transaction {

  // Detect if the address sent or received the coins.
  let incoming = true;
  for (const input of raw.inputs) {
      if (input.owner.toLowerCase() === address.toLowerCase()) {
          incoming = false;
          break;
      }
  }

  return {
    block: null,
    id: raw.txid,
    timestamp: raw.timestamp,
    inputs: raw.inputs.map(input => parseGetAddressInput(input)),
    outputs: raw.outputs.map(output => parseGetAddressOutput(output)),
    status: raw.status.confirmed,
    incoming: incoming,
  }
}

class GetAddressResponseTransactionInput {
  uxid: string;
  owner: string;
}

function parseGetAddressInput(raw: GetAddressResponseTransactionInput): Output {
  return {
    address: raw.owner,
    coins: null,
    hash: raw.uxid,
    hours: null,
  }
}

class GetAddressResponseTransactionOutput {
  uxid: string;
  dst: string;
  coins: string;
  hours: number;
}

function parseGetAddressOutput(raw: GetAddressResponseTransactionOutput): Output {
  return {
    address: raw.dst,
    coins: parseFloat(raw.coins),
    hash: raw.uxid,
    hours: raw.hours,
  }
}

export class GetUnconfirmedTransaction {
  transaction: GetUnconfirmedTransactionBody;
  received: string;
  is_valid: boolean;
}

export class GetUnconfirmedTransactionBody {
  txid: string;
  inputs: string[];
  outputs: GetAddressResponseTransactionOutput[];
}

export function parseGetUnconfirmedTransaction(raw: GetUnconfirmedTransaction): UnconfirmedTransaction {
  return {
    id: raw.transaction.txid,
    inputs: raw.transaction.inputs,
    outputs: raw.transaction.outputs.map(output => parseGetAddressOutput(output)),
    valid: raw.is_valid,
    timestamp: new Date(raw.received).getTime(),
  }
}

export class GetBlocksResponse {
  blocks: GetBlocksResponseBlock[];
}

export class GetBlocksResponseBlock {
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
    block: null,
    id: transaction.txid,
    timestamp: null,
    inputs: transaction.inputs.map(input => ({ address: null, coins: null, hash: input, hours: null })),
    outputs: transaction.outputs.map(output => parseGetBlocksOutput(output)),
    status: null,
    incoming: null,
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

export class GetCurrentBalanceResponse {
  head_outputs: GetCurrentBalanceResponseOutput[];
}

class GetCurrentBalanceResponseOutput {
  hash: string;
  src_tx: string;
  address: string;
  coins: string;
  hours: number;
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

export class GetTransactionResponse {
  status: GetTransactionStatus;
  time: number;
  txn: GetTransactionTransaction;
}

export function parseGetTransaction(raw: GetTransactionResponse): Transaction {
  return {
    block: raw.status.block_seq,
    id: raw.txn.txid,
    inputs: raw.txn.inputs.map(input => parseGetTransactionInput(input)),
    outputs: raw.txn.outputs.map(output => parseGetTransactionOutput(output)),
    status: raw.status.confirmed,
    timestamp: raw.txn.timestamp,
    incoming: null,
  }
}

function parseGetTransactionInput(raw: string): Output {
  return {
    address: null,
    coins: null,
    hash: raw,
    hours: null,
  }
}

function parseGetTransactionOutput(raw: GetTransactionOutput): Output {
  return {
    address: raw.dst,
    coins: parseFloat(raw.coins),
    hash: raw.uxid,
    hours: raw.hours,
  }
}

class GetTransactionOutput {
  uxid: string;
  dst: string;
  coins: string;
  hours: number;
}

class GetTransactionStatus {
  confirmed: boolean;
  block_seq: number;
}

class GetTransactionTransaction {
  inputs: string[];
  outputs: GetTransactionOutput[];
  timestamp: number;
  txid: string;
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
