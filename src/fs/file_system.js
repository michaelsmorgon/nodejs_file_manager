import path from 'node:path';
import fsPromises from 'fs/promises';
import { createReadStream, createWriteStream } from 'node:fs';
import errorMsg from '../error/error_msg.js';
import currentDirectory from '../directory/current_directory.js';
import { pipeline } from 'node:stream/promises';

class FileSystem {
  async read(filePath) {
    try {
      filePath = this.checkFilePath(filePath);
      const fileContent = await fsPromises.readFile(filePath, 'utf-8');
      console.log(fileContent);
    } catch (err) {
      errorMsg.printOperationFailedMsg();
    }
    currentDirectory.currentDirMsg();
  }

  async create(fileName) {
    try {
      const newFilePath = path.join(currentDirectory.getCurrentDir(), fileName);
      await fsPromises.writeFile(newFilePath, '', { flag: 'wx' });
    } catch (err) {
      errorMsg.printOperationFailedMsg();
    }
    currentDirectory.currentDirMsg();
  }

  async rename(filePath, newFileName) {
    try {
      filePath = this.checkFilePath(filePath);
      const newFilePath = path.join(currentDirectory.getCurrentDir(), newFileName); 
      await fsPromises.rename(filePath, newFilePath);
    } catch (err) {
      errorMsg.printOperationFailedMsg();
    }
    currentDirectory.currentDirMsg();
  }

  async copy(sourceFilePath, newDirectoryPath, showCurrentDirMsg = true) {
    try {
      sourceFilePath = this.checkFilePath(sourceFilePath);
      newDirectoryPath = this.checkFilePath(newDirectoryPath);

      const stat = await fsPromises.stat(sourceFilePath);
      if (!stat.isFile()) {
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
    filePath = this.checkFilePath(filePath);
    try {
      await fsPromises.rm(filePath);
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

  checkFilePath(filePath) {
    if (filePath.indexOf('.') === 0) {
      filePath = path.join(currentDirectory.getCurrentDir(), filePath);
    }

    return filePath;
  }
}

const fileSystem = new FileSystem();

export default fileSystem;