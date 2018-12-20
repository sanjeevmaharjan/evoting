export class TransactionModel {
  from: string;
  to: string;
  value: number|string;
  gas: number;
  gasPrice: number|string;
  data: string;
  nonce: number;
}
