const path = require("path");
const webpack = require('webpack')

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
	plugins: [
        new webpack.ProvidePlugin({
            m: "mithril",
        }),
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
