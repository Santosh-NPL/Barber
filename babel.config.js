module.exports = {
  presets: ['module:@react-native/babel-preset', 'nativewind/babel',],

  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
  plugins: [
    'react-native-reanimated/plugin', // Must be last in the list per reanimated docs
    
  ],
};
