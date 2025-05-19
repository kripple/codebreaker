export const env = import.meta.env.MODE;
export const branch = import.meta.env.GIT_BRANCH;
export const version = import.meta.env.APP_VERSION;

export const dev = env === 'development';
export const test = env === 'test';
