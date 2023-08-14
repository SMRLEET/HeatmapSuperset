/* eslint-disable theme-colors/no-literal-colors */
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
  DataRecordValue,
  TimeseriesDataRecord,
  getNumberFormatter,
  getSequentialSchemeRegistry,
  getTimeFormatter,
} from '@superset-ui/core';

import { CallbackDataParams } from 'echarts/types/src/util/types';

import _ from 'lodash';
import { getVisualMapPosition, setMargin } from './utils/utils';
import {
  formatHeatmapLabel,
  getAxisType,
  labelFormatter,
} from './utils/formatters';
import {
  CrossFilterAxisSelection,
  EchartsHeatmapChartProps,
  HeatmapProps,
} from './types';
import { OpacityEnum } from '../constants';
import { Refs } from '../types';
import { getColtypesMapping } from '../utils/series';

function getLabelMap(axisArray: DataRecordValue[]) {
  return axisArray.reduce(
    (acc: Record<string, string[]>, datum: string) => ({
      ...acc,
      [datum]: [datum],
    }),
    {},
  );
}

export default function transformProps(
  chartProps: EchartsHeatmapChartProps,
): HeatmapProps {
  const {
    width,
    height,
    formData,
    hooks,
    queriesData,
    filterState,
    emitCrossFilters,
  } = chartProps;
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
    columnX,
    columnY,
    xAxisRotate,
    crossFilterAxisSelection,
  } = formData;
  const numberFormatter = getNumberFormatter(numberFormat);
  const timeFormatter = getTimeFormatter(dateFormat);
  const refs: Refs = {};
  const data = queriesData[0].data as TimeseriesDataRecord[];

  const coltypeMapping = getColtypesMapping(queriesData[0]);
  const colTypes = queriesData[0].coltypes;

  const { setDataMask = () => {}, onContextMenu } = hooks;

  const yAxis = _.uniq(
    data.map(element => element[queriesData[0].colnames[1]]),
  );
  const xAxis = _.uniq(
    data.map(element => element[queriesData[0].colnames[0]]),
  );

  const transformedData = data.map(datum => {
    const xAxis = datum[queriesData[0].colnames[0]];
    const yAxis = datum[queriesData[0].colnames[1]];
    const isFiltered =
      filterState.selectedValues &&
      !filterState.selectedValues.includes(xAxis) &&
      !filterState.selectedValues.includes(yAxis);
    return {
      value: [
        datum[queriesData[0].colnames[0]]?.toString(),
        datum[queriesData[0].colnames[1]]?.toString(),
        datum[queriesData[0].colnames[2]],
      ],
      name:
        crossFilterAxisSelection === CrossFilterAxisSelection.xAxis
          ? datum[queriesData[0].colnames[0]]?.toString()
          : datum[queriesData[0].colnames[1]]?.toString(),
      itemStyle: {
        opacity: isFiltered
          ? OpacityEnum.SemiTransparent
          : OpacityEnum.NonTransparent,
      },
    };
  });

  const colorSet = getSequentialSchemeRegistry().get(linearColorScheme)?.colors;

  const metricsValues = data.map(
    element => element[queriesData[0].colnames[2]],
  ) as number[];

  const min = Math.min(...metricsValues);
  const max = Math.max(...metricsValues);

  const xAxisDataType = getAxisType(colTypes[0]);
  const yAxisDataType = getAxisType(colTypes[1]);

  const sum =
    labelType > 2 || showPerc
      ? metricsValues.reduce((partialSum, a) => partialSum + a, 0)
      : 1;

  const tooltipFormatter = (params: CallbackDataParams) =>
    formatHeatmapLabel(
      params,
      labelType,
      numberFormatter,
      timeFormatter,
      sum,
      xAxisDataType,
      yAxisDataType,
    );

  const axis = {
    xAxis: {
      type: 'category',
      data: xAxis,
      splitArea: {
        show: showXaxisSplitlines,
      },
      ...(showXName && { name: columnX.label ? columnX.label : columnX }),
      axisLabel: {
        show: showXaxisLabel,
        rotate: xAxisRotate,
      },
    },

    yAxis: {
      type: 'category',
      data: yAxis,
      splitArea: {
        show: showYaxisSplitlines,
      },
      ...(showYName && { name: columnY.label ? columnY.label : columnY }),
      axisLabel: {
        show: showYaxisLabel,
      },
    },
  };
  const selectedValues = (filterState.selectedValues || []).reduce(
    (acc: Record<string, number>, selectedValue: string) => {
      const index = transformedData.findIndex(
        ({ name }) => name === selectedValue,
      );
      return {
        ...acc,
        [index]: selectedValue,
      };
    },
    {},
  );

  const heatmapSeries = [
    {
      type: 'heatmap',
      data: transformedData,
      label: {
        show: showValues,
        formatter: (data: CallbackDataParams) =>
          labelFormatter(data, numberFormatter, sum, showPerc),
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
    },
  ];

  const labelMap = getLabelMap(
    crossFilterAxisSelection === CrossFilterAxisSelection.xAxis ? xAxis : yAxis,
  );

  const echartOptions = {
    tooltip: {
      position: 'top',
      formatter: tooltipFormatter,
    },
    grid: {
      ...setMargin(leftMargin, rightMargin, topMargin),
    },
    ...axis,
    visualMap: {
      min,
      max,
      ...getVisualMapPosition(visualMapPosition),
      inRange: {
        color: colorSet,
      },
    },
    series: heatmapSeries,
  };
  return {
    width,
    height,
    refs,
    echartOptions,
    formData,
    setDataMask,
    emitCrossFilters,
    labelMap,
    selectedValues,
    onContextMenu,
    coltypeMapping,
    groupby: [
      crossFilterAxisSelection === CrossFilterAxisSelection.xAxis
        ? columnX
        : columnY,
    ],
  };
}
