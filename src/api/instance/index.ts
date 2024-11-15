import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import axios from 'axios';

import { RouterPath } from '@/routes/path';
import { authLocalStorage } from '@/utils/storage';

export const baseURL = process.env.REACT_APP_BASE_URL;

const initInstance = (config: AxiosRequestConfig): AxiosInstance => {
  const instance = axios.create({
    timeout: 5000,
    ...config,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...config.headers,
    },
  });

  return instance;
};

export const fetchInstance = initInstance({
  baseURL,
  withCredentials: true,
});

fetchInstance.interceptors.response.use((config) => {
  const newToken = config.headers.authorization?.replace('Bearer ', '');

  if (newToken) authLocalStorage.set(newToken);
  return config;
});

const getAccessToken = () => authLocalStorage.get();
export const fetchWithToken = initInstance({
  baseURL,
  headers: {
    Authorization: `Bearer ${getAccessToken()}`,
  },
});

const reissueAccessToken = async () => {
  try {
    const response = await axios.get(`${baseURL}/auth/access-token`, {
      withCredentials: true,
    });
    if (response.status === 200) {
      const newAccessToken = response.headers.Authorization?.replace('Bearer ', '');
      if (newAccessToken) {
        authLocalStorage.set(newAccessToken);
        return newAccessToken;
      }
    }
    throw new Error('Access token is missing in response');
  } catch (error) {
    throw new Error('Failed to reissue access token');
  }
};

fetchWithToken.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

fetchWithToken.interceptors.response.use(
  function (response) {
    return response.data;
  },
  async function (error) {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401) {
      console.warn('401 Unauthorized: Access token expired or invalid');

      try {
        const newAccessToken = await reissueAccessToken();
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return await fetchWithToken(originalRequest);
      } catch (refreshError) {
        console.error('토큰 재발급 실패:', refreshError);
        window.location.href = `${RouterPath.login}`;
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export const kakaoBaseURL = 'https://dapi.kakao.com';
export const KAKAO_API_KEY = process.env.REACT_APP_KAKAO_API_KEY;

export const kakaoAPI = initInstance({
  baseURL: kakaoBaseURL,
  headers: {
    Authorization: `KakaoAK ${KAKAO_API_KEY}`,
  },
});
