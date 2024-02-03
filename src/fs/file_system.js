import path from 'node:path';
import currentDirectory from '../directory/current_directory.js';

export default class FS {
  constructor() {}

  up() {
    const upDir = path.dirname(currentDirectory.getCurrentDir());
    currentDirectory.setCurrentDir(upDir);
  }
}