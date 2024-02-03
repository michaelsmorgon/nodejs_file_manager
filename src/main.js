import process from 'node:process';
import user from './user/user.js';
import currentDirectory from './directory/current_directory.js';
import fsNavigation from './fs/file_system.js';
import errorMsg from './error/error.js';

try {
  if (!user.getUsername()) {
    errorMsg.printInvalidInputMsg();
    process.exit();
  }

  user.welcomeUserMsg();
  currentDirectory.currentDirMsg();

  process.stdin.on('data', (chunk) => {
    const data = chunk.toString().trim();
    if (data === '.exit') {
      user.byeUserMsg();
      process.exit();
    } else if (data === 'up') {
      fsNavigation.up();
    } else if (data.indexOf('cd ') === 0) {
      fsNavigation.cd(data.slice(3));
    } else if (data === 'ls') {
      fsNavigation.list();
    } else {
      errorMsg.printInvalidInputMsg();
      currentDirectory.currentDirMsg();
    }
  });

  process.on('SIGINT', () => {
    user.byeUserMsg();
    process.exit();
  });
} catch {
  errorMsg.printInvalidInputMsg();
  currentDirectory.currentDirMsg();
}
