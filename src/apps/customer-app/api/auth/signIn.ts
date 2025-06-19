import apiClient from '../client';

export default async function signIn(email: string, password: string) {
  const response = await apiClient.post('/auth/login-account', {
    email,
    password
  });
  return response.data;
}