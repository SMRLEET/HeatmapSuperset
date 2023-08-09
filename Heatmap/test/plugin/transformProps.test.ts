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
import { ChartProps, supersetTheme } from '@superset-ui/core';
import transformProps from '../../src/plugin/transformProps';

describe('Heatmap transformProps', () => {
  const formData = {
    "datasource": "7__table",
    "vizType": "heatmap",
    "sliceId": 219,
    "urlParams": {
      "form_data_key": "9yOaob-XnUpmwVZpwYfoJG4JHJT4lCjjVk-lTwqj05MkbaKCDhfcjVszdCh2XxG4",
      "slice_id": "219"
    },
    "allColumnsX": "ARRIVAL_TIME",
    "allColumnsY": "ARRIVAL_DELAY",
    "metric": {
      "aggregate": "SUM",
      "column": {
        "advanced_data_type": null,
        "certification_details": null,
        "certified_by": null,
        "column_name": "DISTANCE",
        "description": null,
        "expression": "",
        "filterable": true,
        "groupby": true,
        "id": 389,
        "is_certified": false,
        "is_dttm": false,
        "python_date_format": null,
        "type": "BIGINT",
        "type_generic": 0,
        "verbose_name": null,
        "warning_markdown": null
      },
      "datasourceWarning": false,
      "expressionType": "SIMPLE",
      "hasCustomLabel": false,
      "label": "SUM(DISTANCE)",
      "optionName": "metric_i8bw4aa376f_0zikstvj0gp",
      "sqlExpression": null
    },
    "sortByMetrics": "no_sort",
    "sortXAxis": "no_sort",
    "sortYAxis": "no_sort",
    "adhocFilters": [
      {
        "clause": "WHERE",
        "comparator": null,
        "datasourceWarning": false,
        "expressionType": "SQL",
        "filterOptionName": "filter_jza0j8sqa6l_01ru87ir7r7k",
        "isExtra": false,
        "isNew": false,
        "operator": null,
        "sqlExpression": "(\"ARRIVAL_DELAY\") >0",
        "subject": null
      },
      {
        "clause": "WHERE",
        "comparator": "No filter",
        "expressionType": "SIMPLE",
        "operator": "TEMPORAL_RANGE",
        "subject": "ds"
      }
    ],
    "rowLimit": 10,
    "linearColorScheme": "superset_seq_1",
    "leftMargin": "auto",
    "rightMargin": "auto",
    "topMargin": "auto",
    "visualMapPosition": 3,
    "dateFormat": "smart_date",
    "numberFormat": "SMART_NUMBER",
    "showPerc": true,
    "labelType": 3,
    "showXaxisLabel": true,
    "showYaxisLabel": true,
    "showXaxisSplitlines": true,
    "showYaxisSplitlines": true,
    "showYName": true,
    "showXName": true,
    "extraFormData": {}
  }
  const chartProps = {
    formData,
    width: 800,
    height: 600,
    queriesData: [{
      data: [{ name: 'Hulk', sum__num: 1 }],
    }],
  };

  it('should transform chart props for viz', () => {
    expect(transformProps(chartProps)).toEqual({
      width: 800,
      height: 600,
      boldText: true,
      headerFontSize: 'xs',
      headerText: 'my text',
      data: [{ name: 'Hulk', sum__num: 1 }],
    });
  });
});
