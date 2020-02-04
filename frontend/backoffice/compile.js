var ejs = require('ejs');
var fs = require('fs');
fs.unlink('./build/test.html', () => {
    ejs.renderFile('./test.html', (err, html) => {
        fs.appendFile('./build/test.html', html, () => {});
    });
});