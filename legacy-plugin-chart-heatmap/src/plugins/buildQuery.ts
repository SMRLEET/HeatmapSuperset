import { buildQueryContext, QueryFormData, QueryFormOrderBy } from '@superset-ui/core';

export default function buildQuery(formData: QueryFormData) {

  const { 
    all_columns_x, 
    all_columns_y, 
    sort_by_metrics, 
    metric, 
    sort_x_axis, 
    sort_y_axis } = formData;

  const order_by: QueryFormOrderBy[] = [];
  if (sort_by_metrics != 'no_sort')
    order_by.push(getSortExpression(metric, sort_by_metrics));
  if (sort_x_axis != 'no_sort')
    order_by.push(getSortExpression(all_columns_x, sort_x_axis));
  if (sort_y_axis != 'no_sort')
    order_by.push(getSortExpression(all_columns_y, sort_y_axis));
     
  return buildQueryContext(formData, baseQueryObject => {
    return [
      {
        ...baseQueryObject,
        columns: [all_columns_x,
          all_columns_y],
          ...(order_by.length > 0 && { orderby: order_by })
      },
    ]
  });
}

function getSortExpression(metric: string, sort_by: string): QueryFormOrderBy {
  if (sort_by.includes('alpha_asc'))
    return [metric, true];
  else
    return [metric, false];
}

