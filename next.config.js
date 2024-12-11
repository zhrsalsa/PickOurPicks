// next.config.js
module.exports = {
    webpack(config) {
      config.module.rules.push({
        test: /\.html$/, // Cocokkan file dengan ekstensi .html
        use: ["html-loader"], // Gunakan loader ini
      });
      return config;
    },
  };
  