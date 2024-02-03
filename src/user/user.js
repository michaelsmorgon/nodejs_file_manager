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
    console.log(`Welcome to the File Manager, ${this.username}!`);
  }

  byeUserMsg() {
    console.log(`Thank you for using File Manager, ${this.username}, goodbye!`);
  }
}

const user = new User();

export default user;