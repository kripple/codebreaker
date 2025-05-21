export const env = import.meta.env.MODE;
export const dev = env === 'development';
export const test = env === 'test';
