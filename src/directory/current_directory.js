import os from 'node:os';
let instance;

class CurrentDirectory {
  constructor() {
    if (instance) {
      throw new Error('You can only create one instance!');
    }
    this.currentDir = os.homedir();
    instance = this;
  }

  getCurrentDir() {
    return this.currentDir;
  }
  
  setCurrentDir(newDir) {
    this.currentDir = newDir;
    this.currentDirMsg();
  }

  currentDirMsg() {
    const show = this.currentDir.slice(-1) !== '\\'
      ? this.currentDir
      : this.currentDir.slice(0, this.currentDir.length - 1);
    console.log(`You are currently in ${show}\n`);
  }
}

const currentDirectory = new CurrentDirectory();

export default currentDirectory;