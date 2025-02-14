import { useMutation, useQueryClient } from '@tanstack/react-query';

import { baseURL, fetchWithToken } from '@/api/instance';
import type { Food } from '@/types';

export const getAddNonPreferenceFoodPath = () => `${baseURL}/non-preferences`;

const addNonPreferenceFood = async (food: Food) => {
  const response = await fetchWithToken.post(getAddNonPreferenceFoodPath(), {
    foodId: food.foodId,
  });
  return response.data;
};

export const useAddNonPreferenceFood = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addNonPreferenceFood,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['nonPreferenceFoods'] });
    },
  });
};
