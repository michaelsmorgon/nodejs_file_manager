import currentDirectory from '../directory/current_directory.js';

class ErrorMsg {
  invalidInput = '\x1b[31mInvalid input\x1b[0m';
  operationFailed = '\x1b[31mOperation failed\x1b[0m';

  printInvalidInputMsg(isShowCurrentDir = true) {
    console.log(this.invalidInput);
    if (isShowCurrentDir) {
      currentDirectory.currentDirMsg();
    }
  }

  printOperationFailedMsg() {
    console.log(this.operationFailed);
  }
}

const errorMsg = new ErrorMsg();

export default errorMsg;