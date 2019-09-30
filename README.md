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


## Overview

`customize-cra` takes advantage of `react-app-rewired`'s `config-overrides.js` file. By importing `customize-cra` functions and exporting a few function calls wrapped in our `override` function, you can easily modify the underlying config objects (`webpack`, `webpack-dev-server`, `babel`, etc.) that make up `create-react-app`.

## Usage

**Note:** all code should be added to `config-overrides.js` at the same level as `package.json`.

See the [api docs](api.md) for documentation for each function.

### With `webpack`

To use these plugins, import the `override` function, and call it with whatever plugins you need. Each of these plugin invocations will return a new function, that `override` will call with the newly modified config object. Falsy values will be ignored though, so if you need to conditionally apply any of these plugins, you can do so like below.

For example:

```js
const {
  override,
  addDecoratorsLegacy,
  disableEsLint,
  addBundleVisualizer,
  addWebpackAlias,
  adjustWorkbox
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