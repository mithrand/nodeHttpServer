const httpStatus = require('http-status-codes');
const render = require('../template/html').render;
const dataService = require('../services/dataService');

const get =  render((req,res) => {
  const users  = dataService.getUsers();
  const userList = users.reduce((html, user) => `${html} <li>${user.name}</li>`  , '');
  res.write(`<ul>${userList}</ul>`);
});

const post = (req, res) => {
  const body = [];
  
  req.on('data', chunk => {
    body.push(chunk);
  });

  return req.on('end', () => {
    const parsedBody = Buffer.concat(body).toString();
    const user = parsedBody.split('=')[1];
    dataService.addUser({name: user});
    res.statusCode = 302;
    res.setHeader('Location', '/');
    res.end();
  });
}


module.exports = {
    get,
    post,
}