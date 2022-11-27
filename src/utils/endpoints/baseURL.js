const isDev = false;
const urlConfig = {
  dev: 'http://127.0.0.1:3001',
  prod: 'https://alldokan.cyclic.app',
};
const fetchBaseURL = () => (isDev ? urlConfig.dev : urlConfig.prod);

export default fetchBaseURL;
