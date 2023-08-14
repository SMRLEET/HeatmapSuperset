import {
  GenericDataType,
  NumberFormats,
  NumberFormatter,
  TimeFormatter,
  getNumberFormatter,
} from '@superset-ui/core';
import {
  CallbackDataParams,
  OptionDataValue,
} from 'echarts/types/src/util/types';
import { AxisType, EchartsHeatmapLabelTypeType } from '../types';
import { buildKeyValue } from './utils';

const percentFormatter = getNumberFormatter(NumberFormats.PERCENT_2_POINT);

export function getAxisType(dataType?: GenericDataType): AxisType {
  if (dataType === GenericDataType.TEMPORAL) {
    return AxisType.time;
  }
  return AxisType.category;
}
export function labelFormatter(
  data: CallbackDataParams,
  numberFormatter: NumberFormatter,
  sum: number,
  showPerc: boolean,
) {
  let { value } = data;
  value = value as OptionDataValue[];
  return `${numberFormatter(value[2] as number)}${
    showPerc ? `(${percentFormatter((value[2] as number) / sum)})` : ''
  }`;
}
export function axisFormatter(params: string, timeFormatter: TimeFormatter) {
  return timeFormatter(Number.parseInt(params, 10));
}
export function getAxisFormated(
  axisDataType: AxisType,
  value: string,
  timeFormatter: TimeFormatter,
  numberFormatter: NumberFormatter,
): string {
  switch (axisDataType) {
    case AxisType.category:
      return value;
    case AxisType.time:
      return timeFormatter(Number.parseInt(value, 10));
    case AxisType.value:
      return numberFormatter(Number.parseInt(value, 10));
    default:
      return value;
  }
}

export function formatHeatmapLabel(
  data: CallbackDataParams,
  labelType: EchartsHeatmapLabelTypeType,
  numberFormatter: NumberFormatter,
  timeFormatter: TimeFormatter,
  sum: number,
  xAxisDataType: AxisType,
  yAxisDataType: AxisType,
): string {
  const { value, color } = data;
  const labelData = value as OptionDataValue[];
  switch (labelType) {
    case EchartsHeatmapLabelTypeType.Key:
      return buildKeyValue(
        color!.toString(),
        getAxisFormated(
          xAxisDataType,
          labelData[0] as string,
          timeFormatter,
          numberFormatter,
        ),
        getAxisFormated(
          yAxisDataType,
          labelData[1] as string,
          timeFormatter,
          numberFormatter,
        ),
      );
    case EchartsHeatmapLabelTypeType.Value:
      return buildKeyValue(
        color!.toString(),
        undefined,
        undefined,
        numberFormatter(labelData[2] as number),
      );
    case EchartsHeatmapLabelTypeType.Percent:
      return buildKeyValue(
        color!.toString(),
        undefined,
        undefined,
        undefined,
        percentFormatter((labelData[2] as number) / sum),
      );
    case EchartsHeatmapLabelTypeType.KeyValue:
      return buildKeyValue(
        color!.toString(),
        getAxisFormated(
          xAxisDataType,
          labelData[0] as string,
          timeFormatter,
          numberFormatter,
        ),
        getAxisFormated(
          yAxisDataType,
          labelData[1] as string,
          timeFormatter,
          numberFormatter,
        ),
        numberFormatter(labelData[2] as number),
      );
    case EchartsHeatmapLabelTypeType.KeyValuePercent:
      return buildKeyValue(
        color!.toString(),
        getAxisFormated(
          xAxisDataType,
          labelData[0] as string,
          timeFormatter,
          numberFormatter,
        ),
        getAxisFormated(
          yAxisDataType,
          labelData[1] as string,
          timeFormatter,
          numberFormatter,
        ),
        numberFormatter(labelData[2] as number),
        percentFormatter((labelData[2] as number) / sum),
      );
    case EchartsHeatmapLabelTypeType.KeyPercent:
      return buildKeyValue(
        color!.toString(),
        getAxisFormated(
          xAxisDataType,
          labelData[0] as string,
          timeFormatter,
          numberFormatter,
        ),
        getAxisFormated(
          yAxisDataType,
          labelData[1] as string,
          timeFormatter,
          numberFormatter,
        ),
        undefined,
        percentFormatter((labelData[2] as number) / sum),
      );
    default:
      return '';
  }
}
