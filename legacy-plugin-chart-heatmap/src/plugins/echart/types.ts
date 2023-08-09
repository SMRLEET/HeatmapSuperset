import { ChartMetadata, ChartPlugin, ChartProps, SqlaFormData } from "@superset-ui/core";
import { ECharts, EChartsCoreOption } from "echarts";
import { RefObject } from "react";

export type EventHandlers = Record<string, { (props: any): void }>;



export class EchartsChartPlugin<
  T extends SqlaFormData = SqlaFormData,
  P extends ChartProps = ChartProps,
> extends ChartPlugin<T, P> {
  constructor(props: any) {
    const { metadata, ...restProps } = props;
    super({
      ...restProps,
      metadata: new ChartMetadata({
        parseMethod: 'json',
        ...metadata,
      }),
    });
  }
}

export type EchartsStylesProps = {
  height: number;
  width: number;
}

export interface EchartsHandler {
  getEchartInstance: () => ECharts | undefined;
}

export interface EchartsProps {
  height: number;
  width: number;
  echartOptions: EChartsCoreOption;
  eventHandlers?: EventHandlers;
  zrEventHandlers?: EventHandlers;
  selectedValues?: Record<number, string>;
  forceClear?: boolean;
  refs: Refs;
}

export type Refs = {
  echartRef?: React.Ref<EchartsHandler>;
  divRef?: RefObject<HTMLDivElement>;
};