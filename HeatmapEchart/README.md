# HeatmapEchart

This is the Heatmap Superset Chart Plugin.

### Usage

To build the plugin, run the following commands:

```
npm ci
npm run build
```

Alternatively, to run the plugin in development mode (=rebuilding whenever changes are made), start the dev server with the following command:

```
npm run dev
```

To add the package to Superset, go to the `superset-frontend` subdirectory in your Superset source folder (assuming both the `heatmap` plugin and `superset` repos are in the same root directory) and run
```
npm i -S ../../heatmap
```

If your Superset plugin exists in the `superset-frontend` directory and you wish to resolve TypeScript errors about `@superset-ui/core` not being resolved correctly, add the following to your `tsconfig.json` file:

```
"references": [
  {
    "path": "../../packages/superset-ui-chart-controls"
  },
  {
    "path": "../../packages/superset-ui-core"
  }
]
```

You may also wish to add the following to the `include` array in `tsconfig.json` to make Superset types available to your plugin:

```
"../../types/**/*"
```

Finally, if you wish to ensure your plugin `tsconfig.json` is aligned with the root Superset project, you may add the following to your `tsconfig.json` file:

```
"extends": "../../tsconfig.json",
```

After this edit the `superset-frontend/src/visualizations/presets/MainPreset.js` and make the following changes:

```js
import { Heatmap } from 'heatmap';
```

to import the plugin and later add the following to the array that's passed to the `plugins` property:
```js
new Heatmap().configure({ key: 'heatmap' }),
```

After that the plugin should show up when you run Superset, e.g. the development server:

```
npm run dev-server
```

# HeatmapEchart

This is the Heatmap Superset Chart Plugin.

### Usage

To build the plugin, run the following commands:

```
npm ci
npm run build
```

Alternatively, to run the plugin in development mode (=rebuilding whenever changes are made), start the dev server with the following command:

```
npm run dev
```

To add the package to Superset, go to the `superset-frontend` subdirectory in your Superset source folder (assuming both the `heatmap` plugin and `superset` repos are in the same root directory) and run
```
npm i -S ../../heatmap
```

If your Superset plugin exists in the `superset-frontend` directory and you wish to resolve TypeScript errors about `@superset-ui/core` not being resolved correctly, add the following to your `tsconfig.json` file:

```
"references": [
  {
    "path": "../../packages/superset-ui-chart-controls"
  },
  {
    "path": "../../packages/superset-ui-core"
  }
]
```

You may also wish to add the following to the `include` array in `tsconfig.json` to make Superset types available to your plugin:

```
"../../types/**/*"
```

Finally, if you wish to ensure your plugin `tsconfig.json` is aligned with the root Superset project, you may add the following to your `tsconfig.json` file:

```
"extends": "../../tsconfig.json",
```

After this edit the `superset-frontend/src/visualizations/presets/MainPreset.js` and make the following changes:

```js
import { Heatmap } from 'heatmap';
```

to import the plugin and later add the following to the array that's passed to the `plugins` property:
```js
new Heatmap().configure({ key: 'heatmap' }),
```

After that the plugin should show up when you run Superset, e.g. the development server:

```
npm run dev-server
```



# heatmap

This is the Heatmap Superset Chart Plugin.

### Usage

Copy this folder to `superset-frontend/plugins/plugin-chart-echarts/src`



```
"extends": "../../tsconfig.json",
```

After this edit the `superset-frontend/plugins/plugin-chart-echarts/src/index.ts` and make the following changes:

```js
export { default as EChartHeatmapChartPlugin } from './HeatmapEchart';
```

After this edit the `superset-frontend/src/visualizations/presets/MainPreset.js` and make the following changes:

```js
import {  EChartHeatmapChartPlugin } from '@superset-ui/plugin-chart-echarts';
```

to import the plugin and later add the following to the array that's passed to the `plugins` property:
```js
new EChartHeatmapChartPlugin().configure({ key: 'heatmap_echart' }),
```
# legacy-plugin-chart-heatmap

This is the Heatmap Superset Chart Plugin.

### Usage

Replace the files from `superset-frontend/plugins/legacy-plugin-chart-heatmap` with the files from this package


