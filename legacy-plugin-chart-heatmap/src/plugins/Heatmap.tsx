import React, { createRef } from 'react';
import { HeatmapProps } from '../types';
import Echart from './echart/Echart'
export default function Heatmap(props: HeatmapProps) {
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
