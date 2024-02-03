import path from 'node:path';
import fs from 'node:fs';
import currentDirectory from '../directory/current_directory.js';
import ErrorMsg from '../error/error.js';

export default class FS {
  constructor() {}

  list() {
    const dirPath = path.join(currentDirectory.getCurrentDir());

    try {
      fs.readdir(dirPath, {withFileTypes: true }, (err, files) => {
        if (err) {
          new ErrorMsg().printOperationFailedMsg();
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
      new ErrorMsg().printOperationFailedMsg();
      currentDirectory.currentDirMsg();
    }
  }

  up() {
    const upDir = path.dirname(currentDirectory.getCurrentDir());
    currentDirectory.setCurrentDir(upDir);
  }

  cd(newPath) {
    fs.stat(newPath, (err, stat) => {
      if (err === null && stat.isDirectory()) {
        currentDirectory.setCurrentDir(newPath);
      } else {
        newPath = path.join(currentDirectory.getCurrentDir(), newPath);
        fs.stat(newPath, (err, stat) => {
          if (err === null && stat.isDirectory()) {
            currentDirectory.setCurrentDir(newPath);
          } else {
            new ErrorMsg().printInvalidInputMsg();
            currentDirectory.currentDirMsg();
          }
        });
      }
    });
  }
}