const path = require('path');

module.exports = {
	entry: {
		app: './static/App.js',
		issueadd: './static/IssueAdd.js'
	},
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist')
	}
}