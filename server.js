const express = require('express');

const bodyParser = require('body-parser');

const app = express();
app.use(express.static('static'));

app.use(bodyParser.json());

const Issue = require('./server/issue.js');

const MongoClient = require('mongodb').MongoClient;

var db;
MongoClient.connect('mongodb://localhost:27017').then(connection => {
	db = connection.db('issuetracker');

	if(db != undefined)
		console.log('BD criado!!!!');

	app.listen( 3000, function() {
		console.log('O app inicializou na porta 3000');
	});
}).catch(error => {
	console.log("ERROR", error);
});

app.get('/api/issues', (req, res) => {
	db.collection('issues').find().toArray().then(issues => {
		const metadata = {total_count: issues.length};
		res.json({_metadata: metadata, records: issues})
	}).catch(error => {
		console.log(error);
		res.status(500).json({message: `Internal server error: ${error}`});
	});
});

app.post('/api/issues', (req, res) => {
	var newIssue = req.body;
	newIssue.created = new Date();

	if(!newIssue.status)
		newIssue.status = 'New';

	const err = Issue.validateIssue(newIssue);

	if(err){
		res.status(422).json({message: `Invalid request: ${err}`});
		return;
	}

	db.collection('issues').insertOne(newIssue).then(result => {
		db.collection('issues').find({_id: result.insertedId}).limit(1).next();
	}).then(newIssue => {
		res.json(newIssue);
	}).catch(error => {
		console.log(error)
		res.status(500).json({message: `Internal Server Error: ${error}`});
	});
});