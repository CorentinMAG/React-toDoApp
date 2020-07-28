import * as path from 'path'
import * as webpack from 'webpack'

const config:webpack.Configuration = {
	entry:'./src/main.tsx',
	output:{
		path:path.resolve(__dirname,'dist'),
		filename:'main.js',
		publicPath:'/dist/'
	},
	resolve:{
		extensions:['.js','.ts','.tsx']
	},
	module:{
		rules:[
		{
		test:/\.tsx?/,
		loader:'ts-loader',
		exclude:/node_modules/
	},{
		test:/\.tsx?/,
		loader:'eslint-loader',
		exclude:/node_modules/
	}
		]
	
	},
	plugins:[
	new webpack.DefinePlugin({
		'process.env':{
			NODE_ENV:JSON.stringify(process.env.NODE_ENV)
		}
	})
	]

}


export default config