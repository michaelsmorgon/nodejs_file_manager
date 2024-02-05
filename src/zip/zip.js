import path from 'node:path';
import fs from 'fs/promises';
import zlib from 'node:zlib';
import { createReadStream, createWriteStream } from 'node:fs';
import errorMsg from '../error/error_msg.js';
import currentDirectory from '../directory/current_directory.js';
import { pipeline } from 'node:stream/promises';
import fileSystem from '../fs/file_system.js';

class Zip {
  async compress(sourceFilePath, destinationPath) {
    this.process(sourceFilePath, destinationPath, true);
  }

  async decompress(sourceFilePath, destinationPath) {
    this.process(sourceFilePath, destinationPath, false);
  }

  async process(sourceFilePath, destinationPath, isCompress = true) {
    try {
      sourceFilePath = fileSystem.checkFilePath(sourceFilePath);
      destinationPath = fileSystem.checkFilePath(destinationPath);

      const sourceFilePathStats = await fs.stat(sourceFilePath, () => {});

      if (!sourceFilePathStats.isFile()) {
        return;
      }
      const readStream = createReadStream(sourceFilePath);
      const writeStream = createWriteStream(destinationPath);
      let zlibProcess = zlib.createBrotliCompress();
      if (!isCompress) {
        zlibProcess = zlib.createBrotliDecompress();
      }

      await pipeline(readStream, zlibProcess, writeStream);
    } catch (err) {
      errorMsg.printOperationFailedMsg();
    }
    currentDirectory.currentDirMsg();
  }
}

const zip = new Zip();

export default zip;