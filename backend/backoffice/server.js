var express = require('express');
var envalid = require('envalid');
const { str, port, url } = envalid;

const params = {
	PORT: port({ devDefault: 8080 }),
};

var app = express();


app.listen(params.PORT, () => {
    console.log(`Listening on: http://localhost:${params.PORT}`);
});
