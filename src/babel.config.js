module.exports = {
  presets: [
    [
      "@babel/preset-env",
      { targets: { node: "current" }, loose: true },
      "@babel/preset-react",
    ],
  ],
};