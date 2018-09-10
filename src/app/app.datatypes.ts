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
  size: number;
}

export class Blockchain {
  blocks: number;
}

export class Input {
  owner: string;
  coins: number;
  uxid: string;
  hours: number;
  calculatedHours: number;
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
  inputs: Input[];
  outputs: Output[];
  status: boolean;
  timestamp: number;
  balance: number;
  initialBalance: number;
  finalBalance: number;
  length: number;
}

export class Wallet {
  label: string;
  addresses: Address[];
  seed?: string;
  balance?: number;
  hours?: number;
  hidden?: boolean;
}

export class RichlistEntry {
  address: string;
  coins: string;
  locked: boolean;
}

/**
 * Generic Node Response Types
 */

export class GenericBlockResponse {
  header: GenericBlockHeaderResponse;
  body: GenericBlockBodyResponse;
  size: number;
}

class GenericBlockHeaderResponse {
  block_hash: string;
  previous_block_hash: string;
  seq: number;
  timestamp: number;
}

class GenericBlockBodyResponse {
  txns: GenericTransactionResponse[];
}

export class GenericTransactionResponse {
  inputs: GenericTransactionInputResponse[];
  outputs: GenericTransactionOutputResponse[];
  status: any;
  timestamp: number;
  txid: string;
  length: number;
  fee: number;
}

class GenericTransactionInputResponse {
  uxid: string;
  owner: string;
  coins: string;
  hours: number;
  calculated_hours: number;
}

class GenericTransactionOutputResponse {
  coins: string;
  dst: string;
  hours: number;
  uxid: string;
}

export function parseGenericBlock(block: GenericBlockResponse): Block {
  return {
    id: block.header.seq,
    hash: block.header.block_hash,
    parent_hash: block.header.previous_block_hash,
    timestamp: block.header.timestamp,
    transactions: block.body.txns.map(transaction => parseGenericTransaction(transaction)),
    size: block.size,
  }
}

export function parseGenericTransaction(raw: GenericTransactionResponse, address: string = null): Transaction {
  let balance = null;
  if (address) {
    balance = 0;
    for (const input of raw.inputs) {
      if (input.owner.toLowerCase() === address.toLowerCase()) {
        balance -= parseFloat(input.coins);
      }
    }
    for (let output of raw.outputs) {
      if (output.dst.toLowerCase() === address.toLowerCase()) {
        balance += parseFloat(output.coins);
      }
    }
  }

  const response = {
    block: null,
    id: raw.txid,
    timestamp: raw.timestamp,
    inputs: raw.inputs.map(input => parseGenericTransactionInput(input)),
    outputs: raw.outputs.map(output => parseGenericTransactionOutput(output)),
    status: null,
    balance: balance,
    initialBalance: null,
    finalBalance: null,
    length: raw.length,
  }

  if (raw.status) {
    if (raw.status.confirmed) {
      response.status = raw.status.confirmed;
    }

    if (raw.status.height) {
      response.block = raw.status.block_seq;
    }
  }

  return response;
}

function parseGenericTransactionInput(raw: GenericTransactionInputResponse): Input {
  return {
    owner: raw.owner,
    coins: parseFloat(raw.coins),
    uxid: raw.uxid,
    hours: raw.hours,
    calculatedHours: raw.calculated_hours,
  }
}

function parseGenericTransactionOutput(raw: GenericTransactionOutputResponse): Output {
  return {
    address: raw.dst,
    coins: parseFloat(raw.coins),
    hash: raw.uxid,
    hours: raw.hours,
  }
}

/**
 * Node Response Types
 */

export class GetUnconfirmedTransactionResponse {
  transaction: GenericTransactionResponse;
  received: string;
  is_valid: boolean;
}

export function parseGetUnconfirmedTransaction(raw: GetUnconfirmedTransactionResponse): Transaction {
  raw.transaction.timestamp = new Date(raw.received).getTime();
  raw.transaction.status = { confirmed: raw.is_valid };

  return parseGenericTransaction(raw.transaction);
}

export class GetBlocksResponse {
  blocks: GenericBlockResponse[];
}

export class GetBlockchainMetadataResponse {
  head: GetBlockchainMetadataResponseHead;
}

export class GetBlockchainMetadataResponseHead {
  seq: number;
}

export class GetBalanceResponse {
  confirmed: GetBalanceResponseElement;
  predicted: GetBalanceResponseElement;
}

class GetBalanceResponseElement {
  coins: number;
  hours: number;
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
  status: any;
  time: number;
  txn: GenericTransactionResponse;
}

export function parseGetTransaction(raw: GetTransactionResponse): Transaction {
  raw.txn.status = raw.status;
  return parseGenericTransaction(raw.txn);
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
