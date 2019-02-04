 const httpStatus = require('http-status-codes');
 const render = require('../template/html').render;
 
 const get = render((req,res) => {
     res.write('<span>Hello world!!!! </span>')
     res.write('<form action="/users" enctype="application/json" method="POST"><input type="text" name="message"><button type="submit">Send</button></form>');
 });
 
 const post = (req, res) => {
    res.statusCode = httpStatus.NOT_IMPLEMENTED;
    return res.end();
 }

module.exports = {
    get,
    post,
}