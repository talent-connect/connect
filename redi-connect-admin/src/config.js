function buildApiUrl(env) {
  switch (env) {
    case 'production':
      return 'https://connect-api.redi-school.org/api';

    case 'demonstration':
      return 'https://api.demo.connect.redi-school.org/api';

    default:
    case 'development':
    case 'dev':
      return 'http://127.0.0.1:3003/api';
  }
}

export const API_URL = buildApiUrl(process.env.NODE_ENV);
