import os from 'node:os';

class CurrentDirectory {
  constructor() {
    this.currentDir = os.homedir();
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
    console.log(`You are currently in ${show}`);
  }
}

const currentDirectory = new CurrentDirectory();

export default currentDirectory;