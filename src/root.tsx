import { createRoot } from 'react-dom/client';

import { App } from '@/app/components/App';

import '@/root.css';

createRoot(document.getElementById('root') as HTMLElement).render(<App />);
