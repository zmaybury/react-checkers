var CopyWebpackPlugin = require('copy-webpack-plugin');
var path = require('path');

module.exports = {
	entry: './src/app.js',
	output: {
		path: __dirname,
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel',
				query: { presets: [ 'es2015', 'react' ] }
			}
		]
	},
	plugins: [
		new CopyWebpackPlugin([
			/*{ from: 'semantic/dist/semantic.min.css', to: 'semantic.min.css' },
			{ from: 'semantic/dist/semantic.min.js', to: 'semantic.min.js' }*/
		])
	]
};