module.exports = function(sourceMapMethod = 'eval-source-map') {
  return function(config) {
    if (process.env.NODE_ENV === 'development') {
      config.devtool = sourceMapMethod;
    }

    return config;
  };
};
