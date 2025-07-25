import { ViteReactSSG } from 'vite-react-ssg/single-page';
import App from './App.tsx';
import './index.css';

import { StaticRouter } from 'react-router-dom/server';

export const createRoot = ViteReactSSG(
  <App Router={StaticRouter} routerProps={{ location: '/' }} />
);
