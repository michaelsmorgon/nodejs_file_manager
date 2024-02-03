class ErrorMsg {
  invalidInput = '\x1b[31mInvalid input\x1b[0m';
  operationFailed = '\x1b[31mOperation failed\x1b[0m';

  printInvalidInputMsg() {
    console.log(this.invalidInput);
  }

  printOperationFailedMsg() {
    console.log(this.operationFailed);
  }
}

const errorMsg = new ErrorMsg();

export default errorMsg;