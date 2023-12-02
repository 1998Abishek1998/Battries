import request from '../utils/apiRequest';

const API_URL = import.meta.env.VITE_API_URL;

export const getBattries = (filter, data) => {
  return request(
    'POST',
    `${API_URL}/api/battries`,
    data,
    filter
  );
};
