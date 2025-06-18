interface LoginCredentials {
  email: string;
  password: string;
}

interface DriverData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  vehicleType: string;
  licenseNumber: string;
}

export const driverAuth = {
  login: async (credentials: LoginCredentials) => {
    // Replace with your actual API call
    const response = await fetch('/api/driver/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const data = await response.json();
    localStorage.setItem('driverToken', data.token);
    return data;
  },

  register: async (driverData: DriverData) => {
    // Replace with your actual API call
    const response = await fetch('/api/driver/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(driverData),
    });

    if (!response.ok) {
      throw new Error('Registration failed');
    }

    return response.json();
  }
};