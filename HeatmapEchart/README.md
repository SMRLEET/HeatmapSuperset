# HeatmapEchart

This is the Heatmap Superset Chart Plugin.

### Usage

Copy this folder to `superset-frontend/plugins/plugin-chart-echarts/src`

```
"extends": "../../tsconfig.json",
```

After this edit the `superset-frontend/plugins/plugin-chart-echarts/src/index.ts` and make the following changes:

Add
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
