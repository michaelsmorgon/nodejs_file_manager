import fs from 'node:fs';
import fsPromises from 'fs/promises';
import crypto from 'node:crypto';
import errorMsg from '../error/error_msg.js';
import currentDirectory from '../directory/current_directory.js';
import fileSystem from '../fs/file_system.js';

class Hash {
  async calculateHash(sourceFilePath) {
    try {
      sourceFilePath = fileSystem.checkFilePath(sourceFilePath);

      const sourceFilePathStats = await fsPromises.stat(sourceFilePath, () => {});

      if (!sourceFilePathStats.isFile()) {
        return;
      }

      const hash = crypto.createHash('sha256').setEncoding('hex');
  
      fs.createReadStream(sourceFilePath)
        .pipe(hash)
        .on('finish', (err) => {
          console.log(hash.read());
          currentDirectory.currentDirMsg();
        });
    } catch (err) {
      errorMsg.printOperationFailedMsg();
      currentDirectory.currentDirMsg();
    }
  }
}
const hash = new Hash();

export default hash;