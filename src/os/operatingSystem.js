import os from 'node:os';
import currentDirectory from "../directory/current_directory.js";
import errorMsg from "../error/error_msg.js";

class OperatingSystemInfo {
  getInfo(command) {
    switch(command) {
      case 'EOL':
        this.getEOL();
        break;
      case 'cpus':
        this.getCPUInfo();
        break;
      case 'homedir':
        this.getHomedir();
        break;
      case 'username':
        this.getUsername();
        break;
      case 'architecture':
        this.getCPUArchitecture();
        break;
      default:
        errorMsg.printInvalidInputMsg(false);
        break;
    }
    currentDirectory.currentDirMsg();
  }

  getEOL() {
    console.log(os.EOL);
  }

  getCPUInfo() {
    const cpuInfo = os.cpus();
    console.log(`Number of Cores: ${cpuInfo.length}`);
    const cpuInfoTable = [];
    cpuInfo.forEach((data) => {
      const clockRate = data.speed / 1000;
      cpuInfoTable.push({
        model: data.model,
        clockRate: `${clockRate.toFixed(1)} GHz`
      });
    })
    console.table(cpuInfoTable);
  }

  getHomedir() {
    console.log(os.homedir());
  }

  getUsername() {
    console.log(os.userInfo().username);
  }

  getCPUArchitecture() {
    console.log(os.arch());
  }
}
const operatingSystemInfo = new OperatingSystemInfo();

export default operatingSystemInfo;