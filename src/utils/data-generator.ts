import { generateRandomString, generateRandomEmail } from './helpers';

export interface TestUser {
  username: string;
  password: string;
  email: string;
}

export interface TestFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

export function generateUser(overrides?: Partial<TestUser>): TestUser {
  return {
    username: `user_${generateRandomString(6)}`,
    password: `Pass_${generateRandomString(10)}!`,
    email: generateRandomEmail(),
    ...overrides,
  };
}

export function generateFormData(overrides?: Partial<TestFormData>): TestFormData {
  return {
    firstName: `FirstName_${generateRandomString(5)}`,
    lastName: `LastName_${generateRandomString(5)}`,
    email: generateRandomEmail(),
    phone: `+1${Math.floor(Math.random() * 9000000000) + 1000000000}`,
    message: `Test message ${generateRandomString(20)}`,
    ...overrides,
  };
}
