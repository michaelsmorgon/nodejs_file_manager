import path from 'node:path';
import fs from 'fs/promises';
import errorMsg from '../error/error_msg.js';
import currentDirectory from '../directory/current_directory.js';

class FileSystem {
  async read(filePath) {
    try {
      const fileContent = await fs.readFile(path.join(currentDirectory.getCurrentDir(), filePath), 'utf-8');
      console.log(fileContent);
    } catch (err) {
      errorMsg.printOperationFailedMsg();
    }
    currentDirectory.currentDirMsg();
  }
}

const fileSystem = new FileSystem();

export default fileSystem;