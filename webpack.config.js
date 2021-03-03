const path = require('path');

// creates an alias for components to make future imports one-word only.

module.exports = {
  resolve: {
    alias: {
      'components': path.resolve(__dirname, 'src/components'),
    },
    extensions: ['.jsx', '.js', '.scss', '.json'],
  },
};