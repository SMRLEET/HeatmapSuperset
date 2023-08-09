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
import {
  TimeseriesDataRecord,
  getNumberFormatter,
  getSequentialSchemeRegistry,
  getTimeFormatter,
} from '@superset-ui/core';

import { CallbackDataParams } from 'echarts/types/src/util/types';

import {
  getVisualMapPosition,
  setMargin
} from './utils/utils';

import {
  formatHeatmapLabel,

  getAxisType,
  labelFormatter,
} from './utils/formatters'

import { EchartsHeatmapChartProps, HeatmapProps } from './types';
import _ from 'lodash';

export default function transformProps(chartProps: EchartsHeatmapChartProps): HeatmapProps {

  const { width, height, formData, queriesData } = chartProps;
  const {
    linearColorScheme,
    showValues,
    showXaxisLabel,
    showYaxisLabel,
    showXaxisSplitlines,
    showYaxisSplitlines,
    labelType,
    visualMapPosition,
    showPerc,
    leftMargin,
    topMargin,
    rightMargin,
    numberFormat,
    dateFormat,
    showXName,
    showYName,
    allColumnsX,
    allColumnsY,
    xAxisRotate
  } = formData;

  const numberFormatter = getNumberFormatter(numberFormat);
  const timeFormatter = getTimeFormatter(dateFormat);

  const data = queriesData[0].data as TimeseriesDataRecord[];
  const colTypes = queriesData[0].coltypes;

  const yAxis = _.uniq(data.map((element) => element[queriesData[0].colnames[1]]));
  const xAxis = _.uniq(data.map((element) => element[queriesData[0].colnames[0]]));

  const metrics = data.map((element) =>
    [element[queriesData[0].colnames[0]]?.toString(),
    element[queriesData[0].colnames[1]]?.toString(),
    element[queriesData[0].colnames[2]]]);

  const colorSet = getSequentialSchemeRegistry().get(linearColorScheme)?.colors;

  const metricsValues = data.map(element =>
    element[queriesData[0].colnames[2]]) as number[];

  const min = Math.min(...metricsValues);
  const max = Math.max(...metricsValues);

  const xAxisDataType = getAxisType(colTypes[0]);
  const yAxisDataType = getAxisType(colTypes[1]);

  const sum = labelType > 2 || showPerc ?
    metricsValues.reduce((partialSum, a) => partialSum + a, 0) : 1;

  const tooltipFormatter = (params: CallbackDataParams) =>
    formatHeatmapLabel(params,
      labelType,
      numberFormatter,
      timeFormatter,
      sum,
      xAxisDataType,
      yAxisDataType);

  const axis = {

    xAxis: {
      type: 'category',
      data: xAxis,
      splitArea: {
        show: showXaxisSplitlines,
      },
      ...(showXName && { name: allColumnsX.label ? allColumnsX.label : allColumnsX }),
      axisLabel: {
        show: showXaxisLabel,
        rotate: xAxisRotate
      }
    },

    yAxis: {
      type: 'category',
      data: yAxis,
      splitArea: {
        show: showYaxisSplitlines,
      },
      ...(showYName && { name: allColumnsY.label ? allColumnsY.label : allColumnsY }),
      axisLabel: {
        show: showYaxisLabel,
        
      }
    },
  }

  const heatmapSeries = [
    {
      type: 'heatmap',
      data: metrics,
      label: {
        show: showValues,
        formatter: (data: CallbackDataParams) =>
          labelFormatter(data, numberFormatter, sum, showPerc)
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ];

  const heatmapOptions = {
    tooltip: {
      position: 'top',
      formatter: tooltipFormatter,
    },
    grid: {
      ...setMargin(leftMargin, rightMargin, topMargin)
    },
    ...axis,
    visualMap: {
      min: min,
      max: max,
      ...getVisualMapPosition(visualMapPosition),
      inRange: {
        color: colorSet
      },
    },
    series: heatmapSeries
  };
  console.log('heatmapOptions',heatmapOptions)
  return {
    width,
    height,
    heatmapOptions,
  };
}