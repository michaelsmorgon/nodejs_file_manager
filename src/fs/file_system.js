import path from 'node:path';
import fs from 'fs/promises';
import errorMsg from '../error/error_msg.js';
import currentDirectory from '../directory/current_directory.js';

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

  async copy(sourceFilePath, newDirectoryPath) {
    try {
      if (sourceFilePath.indexOf('.') === 0) {
        sourceFilePath = path.join(currentDirectory.getCurrentDir(), sourceFilePath);
      }
      if (newDirectoryPath.indexOf('.') === 0) {
        newDirectoryPath = path.join(currentDirectory.getCurrentDir(), newDirectoryPath);
      }

      const sourceFileName = path.basename(sourceFilePath);
      const destinationFilePath = path.join(newDirectoryPath, sourceFileName); 
      await fs.copyFile(sourceFilePath, destinationFilePath);
    } catch (err) {
      errorMsg.printOperationFailedMsg();
    }
    currentDirectory.currentDirMsg();
  }

  async delete(filePath) {
    if (filePath.indexOf('.') === 0) {
      filePath = path.join(currentDirectory.getCurrentDir(), filePath);
    }
    try {
      await fs.rm(filePath);
    } catch {
      errorMsg.printOperationFailedMsg();
    }
    currentDirectory.currentDirMsg();
  }
}

const fileSystem = new FileSystem();

export default fileSystem;