const path = require("path");

module.exports = {
	target: "web",
	entry: {
		"bundle": "./src/index.ts",
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: "ts-loader",
				exclude: /node_modules/,
			  },
			  {
				test: /\.scss$/,
				use: [
				  'style-loader',
				  'css-loader',
				  'postcss-loader',
				  'sass-loader',
				],
			  },
		],
	},
	resolve: {
		extensions: [".tsx", ".ts", ".js"],
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
