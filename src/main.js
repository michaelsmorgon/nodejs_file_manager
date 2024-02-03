import process from 'node:process';
import user from './user/user.js';
import currentDirectory from './directory/current_directory.js';
import FS from './fs/file_system.js';
import ErrorMsg from './error/error.js';

try {
  if (!user.getUsername()) {
    new ErrorMsg().printInvalidInputMsg();
    process.exit();
  }

  user.welcomeUserMsg();
  currentDirectory.currentDirMsg();

  process.stdin.on('data', (chunk) => {
    const data = chunk.toString().trim();
    if (data === '.exit') {
      user.byeUserMsg();
      process.exit();
    } else {
      new ErrorMsg().printInvalidInputMsg();
      currentDirectory.currentDirMsg();
    }
  });

  process.on('SIGINT', () => {
    user.byeUserMsg();
    process.exit();
  });
} catch {
  new ErrorMsg().printInvalidInputMsg();
  currentDirectory.currentDirMsg();
}
