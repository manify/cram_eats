import apiClient from '../client';

export default async function signUp(firstName: string, lastName: string, email: string, password: string, role: string) {
  const response = await apiClient.post('/auth/create-account', {
    firstName,
    lastName,
    email,
    password,
    role
  });
  return response.data;
}
