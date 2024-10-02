import { isAxiosError } from 'axios';
import { api } from '..';

export const getNearestRestaurants = async (
  latitude: number,
  longitude: number,
  maxDistance: number = 3000
): Promise<[Record<string, unknown> | null, string | null]> => {
  try {
    const response = await api.get('/restaurant', {
      params: { latitude, longitude, maxDistance },
    });
    return [response.data?.data, null];
  } catch (err) {
    if (isAxiosError(err)) {
      return [null, err.response?.data?.err];
    }
  }
  return [null, null];
};

export const getRestaurantById = async (
  id: string
): Promise<[Record<string, unknown> | null, string | null]> => {
  try {
    const response = await api.get('/restaurant/' + id);
    return [response.data?.data, null];
  } catch (err) {
    if (isAxiosError(err)) {
      return [null, err.response?.data?.err];
    }
  }
  return [null, null];
};
