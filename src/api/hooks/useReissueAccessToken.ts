import { useQuery } from '@tanstack/react-query';

import { baseURL, fetchWithToken } from '@/api/instance';
import { authLocalStorage } from '@/utils/storage';

export const getReissueTokenPath = () => `${baseURL}/auth/access-token`;

export const reissueAccessToken = async () => {
  const response = await fetchWithToken.get(getReissueTokenPath(), {
    withCredentials: true,
  });
  console.log('reissueAccessToken 의 response', response);
  console.log('reissueAccessToken 의 response.status', response.status);

  console.log(`조건문 : ${+response.status !== 200} `);
  console.log(`response.headers : ${response.headers}`);
  console.log(`response.headers.Authorization : ${response.headers.Authorization}`);

  if (response.status !== 200) {
    console.error('토큰 재발급 실패', response);
    throw new Error('Failed to reissue access');
  }

  console.log('토큰 재발급 성공:', response.headers);
  const newAccessToken = response.headers.Authorization?.replace('Bearer ', '');
  // TODO: Remove console.log
  console.log('useReissueAccessToken 의 newAccessToken', newAccessToken);
  authLocalStorage.set(newAccessToken);
  // TODO: Remove console.log
  console.log(
    'useReissueAccessToken 의 newAccessToken이 저장된 것을 가져옴.',
    authLocalStorage.get(),
  );
  return newAccessToken;
};

export const useReissueAccessToken = () => {
  return useQuery({
    queryKey: ['reissueToken'],
    queryFn: reissueAccessToken,
    enabled: false,
  });
};
