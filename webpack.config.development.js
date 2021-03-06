/* eslint max-len: 0 */
import webpack from 'webpack';
import baseConfig from './webpack.config.base';
import HappyPack from 'happypack';
const enableHappy = false;

const getHappyConfig = (enable) => {
  const config = {};
  config.loaders = enable 
    ? [{
        test: /\.global\.css$/,
        loader: 'happypack/loader?id=cssGlobal',
      },{
        test: /^((?!\.global).)*\.css$/,
        loader: 'happypack/loader?id=cssLocal',
      }]
    : [{
      test: /\.global\.css$/,
      loaders: [ 'style-loader', 'css-loader?sourceMap']
    },{
      test: /^((?!\.global).)*\.css$/,
      loaders: [ 'style-loader', 'css-loader?modules&sourceMap&importLoaders=1&localIdentName=[name][emoji:6]']
    }];
  
  config.plugins = enable 
    ? [
      new HappyPack({ threads: 4, id: 'cssLocal',  loaders: [ 'style-loader', 'css-loader?modules&sourceMap&importLoaders=1&localIdentName=[name][emoji:6]']}),
      new HappyPack({ threads: 4, id: 'cssGlobal', loaders: [ 'style-loader', 'css-loader?sourceMap']})
    ]
    : [];
  
  return config;
}

const happyConfig = getHappyConfig(enableHappy)

const config = {
  ...baseConfig,
  debug: true,
  devtool: 'cheap-module-eval-source-map',
  entry: {
  },
  output: {
    ...baseConfig.output,
    publicPath: 'http://localhost:3001/dist/',
  },
  module: {
    ...baseConfig.module,
    loaders: [
      ...baseConfig.module.loaders,
      ...happyConfig.loaders
    ],
  },
  plugins: [
    ...baseConfig.plugins,
    ...happyConfig.plugins,   
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      __DEV__: true,
      'GLOBAL_ENV': {
        NODE_ENV: JSON.stringify('development'),
        API_SERVER: JSON.stringify(process.env.API_SERVER),
        WEBSOCKET_SERVER: JSON.stringify(process.env.WEBSOCKET_SERVER)
      },
    }),
  ],
  target: 'electron-renderer',
};


export default config;
