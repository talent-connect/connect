export const API_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://connect-api.redi-school.org/api'
    : 'http://127.0.0.1:3003/api';
