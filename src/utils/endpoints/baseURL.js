const isDev = true;
const urlConfig = {
  // dev: 'http://127.0.0.1:8000',
  dev: 'http://192.168.1.80:8000',
  // prod: 'https://alldokan.cyclic.app',
};
const fetchBaseURL = () => (isDev ? urlConfig.dev : urlConfig.prod);

export default fetchBaseURL;
