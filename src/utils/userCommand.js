import errorMsg from '../error/error_msg.js';
import fileSystem from '../fs/file_system.js';
import hash from '../hash/calcHash.js';
import fsNavigation from '../navigation/fs_navigation.js';
import operatingSystemInfo from '../os/operatingSystem.js';
import zip from '../zip/zip.js';

const NumberOfArgs = {
  one: 1,
  two: 2
};

export const checkInput = (input) => {
  if (input.indexOf('os --') === 0) {
    operatingSystemInfo.getInfo(input.slice(5));
    return;
  }

  const index = input.search(' ');

  const command = index === -1 ? input : input.substring(0, index);
  const argsList = index === -1 ? null : getArguments(input.slice(index + 1));
  
  if (!isCorrectNumberOfArgs(command, argsList)) {
    errorMsg.printInvalidInputMsg();
    return;
  }
  switch (command) {
    case 'up':
      fsNavigation.up();
      break;
    case 'cd':
      fsNavigation.cd(argsList[0]);
      break;
    case 'ls':
      fsNavigation.list();
      break;
    case 'cat':
      fileSystem.read(argsList[0]);
      break;
    case 'add':
      fileSystem.create(argsList[0]);
      break;
    case 'rn':
      fileSystem.rename(argsList[0], argsList[1]);
      break;
    case 'rm':
      fileSystem.delete(argsList[0]);
      break;
    case 'cp':
      fileSystem.copy(argsList[0], argsList[1]);
      break;
    case 'mv':
      fileSystem.move(argsList[0], argsList[1]);
      break;
    case 'compress':
      zip.compress(argsList[0], argsList[1]);
      break;
    case 'decompress':
      zip.decompress(argsList[0], argsList[1]);
      break;
    case 'hash':
      hash.calculateHash(argsList[0]);
      break;
  }
}

const getArguments = (input) => {
  let startedStrInQuotes = false;
  let argument = '';
  let argsList = null;

  const args = [];
  for (let i = 0; i < input.length; i++) {
    switch(input[i]) {
      case "'":
      case '"':
        if (startedStrInQuotes) {
          args.push(argument);
          argument = '';
          startedStrInQuotes = false;
        } else {
          startedStrInQuotes = true;
        }
        break;
      case " ":
        if (startedStrInQuotes) {
          argument += input[i];
        } else {
          if (args.length == 0) {
            args.push(argument);
            argument = '';
            break;
          }
          if (argument !== '') {
            argument += input[i];
          }
        }
        break;
      default:
        argument += input[i];
        break;
    }
  }
  if (argument !== '') {
    args.push(argument);
  }
  argsList = args;

  return argsList;
}

const isCorrectNumberOfArgs = (command, args) => {
  switch (command) {
    case 'up':
    case 'ls':
      return args === null;
    case 'cd':
    case 'cat':
    case 'add':
    case 'rm':
    case 'hash':
      return isNumberOfArgs(args, NumberOfArgs.one);
    case 'rn':
    case 'cp':
    case 'mv':
    case 'compress':
    case 'decompress':
      return isNumberOfArgs(args, NumberOfArgs.two);
    default:
      return false;
  }
}

const isNumberOfArgs = (args, numberOfArgs) => {
  return args.length === numberOfArgs;
}