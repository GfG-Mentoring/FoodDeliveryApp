import { isAxiosError } from 'axios';
import { api } from '..';

export const loginApi = async (
  email: string,
  password: string
): Promise<
  [Record<'token' | 'email' | 'id' | 'fullName', string> | null, string | null]
> => {
  try {
    const response = await api.post('/auth/login', {
      email,
      password,
    });
    return [response.data.data, null];
  } catch (err) {
    if (isAxiosError(err)) {
      return [null, err.response?.data.err];
    }
  }
  return [null, null];
};
