const path = require("path");
const webpack = require('webpack')
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin'); //adding this for the monaco editor to work properly
module.exports = {
	target: "web",
	entry: {
		"bundle": "./src/index.tsx",
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx|ts|tsx)$/,
				use: {
					loader: "babel-loader",
				},
				exclude: /node_modules/,
			},
			{
				test:/\.css$/, //need this line or else webpack fucks up
				use: [
				'style-loader',
				'css-loader',
				
				],
			},
			{
				test: /\.worker\.js$/, // Only apply to web worker .js files
				use: { loader: 'worker-loader' },
				exclude: /node_modules/,
			  },
		],
	},
	plugins: [
		new webpack.ProvidePlugin({
			m: "mithril",
		}),
		new MonacoWebpackPlugin(
			{
				languages: ['javascript', 'css', 'html', 'typescript']//add more languages in the future but from microsoft documentation
			}
		)
	],
	resolve: {
		extensions: [".tsx", ".ts", ".js", ".jsx"],
	},
	output: {
		filename: "[name].js",
		path: path.resolve(__dirname, "public"),
	},
	devServer: {
		proxy: {
			"/api": "http://localhost:44252/",
		},
		historyApiFallback: {
			index: "index.html",
		},
		static: {
			directory: path.resolve(__dirname, "public"),
			watch: {
				ignored: /node_modules/,
				usePolling: true,
				poll: 100,
			},
		},
	},
	mode: "production",
};
