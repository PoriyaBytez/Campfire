module.exports = {
  presets: ["@babel/preset-typescript", "module:metro-react-native-babel-preset"],
  plugins: [
    [
      "module-resolver",
      {
        root: ["."],
        extensions: [".ios.js", ".android.js", ".js", ".ts", ".tsx", ".jsx", ".json"],
        alias: {
          // This needs to be mirrored in tsconfig.json
          "~components": "./src/components",
          "~assets": "./src/assets",
          "~translations": "./src/translations",
          "~redux": "./src/redux",
          "~screens": "./src/screens",
          "~services": "./src/services",
          "~utils": "./src/utils",
          "~navigators": "./src/navigators",
          "~theme": "./src/theme",
        },
      },
    ],
  ],
};
