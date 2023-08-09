import { FeatureFlag, isFeatureEnabled, t, validateNonEmpty } from '@superset-ui/core';
import {
  ControlPanelConfig,
  ControlPanelState,
  D3_FORMAT_DOCS,
  D3_FORMAT_OPTIONS,
  D3_TIME_FORMAT_OPTIONS,
  columnChoices,
  sections,
  sharedControls,
} from '@superset-ui/chart-controls';
import { EchartsHeatmapLabelTypeType, VisualMapPosition } from '../types';

const allColumns = {
  type: 'SelectControl',
  default: null,
  description: t('Columns to display'),
  mapStateToProps: (state: ControlPanelState) => ({
    choices: columnChoices(state.datasource),
  }),
  validators: [validateNonEmpty],
};

const dndAllColumns = {
  ...sharedControls.entity,
  description: t('Columns to display'),
};

const columnsConfig = isFeatureEnabled(FeatureFlag.ENABLE_EXPLORE_DRAG_AND_DROP)
  ? dndAllColumns
  : allColumns;

const sortAxisChoices = [
  ['no_sort', t('No sorting')],
  ['alpha_asc', t('Axis ascending')],
  ['alpha_desc', t('Axis descending')],
];
const sortMetricChoices = [
  ['no_sort', t('No sorting')],
  ['alpha_asc', t('Metrics ascending')],
  ['alpha_desc', t('Metrics descending')],
];
const config: ControlPanelConfig = {
  controlPanelSections: [
    sections.legacyRegularTime,
    {
      label: t('Query'),
      expanded: true,
      controlSetRows: [
        [
          {
            name: 'all_columns_x',
            config: {
              ...columnsConfig,
              label: t('X Axis'),
            },
          },
        ],
        [
          {
            name: 'all_columns_y',
            config: {
              ...columnsConfig,
              label: t('Y Axis'),
            },
          },
        ],
        ['metric'],
        [
          {
            name: 'sort_by_metrics',
            config: {
              type: 'SelectControl',
              label: t('Sort by metric'),
              choices: sortMetricChoices,
              clearable: false,
              default: 'no_sort',
            },
          },
        ],
        [
          {
            name: 'sort_x_axis',
            config: {
              type: 'SelectControl',
              label: t('Sort X Axis'),
              choices: sortAxisChoices,
              clearable: false,
              default: 'no_sort',
            },
          },
        ],
        [
          {
            name: 'sort_y_axis',
            config: {
              type: 'SelectControl',
              label: t('Sort Y Axis'),
              choices: sortAxisChoices,
              clearable: false,
              default: 'no_sort',
            },
          },
        ],
        ['adhoc_filters'],
        ['row_limit'],
      ],
    },

    {
      label: t('Chart Options'),
      expanded: true,
      controlSetRows: [
        ['linear_color_scheme'],
        [
          {
            name: 'left_margin',
            config: {
              type: 'SelectControl',
              freeForm: true,
              clearable: false,
              label: t('Left Margin'),
              choices: [
                ['auto', t('auto')],
                [50, '50'],
                [75, '75'],
                [100, '100'],
                [125, '125'],
                [150, '150'],
                [200, '200'],
              ],
              default: 'auto',
              renderTrigger: true,
              description: t(
                'Left margin, in pixels, allowing for more room for axis labels',
              ),
            },
          },
        ],
        [
          {
            name: 'right_margin',
            config: {
              type: 'SelectControl',
              clearable: false,
              freeForm: true,
              label: t('Right Margin'),
              choices: [
                ['auto', t('auto')],
                [50, '50'],
                [75, '75'],
                [100, '100'],
                [125, '125'],
                [150, '150'],
                [200, '200'],
              ],
              default: 'auto',
              renderTrigger: true,
              description: t(
                'Bottom margin, in pixels, allowing for more room for axis labels',
              ),
            },
          },
        ],
        [
          {
            name: 'top_margin',
            config: {
              type: 'SelectControl',
              clearable: false,
              freeForm: true,
              label: t('Top Margin'),
              choices: [
                ['auto', t('auto')],
                [50, '50'],
                [75, '75'],
                [100, '100'],
                [125, '125'],
                [150, '150'],
                [200, '200'],
              ],
              default: 'auto',
              renderTrigger: true,
              description: t(
                'Bottom margin, in pixels, allowing for more room for axis labels',
              ),
            },
          },
        ],
        [
          {
            name: 'x_axis_rotate',
            config: {
              type: 'SelectControl',
              clearable: false,
              freeForm: true,
              label: t('X axis rotate'),
              choices: [
                [0, '0'],
                [30, '30'],
                [45, '45'],
                [90, '90'],
              ],
              default: 0,
              renderTrigger: true,
              description: t(
                'Bottom margin, in pixels, allowing for more room for axis labels',
              ),
            },
          },
        ],
        [
          {
            name: 'visual_map_position',
            config: {
              type: 'SelectControl',
              label: t('Visual map position'),
              default: VisualMapPosition.Right,
              renderTrigger: true,
              clearable: false,
              choices: [
                [VisualMapPosition.Left, t('Left')],
                [VisualMapPosition.Right, t('Right')],
                [VisualMapPosition.Top, t('Top')],
                [
                  VisualMapPosition.Bottom,
                  t('Bottom'),
                ],
                [
                  VisualMapPosition.Hide,
                  t('Hide'),
                ],
              ],
            },
          },
        ],
        [
          {
            name: 'date_format',
            config: {
              type: 'SelectControl',
              freeForm: true,
              label: t('Date format'),
              renderTrigger: true,
              choices: D3_TIME_FORMAT_OPTIONS,
              default: 'smart_date',
              description: D3_FORMAT_DOCS,
            },
          },
        ],
        [
          {
            name: 'number_format',
            config: {
              type: 'SelectControl',
              freeForm: true,
              label: t('Number format'),
              renderTrigger: true,
              clearable: false,
              default: 'SMART_NUMBER',
              choices: D3_FORMAT_OPTIONS,
              description: `${D3_FORMAT_DOCS}`,
            },
          },
        ],
        [
          {
            name: 'show_perc',
            config: {
              type: 'CheckboxControl',
              label: t('Show percentage'),
              renderTrigger: true,
              description: t(
                'Whether to include the percentage in the tooltip',
              ),
              default: false,
            },
          },
        ],
        [
          {
            name: 'label_type',
            config: {
              type: 'SelectControl',
              label: t('Label Type'),
              default: EchartsHeatmapLabelTypeType.KeyPercent,
              renderTrigger: true,
              clearable: false,
              choices: [
                [EchartsHeatmapLabelTypeType.Key, t('Category Name')],
                [EchartsHeatmapLabelTypeType.Value, t('Value')],
                [EchartsHeatmapLabelTypeType.Percent, t('Percentage')],
                [EchartsHeatmapLabelTypeType.KeyValue, t('Category and Value')],
                [
                  EchartsHeatmapLabelTypeType.KeyPercent,
                  t('Category and Percentage'),
                ],
                [
                  EchartsHeatmapLabelTypeType.KeyValuePercent,
                  t('Category, Value and Percentage'),
                ],
              ],
              description: t('What should be shown on the label?'),
            },
          },
        ],
        [
          {
            name: 'show_values',
            config: {
              type: 'CheckboxControl',
              label: t('Show Values'),
              renderTrigger: true,
              default: false,
              description: t(
                'Whether to display the numerical values within the cells',
              ),
            },
          },
        ],
        [
          {
            name: 'show_Xaxis_label',
            config: {
              type: 'CheckboxControl',
              label: t('Show X axis label'),
              renderTrigger: true,
              default: true,
            },
          },
        ],
        [
          {
            name: 'show_Yaxis_label',
            config: {
              type: 'CheckboxControl',
              label: t('Show Y axis label'),
              renderTrigger: true,
              default: true,
            },
          },
        ],
        [
          {
            name: 'show_Xaxis_splitlines',
            config: {
              type: 'CheckboxControl',
              label: t('Show X axis splitlines'),
              renderTrigger: true,
              default: true,
            },
          },
        ],
        [
          {
            name: 'show_Yaxis_splitlines',
            config: {
              type: 'CheckboxControl',
              label: t('Show Y axis splitlines'),
              renderTrigger: true,
              default: true,
            },
          },
        ],
        [
          {
            name: 'show_Y_name',
            config: {
              type: 'CheckboxControl',
              label: t('Show Y axis name'),
              renderTrigger: true,
              default: true,
            },
          },
        ],
        [
          {
            name: 'show_X_name',
            config: {
              type: 'CheckboxControl',
              label: t('Show X axis name'),
              renderTrigger: true,
              default: true,
            },
          },
        ],

      ],
    },
  ],
};

export default config;
