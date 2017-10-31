var path = require('path');
var HTMLWebpackPlugin = require('html-webpack-plugin');
var HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
	template: __dirname + '/app/index.html',
	filename: 'index.html',
	inject: 'body'
});

/*
	Webpack is going to take your JavaScript, run it through some transformations, and create a new, transformed JavaScript file. This file will be the ones that the browser actually reads.

	In order to do this, Webpack needs to know three things:

	What JavaScript file it should transform.
	Which transformations it should use on that file.
	Where the new, transformed file should go.

	https://www.codecademy.com/articles/react-setup-v
*/

// To specify an entry point, give module.exports a property named entry. entry's value can be a filepath, or an array of filepaths if you would like to have more than one entry point. For this project, you will only need one.
// You can tell webpack what to do with the code that it's grabbed by adding a second property to module.exports. This property should have a name of module and a value of an object literal containing a loaders array.
// The output object should have two properties: filename and path. filename will be the name of the new, transformed JavaScript file. path will be the filepath to where that transformed JavaScript file ends up.
module.exports = {
	entry: __dirname + '/app/index.js',
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			}
		]
	},
	resolve: {
	    extensions: [".jsx", ".js"]
	},
	devServer: {
		historyApiFallback: true,
	},
	output: {
	    path: path.resolve(__dirname, 'dist'),
	    filename: 'index_bundle.js',
	    publicPath: '/'
	},
	plugins: [HTMLWebpackPluginConfig]
};