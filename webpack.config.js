const path =  require('path');

module.exports = {
	entry: './static/App.js',
	output: {
		filename: 'app.bundle.js',
		path: path.resolve(__dirname, './static')
	}
}
