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
  ChartProps,
  PlainObject,
  QueryData,
  QueryFormData,
  TimeseriesDataRecord,
} from '@superset-ui/core';
import { EChartsCoreOption } from 'echarts';

import { EchartsStylesProps } from './echart/types';

export enum EchartsHeatmapLabelTypeType {
  Key,
  Value,
  KeyValue,
  KeyPercent,
  Percent,
  KeyValuePercent,
}

export enum AxisType {
  category = 'category',
  value = 'value',
  time = 'time',
  log = 'log',
}

export enum VisualMapPosition {
  Left,
  Right,
  Top,
  Bottom,
  Hide
}

export interface AllColumn {
  expressionType: string;
  label: string;
  sqlExpression: string;
}

export interface BaseChartProps<T extends PlainObject> extends ChartProps<T> {
  queriesData: QueryData[];
}

export type HeatmapCustomiseFormData = {
  linearColorScheme: string;
  showValues: boolean;
  showPerc: boolean;
  labelType: EchartsHeatmapLabelTypeType;
  visualMapPosition: VisualMapPosition;
  leftMargin: number | string;
  topMargin: number | string;
  rightMargin: number | string;
  numberFormat: string;
  dateFormat: string;
}



export type AxisFormData = {
  showXaxisLabel: boolean;
  showYaxisLabel: boolean;
  showXaxisSplitlines: boolean;
  showYaxisSplitlines: boolean;
  showXName: boolean;
  showYName: boolean;
  xAxisRotate:Number;
}

export type HeatmapDataFormData = {

  allColumnsX: TimeseriesDataRecord;
  allColumnsY: TimeseriesDataRecord;
}

export type HeatmapFormData =
  QueryFormData & AxisFormData & HeatmapCustomiseFormData & HeatmapDataFormData;

export interface EchartsHeatmapChartProps extends BaseChartProps<HeatmapFormData> {
  formData: HeatmapFormData;
}



export type HeatmapProps = EchartsStylesProps & {
  heatmapOptions: EChartsCoreOption;
};

