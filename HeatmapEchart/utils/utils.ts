import { VisualMapPosition } from '../types';

export function buildKeyValue(
  color: string,
  xValue?: string,
  yValue?: string,
  metric?: string,
  percent?: string,
): string {
  let metriCTooltipe = '';
  if (yValue) {
    metriCTooltipe += `${yValue}<br>`;
  }
  metriCTooltipe += `<li style="color:${color}"> 
    <span style="color:rgba(0,0,0,100)">`;
  if (xValue) metriCTooltipe += `${xValue}`;
  if (metric) metriCTooltipe += `: ${metric}`;
  if (percent) metriCTooltipe += ` (${percent})`;

  return `${metriCTooltipe}</span> </li>`;
}

export function getVisualMapPosition(visualMapPosition: VisualMapPosition) {
  switch (visualMapPosition) {
    case VisualMapPosition.Right: {
      return {
        calculable: true,
        show: true,
        orient: 'vertical',
        right: 'right',
        bottom: '35%',
      };
    }
    case VisualMapPosition.Left: {
      return {
        calculable: true,
        show: true,
        orient: 'vertical',
        left: 'left',
        top: '35%',
      };
    }
    case VisualMapPosition.Top: {
      return {
        show: true,
        calculable: true,
        orient: 'horizontal',
        left: 'center',
        top: '0%',
      };
    }
    case VisualMapPosition.Bottom: {
      return {
        show: true,
        calculable: true,
        orient: 'horizontal',
        left: 'center',
        bottom: '15%',
      };
    }
    case VisualMapPosition.Hide: {
      return {
        calculable: true,
        show: false,
        orient: 'vertical',
        right: 'right',
        bottom: '35%',
      };
    }
    default:
      return {
        calculable: true,
        show: false,
        orient: 'vertical',
        right: 'right',
        bottom: '35%',
      };
  }
}

type grid = {
  height: number | string | undefined;
  top: number | string | undefined;
  left?: number | string | undefined;
  right?: number | string | undefined;
};

export function setMargin(
  leftMargin: string | number,
  rightMargin: string | number,
  topMargin: string | number,
) {
  const grid: grid = {
    height: '70%',
    top: '15%',
  };
  if (leftMargin !== 'auto') grid.left = leftMargin;
  if (rightMargin !== 'auto') grid.right = rightMargin;
  if (topMargin !== 'auto') grid.top = topMargin;
  return grid;
}
