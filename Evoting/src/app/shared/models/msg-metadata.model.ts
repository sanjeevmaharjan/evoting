export class MsgMetadataModel {
  from: string;
  gasPrice: string;
  gas: number;

  constructor(from: string, gasPrice?: string, gas?: number) {
    this.from = from;
    this.gasPrice = gasPrice;
    this.gas = gas;
  }
}
