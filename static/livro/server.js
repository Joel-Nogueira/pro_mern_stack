const express = require('express');

const app = express();
app.use(express.static('static'));

// const dirname = 'static'
// app.use(express.static(dirname + '/public'));

app.listen( 3000, function() {
	console.log('O app inicializou na porta 3000');
});