const path = require('path');

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, './src/index.react.ts'),
  module: {
    rules: [{
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env'],
            plugins: ['transform-decorators-legacy', 'transform-class-properties']
          }
        }
      }
    ]
  },
  devServer: {
    overlay: {
      warnings: true,
      errors: false
    }
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
}