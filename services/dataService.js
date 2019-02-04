const path = require('path');
const fs = require('fs');
const config  =  require('../config');

const dataFilePath = path.join(config.dataPath);
let users = [];

const saveUsers = () => {
  const data = JSON.stringify(users);
  fs.writeFile( dataFilePath, data , (error) => {
    if( error ) { console.error(error);}
    console.info('Users saved');
  });
}

const userDataService = {
  start: () => new Promise((resolve, reject) => {
    const user = fs.readFile(dataFilePath, { encoding: 'utf8' },  (error, data) => {
      if(error) {
        users = [];
        console.error(error, 'dataService - Error in loadUsers()');
        return reject();
      }
      if(!data) {
        users = [];
        return resolve();;
      }
      users = JSON.parse(data);
      return resolve();
    });
  }),
  getUsers: () => users,
  getUser: (name) => users.find(user => user.name = name),
  deleteUser: (name) => {
    users = users.filter(user => user.name != name);
    saveUsers();
  },
  addUser: (user) => {
    users = users.concat([user]);
    saveUsers();
  }
}



module.exports = userDataService;
