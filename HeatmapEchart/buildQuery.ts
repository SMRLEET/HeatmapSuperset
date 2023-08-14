import {
  buildQueryContext,
  QueryFormData,
  QueryFormOrderBy,
} from '@superset-ui/core';

function getSortExpression(metric: string, sort_by: string): QueryFormOrderBy {
  if (sort_by.includes('alpha_asc')) return [metric, true];
  return [metric, false];
}

export default function buildQuery(formData: QueryFormData) {
  const {
    column_x,
    column_y,
    sort_by_metrics,
    metric,
    sort_x_axis,
    sort_y_axis,
  } = formData;

  const order_by: QueryFormOrderBy[] = [];
  if (sort_by_metrics !== 'no_sort')
    order_by.push(getSortExpression(metric, sort_by_metrics));
  if (sort_x_axis !== 'no_sort')
    order_by.push(getSortExpression(column_x, sort_x_axis));
  if (sort_y_axis !== 'no_sort')
    order_by.push(getSortExpression(column_y, sort_y_axis));

  return buildQueryContext(formData, baseQueryObject => [
    {
      ...baseQueryObject,
      columns: [column_x, column_y],
      ...(order_by.length > 0 && { orderby: order_by }),
    },
  ]);
}
