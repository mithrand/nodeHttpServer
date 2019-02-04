const httpStatus = require('http-status-codes');

const render = (content) => (req, res) => {
   res.write('<html>');
   res.write('<head><title>Hello!</title></head>');
   res.write('<body>');
   res.write(`<a href="/">Main</a>`);
   res.write(`<a href="/users">users</a>`);
   content(req,res);
   res.write('</body>')
   res.write('</html>');
   return res.end();
}

module.exports = {
    render: render,
}