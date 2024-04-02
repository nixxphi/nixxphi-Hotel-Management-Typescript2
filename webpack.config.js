module.exports = {
    entry: "./src/server.ts", 
    output: {
      filename: "build/server.js",
      path: path.resolve(__dirname, "dist"), 
    },
    // Enabling sourcemaps for debugging webpack's output.
    devtool: "source-map",
    resolve: {
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"],
    },
    module: {
      rules: [
        { test: /\.tsx?$/, loader: "ts-loader" },
        
        { test: /\.js$/, loader: "source-map-loader", enforce: "pre" }, 
      ],
    },
    mode: "development",
  };
  