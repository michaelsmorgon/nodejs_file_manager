export default class ErrorMsg {
  invalidInput = 'Invalid input';
  operationFailed = 'Operation failed';
  constructor() {}

  printInvalidInputMsg() {
    console.log(this.invalidInput);
  }

  printOperationFailedMsg() {
    console.log(this.operationFailed);
  }
}