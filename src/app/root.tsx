// import type { StartOptions } from 'msw/browser';
import { createRoot } from 'react-dom/client';

import { App } from '@/app/components/App';

import '@/app/root.css';

const root = createRoot(document.getElementById('root') as HTMLElement);

async function enableMocking() {
  // if (!import.meta.env.DEV) return;

  // const workerStartOptions: StartOptions = {
  //   onUnhandledRequest: 'error',
  //   serviceWorker: {
  //     url: './mockServiceWorker.js',
  //   },
  // };

  // const { worker } = await import('@/app/mocks/worker');
  // return worker.start(workerStartOptions);
}

enableMocking().then(() => {
  root.render(<App />);
});
