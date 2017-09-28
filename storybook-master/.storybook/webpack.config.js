const path = require('path');



module.exports = {
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
    // modules: [
    //   path.join(__dirname, '../src'),
    //   path.join(__dirname, 'node_modules'),
    // ],
},
  module: {
    rules: [
        {
            test: /\.less$/,
            // include: /src/,
            // exclude: /node_modules/,
            use: [{
              loader: 'style-loader', // creates style nodes from JS strings
            }, {
              loader: 'css-loader', // translates CSS into CommonJS
              options: {
                modules: true,
                url: false,
                localIdentName: '[local]___[hash:base64:5]',
              },
            }, {
              loader: 'less-loader', // compiles Less to CSS
              options: {
                modules: true,
                url: false,
              },
            }],
        },
        {
            test: /\.js(x)?$/,
            exclude: /node_modules/,
            use: [
                {
                  loader: 'babel-loader?cacheDirectory',
                  // options: {
                  //   cacheDirectory: 'babel-cache',
                  //   presets: ['react', 'env', 'stage-0'],
                  // },
                },
            ],
        },
        {
            test: /\.ts(x)?$/,
            exclude: /node_modules/,
            use: [
              {
                loader: 'awesome-typescript-loader?cacheDirectory',
                // options: {
                //   cacheDirectory: 'babel-cache',
                //   presets: ['react', 'env', 'stage-0'],
                // },
              },
            ],
        },
        {
            test: /\.(jpe?g|png|gif|svg)$/i,
            use: [
              // 'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
              // 'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false',
              'url-loader?limit=10000',
              'img-loader',
            ],
        },
        {
            test: /\.css$/,
            // include: /src/,
            exclude: /node_modules/,
            use: [
              {
                loader: 'style-loader',
              },
              {
                loader: 'css-loader?minimize',
                options: {
                  modules: true,
                },
              },
            ],
        }
    ]
  }
}
