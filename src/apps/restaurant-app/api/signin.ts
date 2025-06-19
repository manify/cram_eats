export default async function signin(email: string, password: string) {
  const response = await fetch('http://localhost:3001/crameats/login-restaurant-account', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) {
    throw new Error('Login failed');
  }
  return response.json();
}