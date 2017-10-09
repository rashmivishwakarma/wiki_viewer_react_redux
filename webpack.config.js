module.exports = {
    entry: './src/index.js',
    output: {
        path: __dirname,
        filename: 'dist/bundle.js'
    },
    devServer: {
        inline: true,
        port: 1234
    },
    module: {
      loaders: [{
          test: /.jsx?$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          query: {
              presets: ['es2015', 'react']
          }
      },
      {
              test: /\.scss$/,
              loaders: [ 'style', 'css', 'sass' ]
          }]
  }
};
