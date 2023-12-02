export interface Pagination<T> {
  data: Array<T>;
  meta: {
    total: number;
    offset: number;
    limit: number;
  };
}

export interface PaginationFilter {
  limit?: number;
  offset?: number;
}

export const paginateResponse = <T>(records: T[], offset: number, limit: number, total: number): Pagination<T> => {
  return {
    data: records,
    meta: {
      limit: Number(limit),
      total: Number(total),
      offset: Number(offset),
    },
  };
};

export const filters = {
  limit: 20,
  offset: 1,
}; 
