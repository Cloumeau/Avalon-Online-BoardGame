
const express = require('express');
const exp = express();



exp.use(express.static('public'));

exp.get('/', function (req, res) {
    res.sendFile('avalon_home.html', { root: __dirname + '/public' });
});

exp.listen(3000, function () {
    console.log('Server listening on port 3000');
});
