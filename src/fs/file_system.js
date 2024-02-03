import path from 'node:path';
import fs from 'node:fs';
import currentDirectory from '../directory/current_directory.js';
import ErrorMsg from '../error/error.js';

export default class FS {
  constructor() {}

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