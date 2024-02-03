import path from 'node:path';
import fs from 'fs/promises';
import { createReadStream, createWriteStream } from 'node:fs';
import errorMsg from '../error/error_msg.js';
import currentDirectory from '../directory/current_directory.js';
import { pipeline } from 'node:stream/promises';

class FileSystem {
  async read(filePath) {
    try {
      if (filePath.indexOf('.') === 0) {
        filePath = path.join(currentDirectory.getCurrentDir(), filePath);
      }
      const fileContent = await fs.readFile(filePath, 'utf-8');
      console.log(fileContent);
    } catch (err) {
      errorMsg.printOperationFailedMsg();
    }
    currentDirectory.currentDirMsg();
  }

  async create(fileName) {
    try {
      const newFilePath = path.join(currentDirectory.getCurrentDir(), fileName);
      await fs.writeFile(newFilePath, '', { flag: 'wx' });
    } catch (err) {
      errorMsg.printOperationFailedMsg();
    }
    currentDirectory.currentDirMsg();
  }

  async rename(filePath, newFileName) {
    try {
      if (filePath.indexOf('.') === 0) {
        filePath = path.join(currentDirectory.getCurrentDir(), filePath);
      }
      const newFilePath = path.join(currentDirectory.getCurrentDir(), newFileName); 
      await fs.rename(filePath, newFilePath);
    } catch (err) {
      errorMsg.printOperationFailedMsg();
    }
    currentDirectory.currentDirMsg();
  }

  async copy(sourceFilePath, newDirectoryPath, showCurrentDirMsg = true) {
    try {
      if (sourceFilePath.indexOf('.') === 0) {
        sourceFilePath = path.join(currentDirectory.getCurrentDir(), sourceFilePath);
      }
      if (newDirectoryPath.indexOf('.') === 0) {
        newDirectoryPath = path.join(currentDirectory.getCurrentDir(), newDirectoryPath);
      }

      let isFile = false;
      fs.stat(sourceFilePath, (err, stats) => {
        if (stats.isFile()) {
          isFile = true;
        }
      });

      if (!isFile) {
        return;
      }
      const sourceFileName = path.basename(sourceFilePath);
      const destinationFilePath = path.join(newDirectoryPath, sourceFileName);
      const readStream = createReadStream(sourceFilePath);
      const writeStream = createWriteStream(destinationFilePath);
      pipeline(readStream, writeStream);
    } catch (err) {
      errorMsg.printOperationFailedMsg();
    }
    if (showCurrentDirMsg) {
      currentDirectory.currentDirMsg();
    }
  }

  async delete(filePath, showCurrentDirMsg = true) {
    if (filePath.indexOf('.') === 0) {
      filePath = path.join(currentDirectory.getCurrentDir(), filePath);
    }
    try {
      await fs.rm(filePath);
    } catch {
      errorMsg.printOperationFailedMsg();
    }
    if (showCurrentDirMsg) {
      currentDirectory.currentDirMsg();
    }
  }

  async move(sourceFilePath, newDirectoryPath) {
    try {
      await this.copy(sourceFilePath, newDirectoryPath, false);
      await this.delete(sourceFilePath, false);
    } catch {
      errorMsg.printOperationFailedMsg();
    }
    currentDirectory.currentDirMsg();
  }
}

const fileSystem = new FileSystem();

export default fileSystem;