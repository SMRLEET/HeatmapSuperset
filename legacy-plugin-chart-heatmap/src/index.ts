/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import { t, ChartMetadata,} from '@superset-ui/core';
import buildQuery from './plugins/buildQuery';
import controlPanel from './plugins/controlPanel';
import transformProps from './plugins/transformProps';
import thumbnail from './images/thumbnail.png';
import { EchartsChartPlugin } from './plugins/echart/types';


export default class HeatmapChartPlugin extends EchartsChartPlugin {
  constructor() {
    const metadata = new ChartMetadata({
      category: t('Correlation'),
      description: t(
        'Visualize a related metric across pairs of groups. Heatmaps excel at showcasing the correlation or strength between two groups. Color is used to emphasize the strength of the link between each pair of groups.',
      ),
      exampleGallery: [{ url: thumbnail }],
      name: t('Heatmap'),
      tags: [
        t('Business'),
        t('Intensity'),
        t('Density'),
        t('Echarts'),
        t('Predictive'),
        t('Single Metric'),
      ],
      thumbnail,
    });

    super({
      buildQuery,
      controlPanel,
      loadChart: () => import('./plugins/Heatmap'),
      metadata,
      transformProps,
    });
  }
}
