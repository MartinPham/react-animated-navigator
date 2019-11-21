const path = require('path');

module.exports = {
	entry: './src/index.js',
	mode: 'production',
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'index.js',
		library: 'react-animated-navigator',
		libraryTarget: 'umd',
		umdNamedDefine: true
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				include: path.resolve(__dirname, 'src'),
				exclude: /(node_modules|bower_components|build)/,
				use: {
					loader: 'babel-loader',
				}
			}, 
			{
				test: /\.*css$/,
				use: [
					'style-loader',
					{
						loader: "css-loader",
						options: { modules: true }
					},
					'sass-loader'
				]
		},
		]
	},
    resolve: {      
        alias: {          
            'react': path.resolve(__dirname, './node_modules/react'),
            'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
            'react-router': path.resolve(__dirname, './node_modules/react-router'),
        }  
    },
	externals: {
        'react': {
            root: 'React',
            commonjs2: 'react',
            commonjs: 'react',
            amd: 'react'
        },
        'react-dom': {
            root: 'ReactDOM',
            commonjs2: 'react-dom',
            commonjs: 'react-dom',
            amd: 'react-dom'
        },
        'react-router': {
            root: 'ReactRouter',
            commonjs2: 'react-router',
            commonjs: 'react-router',
            amd: 'react-router'
        }
    }
};
