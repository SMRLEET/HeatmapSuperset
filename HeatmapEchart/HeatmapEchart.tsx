import React from 'react';
import { HeatmapProps } from './types';
import Echart from '../components/Echart';
import { allEventHandlers } from '../utils/eventHandlers';
export default function HeatmapEchart(props: HeatmapProps) {
  const { height, width, echartOptions, selectedValues, refs } = props;

  const eventHandlers = allEventHandlers(props);


  return (
    <Echart
      refs={refs}
      height={height}
      width={width}
      echartOptions={echartOptions}
      eventHandlers={eventHandlers}
      selectedValues={selectedValues}
    />
  );
}
