import os from 'node:os';

class CurrentDirectory {
  constructor() {
    this.setCurrentDir(os.homedir(), false);
  }

  getCurrentDir() {
    return this.currentDir;
  }
  
  setCurrentDir(newDir, isShowMsg = true) {
    this.currentDir = newDir.replaceAll('\\', '/');
    if (isShowMsg) {
      this.currentDirMsg();
    }
  }

  currentDirMsg() {
    const show = (this.currentDir.slice(-1) === '/' && this.currentDir.length > 3)
      ? this.currentDir.slice(0, this.currentDir.length - 1)
      : this.currentDir;
    console.log(`\x1b[32mYou are currently in ${show}\x1b[0m`);
  }
}

const currentDirectory = new CurrentDirectory();

export default currentDirectory;