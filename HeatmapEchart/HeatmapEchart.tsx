import React, { createRef } from 'react';
import { HeatmapProps } from './types';
import Echart from '../components/Echart';
export default function HeatmapEchart(props: HeatmapProps) {
  const { height, width, heatmapOptions } = props;
  const rootElem = createRef<HTMLDivElement>();
  return (
    <Echart
      echartOptions={heatmapOptions}
      height={height}
      width={width} refs={{
        echartRef: undefined,
        divRef: rootElem
      }} />

  );
}
