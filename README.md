# override-cra-dev-sourcemaps

This project provides an utility that allows you to customize the development sourcemaps (`devtool`) config parameter of webpack in create-react-app.
The desired source map method can be passed as a param to the function, `'eval-source-map'` is the default.

- [override-cra-dev-sourcemaps](#override-cra-dev-sourcemaps)
  - [How to install](#how-to-install)
  - [Usage](#usage)
  - [Troubleshooting](#troubleshooting)

## How to install

This project relies on [`react-app-rewired`](https://github.com/timarney/react-app-rewired/) and [`customize-cra`](https://github.com/arackaf/customize-cra). You'll need to install them both in order for `override-cra-sourcemaps` to work.

```bash
npm install --save-dev @nekoniri/override-cra-dev-sourcemaps customize-cra react-app-rewired
```

## Usage

To override the sourcemaps add the following code to `config-overrides.js` at the same level as your `package.json`.

For example:

```js
const { override } = require('customize-cra');
const overrideCraDevSourcemaps = require('@nekoniri/override-cra-dev-sourcemaps');

module.exports = override(overrideCraDevSourcemaps());
```

In your `package.json` replace your scripts section with:

```json
"scripts": {
  "start": "react-app-rewired start",
  "build": "react-app-rewired build",
  "test": "react-app-rewired test",
  "eject": "react-app-rewired eject"
}
```

## Troubleshooting

If you have trouble installing this package, please create a `.npmrc` file in the root of your project and add the following statement to it:

```npm
@nekoniri:registry=https://npm.pkg.github.com
```
