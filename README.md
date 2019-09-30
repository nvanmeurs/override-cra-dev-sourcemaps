# override-cra-sourcemaps

This project provides an utility that allows you to customize the development sourcemaps (`devtool`) config parameter of webpack in create-react-app.
The desired source map method can be passed as a param to the function, `eval-source-map` is the default.

- [override-cra-sourcemaps](#override-cra-sourcemaps)
  - [How to install](#how-to-install)
  - [Overview](#overview)
  - [Usage](#usage)
    - [With `webpack`](#with-webpack)
  - [Documentation](#documentation)

## How to install

This project relies on [`react-app-rewired`](https://github.com/timarney/react-app-rewired/) and [`customize-cra`](https://github.com/arackaf/customize-cra). You'll need to install them both in order for `override-cra-sourcemaps` to work.

```bash
npm install --save-dev customize-cra react-app-rewired
```

## Usage

To override the sourcemaps add the following code to `config-overrides.js` at the same level as your `package.json`.

For example:

```js
const {
  override,
} = require("customize-cra");
const path = require("path");

module.exports = override(
  // enable legacy decorators babel plugin
  addDecoratorsLegacy(),

  // disable eslint in webpack
  disableEsLint(),

  // add webpack bundle visualizer if BUNDLE_VISUALIZE flag is enabled
  process.env.BUNDLE_VISUALIZE == 1 && addBundleVisualizer(),

  // add an alias for "ag-grid-react" imports
  addWebpackAlias({
    ["ag-grid-react$"]: path.resolve(__dirname, "src/shared/agGridWrapper.js")
  }),

  // adjust the underlying workbox
  adjustWorkbox(wb =>
    Object.assign(wb, {
      skipWaiting: true,
      exclude: (wb.exclude || []).concat("index.html")
    })
  )
);
```

## Documentation

[See `api.md`](api.md) for documentation on the functions provided by `customize-cra`.