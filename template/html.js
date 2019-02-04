const httpStatus = require('http-status-codes');

const render = (content) => (req, res) => {
   res.write('<html>');
   res.write('<head><title>Hello!</title></head>');
   res.write('<body>');
   content(req,res);
   res.write('</body>')
   res.write('</html>');
   return res.end();
}

module.exports = {
    render: render,
}