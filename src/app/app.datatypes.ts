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

}

export class Output {
  address: string;
  coins: number;
  hash: string;
  hours: number;
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
