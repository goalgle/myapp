import axios from 'axios';
import Cookies from 'js-cookie';
import {isEmpty, isUndefined} from 'lodash';

export const apiUrl = process.env.HOSTURL;
export const imgUrl = process.env.IMGURL;
export const imgUrls = process.env.IMGURLS;
export const frontUrl = process.env.FRONT_URL;
export const isProd = process.env.NODE_ENV === 'production';

// axios default setting
// const globalThis = require('globalthis')();
// const protocol = globalThis?.window?.location?.protocol;
// const type = protocol != undefined ? protocol.indexOf('http') : 0;

// axios.defaults.baseURL = type != -1 ? apiUrl : apiUrl.replace('http', 'https');
// axios.defaults.withCredentials = false; //isProd;
// axios.defaults.headers['Cache-Control'] = 'public, no-cache, must-revalidate, max-age=300';

axios.interceptors.request.use(
  config => {
    // console.log('config ::::::::::::: ', config);
    // const accessToken = config.headers.get.Cookie?.accessToken ?? Cookies?.get('accessToken');
    console.log('axios.interceptors.request : ', config);
    if (
      // except URL ex: www.juso.go.kr/addrlink/addrLinkApi.do , appleid.apple.com/auth/token
      config.url === 'https://www.naver.com'
    ) {
      // console.log();
    } else {
      // config.headers.authorization = accessToken ?? 'nologin';
    }
    return config;
  },
  error => Promise.reject(error)
);

axios.interceptors.response.use(
  response => {
    console.log('axios.interceptors.response : ', response);
    // let returnCd = '';
    // if (response && response.data && response.data.statusinfo) {
    //   returnCd = response.data.statusinfo.Returncd
    //     ? response.data.statusinfo.Returncd
    //     : response.data.statusinfo.returncd;
    // }
    // if (isEmpty(returnCd) || isUndefined(returnCd) || returnCd === 'SYS9999') {
    //   return response;
    // }
    return response;
  },
  error =>
    // Do something with response error
    Promise.reject(error)
);

export function getConfig(isWait = true, accessToken = '', tokenflag = true) {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: 120000,
  };

  if (isWait === true) {
    // console.log(isWait);
  }

  if (tokenflag) {
    // console.log('config>tokenflag=%o, accessToken=%o, Cookies?.get(accessToken)=%o ', tokenflag, accessToken, Cookies?.get('accessToken'));
    if (accessToken) {
      config.headers.authorization = accessToken ?? null;
    } else {
      config.headers.authorization = Cookies?.get('accessToken') ?? null;
    }
  }

  return config;
}

export function toggleWait() {
  // console.log('toggleWait');
}

export function aixosUpFile(url, data, isWait = false) {
  const con = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    timeout: 120000,
  };

  return new Promise((resolve, reject) => {
    axios
      .post(url, data, getConfig(isWait))
      .then(response => {
        toggleWait();
        resolve(response);
      })
      .catch(err => {
        toggleWait();
        reject(err);
      });
  });
}

export function axiosDown(url, isWait = false) {
  const option = getConfig(isWait);

  return new Promise((resolve, reject) => {
    const urlOpt = {
      url,
      method: 'GET',
      responseType: 'blob', // important
    };

    axios(urlOpt, option)
      .then(response => {
        toggleWait();
        resolve(response);
      })
      .catch(err => {
        toggleWait();
        reject(err);
      });
  });
}

export function axiosGet(
  url,
  isWait = false,
  cancelToken = null,
  tokenflag = true
) {
  const option = getConfig(isWait, '', tokenflag);
  option.cancelToken = cancelToken;

  // console.log(url);
  // console.log(option);

  return new Promise((resolve, reject) => {
    axios
      .get(url)
      // .get(url, option)
      .then(response => {
        toggleWait();
        resolve(response);
      })
      .catch(err => {
        toggleWait();
        reject(err);
      });
  });
}

export async function axiosGetSync(url, isWait = false, cancelToken = null) {
  let res = null;

  const option = getConfig(isWait);
  option.cancelToken = cancelToken;

  try {
    // res = await axios.get(url, option);
    res = await axios.get(url);
  } catch (err) {
    return err;
  }

  toggleWait();
  return res;
}

export function axiosDelete(url, params, isWait = true) {
  return new Promise((resolve, reject) => {
    axios
      .delete(url, params, getConfig(isWait))
      .then(response => {
        toggleWait();
        resolve(response);
      })
      .catch(err => {
        toggleWait();
        reject(err);
      });
  });
}

export function axiosPost(url, data, tokenflag, refreshToken = '') {
  return new Promise((resolve, reject) => {
    axios
      .post(url, data, getConfig(true, refreshToken, tokenflag))
      .then(response => {
        toggleWait();
        resolve(response);
      })
      .catch(err => {
        toggleWait();
        reject(err);
      });
  });
}

export async function axiosPostSync(
  url,
  data,
  isWait = true,
  cancelToken = null
) {
  let res = null;

  const option = getConfig(isWait);
  option.cancelToken = cancelToken;

  try {
    res = await axios.post(url, data, option);
  } catch (err) {
    return err;
  }
  toggleWait();

  return res;
}

export function axiosPut(url, data) {
  return new Promise((resolve, reject) => {
    axios
      .put(url, data, getConfig())
      .then(response => {
        toggleWait();
        resolve(response);
      })
      .catch(err => {
        toggleWait();
        reject(err);
      });
  });
}

export function axiosGetJson(url, jsonData) {
  const accessToken = Cookies.get('accessToken');
  const option = {
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: 120000,
    params: jsonData,
  };

  // console.log(accessToken);

  if (accessToken) {
    option.headers.authorization = accessToken;
  }

  return new Promise((resolve, reject) => {
    axios
      .get(url, option)
      .then(response => {
        resolve(response);
      })
      .catch(err => {
        reject(err);
      });
  });
}

export function aixosGetCert(url) {
  const option = {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  };

  return new Promise((resolve, reject) => {
    axios
      .get(url, option)
      .then(response => {
        toggleWait();
        resolve(response);
      })
      .catch(err => {
        toggleWait();
        reject(err);
      });
  });
}
