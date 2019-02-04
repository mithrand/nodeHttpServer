const path = require('path');
const fs = require('fs');
const config  =  require('../config');

const dataFilePath = path.join( __dirname , config.dataPath);
let users = [];

const InitService = () => {
  const user = fs.readFile(dataFilePath, { encoding: 'utf8' },  (error, data) => {
    if(error) {
      users = [];
      console.error(error, 'dataService - Error in loadUsers()');
      return;
    }
    users = JSON.parse(data);
  });
}

const saveUsers = () => {
  const data = JSON.stringify(users);
  fs.writeFile( dataFilePath, data , (error) => {
    if( error ) { console.error(error);}
    console.info('Users saved');
  });
}


InitService();

const userDataService = {
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
