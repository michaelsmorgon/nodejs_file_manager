import process from 'node:process';
import user from './user/user.js';
import currentDirectory from './directory/current_directory.js';
import errorMsg from './error/error_msg.js';
import { checkInput } from './utils/userCommand.js';

try {
  if (!user.getUsername()) {
    errorMsg.printInvalidInputMsg(false);
    process.exit();
  }

  user.welcomeUserMsg();
  currentDirectory.currentDirMsg();

  process.stdin.on('data', (chunk) => {
    const data = chunk.toString().trim();
    if (data === '.exit') {
      user.byeUserMsg();
      process.exit();
    }
    checkInput(data);
  });

  process.on('SIGINT', () => {
    user.byeUserMsg();
    process.exit();
  });
} catch {
  errorMsg.printInvalidInputMsg();
}
