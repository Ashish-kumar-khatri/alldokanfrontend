const isProduction = process.env.REACT_APP_PRODUCTION;
const urlConfig = {
  // dev: 'http://127.0.0.1:8000',
  dev: 'http://192.168.1.80:8000',
  prod: 'https://alldokan.cyclic.app',
};

const baseURL = (isProduction ? urlConfig.dev : urlConfig.prod);
// const baseURL = (urlConfig.prod);

export default baseURL;