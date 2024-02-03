import process from 'node:process';
import user from './user/user.js';
import currentDirectory from './directory/current_directory.js';
import fsNavigation from './navigation/fs_navigation.js';
import errorMsg from './error/error_msg.js';
import fileSystem from './fs/file_system.js';
import zip from './zip/zip.js';

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
    } else if (data.indexOf('cat ') === 0) {
      fileSystem.read(data.slice(4));
    } else if (data.indexOf('add ') === 0) {
      fileSystem.create(data.slice(4));
    } else if (data.indexOf('rn ') === 0) {
      fileSystem.create(data.slice(3));
    } else if (data.indexOf('rm ') === 0) {
      fileSystem.delete(data.slice(3));
    } else if (data.indexOf('cp ') === 0) {
      const params = data.slice(3).split(' ');
      if (params.length < 2) {
        errorMsg.printInvalidInputMsg();
      }
      fileSystem.copy(params[0], params[1]);
    } else if (data.indexOf('mv ') === 0) {
      const params = data.slice(3).split(' ');
      if (params.length < 2) {
        errorMsg.printInvalidInputMsg();
      }
      fileSystem.move(params[0], params[1]);
    } else if (data.indexOf('compress ') === 0) {
      const params = data.slice(9).split(' ');
      if (params.length < 2) {
        errorMsg.printInvalidInputMsg();
      }
      zip.compress(params[0], params[1]);
    } else if (data.indexOf('decompress ') === 0) {
      const params = data.slice(11).split(' ');
      if (params.length < 2) {
        errorMsg.printInvalidInputMsg();
      }
      zip.decompress(params[0], params[1]);
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
