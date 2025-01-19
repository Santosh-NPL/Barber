const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const { withNativeWind } = require('nativewind/metro');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */

// Define your custom config if needed
const customConfig = {
  // Add additional customizations here if required
};

// Merge the default config and custom config
const baseConfig = mergeConfig(getDefaultConfig(__dirname), customConfig);

// Enhance the config with NativeWind
module.exports = withNativeWind(baseConfig, {
  input: './global.css', // Optional: Include global styles (if you use them)
});
