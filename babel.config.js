module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'babel-plugin-root-import',
      {
        rootPathSuffix: '~',
        rootPathSuffix: 'src',
      },
    ],
    [
      'module:react-native-dotenv',
      {
        moduleName: 'react-native-dotenv',
      },
    ],
  ],
};
