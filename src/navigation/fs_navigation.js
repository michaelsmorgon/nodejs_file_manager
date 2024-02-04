import path from 'node:path';
import fs from 'node:fs';
import fsPromises from 'fs/promises';
import currentDirectory from '../directory/current_directory.js';
import errorMsg from '../error/error_msg.js';
import fileSystem from '../fs/file_system.js';

class FSNavigation {
  list() {
    const dirPath = path.join(currentDirectory.getCurrentDir());

    try {
      fs.readdir(dirPath, {withFileTypes: true }, (err, files) => {
        if (err) {
          errorMsg.printOperationFailedMsg();
          currentDirectory.currentDirMsg();
          return;
        }
        const structure = [];
        files.forEach((file) => {
          structure.push({
            name: file.name,
            type: file.isDirectory() ? 'directory' : 'file'
          });
        });
        let res = structure.sort((itemA, itemB) => {
          return itemA.type < itemB.type ? -1 : 1;
        });
        console.table(res);
        currentDirectory.currentDirMsg();
      });
    } catch {
      errorMsg.printOperationFailedMsg();
      currentDirectory.currentDirMsg();
    }
  }

  up() {
    const upDir = path.dirname(currentDirectory.getCurrentDir());
    currentDirectory.setCurrentDir(upDir);
  }

  async cd(newPath) {
    try {
      newPath = fileSystem.checkFilePath(newPath);
      const stat = await fsPromises.stat(newPath);
      if (stat.isDirectory()) {
        currentDirectory.setCurrentDir(newPath);
      } else {
        errorMsg.printInvalidInputMsg();
      }
    } catch {
      errorMsg.printInvalidInputMsg();
    }
  }
}

const fsNavigation = new FSNavigation();

export default fsNavigation;