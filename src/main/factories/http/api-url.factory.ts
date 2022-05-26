import { API_URL } from 'react-native-dotenv';
export const makeApiUrl = (path: string): string => `${API_URL}${path}`;
