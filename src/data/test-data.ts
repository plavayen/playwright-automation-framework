export const TestData = {
  credentials: {
    default: {
      username: process.env.USERNAME || 'testuser',
      password: process.env.PASSWORD || 'testpass',
    },
  },
  urls: {
    home: '/',
  },
  messages: {
    requiredField: 'This field is required',
    invalidCredentials: 'Invalid username or password',
  },
  timeouts: {
    short: 3_000,
    medium: 10_000,
    long: 30_000,
  },
} as const;
