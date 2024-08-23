import { Android, Computer, Phishing } from '@mui/icons-material';

export const ROUTES = {
  GPUs: { route: '/', icon: <Computer /> },
  Shrek: { route: '/shrek', icon: <Android /> },
  Hooks: { route: '/hooks', icon: <Phishing /> },
};

export const DRAWER_WIDTH = 240;

export const API_ROUTE = 'http://localhost:3000';

export const MANUFACTURERS = ['AMD', 'NVIDIA', 'Intel'];
export type Manufacturers = (typeof MANUFACTURERS)[number];
