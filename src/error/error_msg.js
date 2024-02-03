class ErrorMsg {
  invalidInput = 'Invalid input';
  operationFailed = 'Operation failed';

  printInvalidInputMsg() {
    console.log(this.invalidInput);
  }

  printOperationFailedMsg() {
    console.log(this.operationFailed);
  }
}

const errorMsg = new ErrorMsg();

export default errorMsg;