import process from 'node:process';

class User {
  constructor() {
    const res = process.argv.slice(2)
      .filter((data) => {
        return data.replace('--', '').split('=')[0] === 'username';
      });

    if (res.length > 0) {
      this.username = res[0]
        .slice(2)
        .split('=')[1];
    }
  }

  getUsername() {
    return this.username;
  }

  welcomeUserMsg() {
    console.log(`\x1b[33mWelcome to the File Manager, ${this.username}!\x1b[0m`);
  }

  byeUserMsg() {
    console.log(`\x1b[33mThank you for using File Manager, ${this.username}, goodbye!\x1b[0m`);
  }
}

const user = new User();

export default user;