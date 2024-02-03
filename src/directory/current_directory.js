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
    this.currentDir = newDir.slice(-1) !== '\\' ? newDir : newDir.slice(0, newDir.length - 1);
    this.currentDirMsg();
  }

  currentDirMsg() {
    console.log(`You are currently in ${this.currentDir}\n`);
  }
}

const currentDirectory = new CurrentDirectory();

export default currentDirectory;