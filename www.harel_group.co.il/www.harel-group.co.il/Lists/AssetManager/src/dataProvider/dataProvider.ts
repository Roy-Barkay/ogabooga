import * as axios from 'axios';

export const dataProvider = <T>(url: string): Promise<T> => {
  return axios.default.get<any>(url).then((response) => response.data);
};
