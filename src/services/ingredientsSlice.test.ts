import { ingredientsReducer, getIngredients } from './ingredientsSlice';

import type { TIngredient } from '@/utils/types';

describe('Тестирование ingredientsReducer', function () {
  test('Возвращает начальное состояние при неизвестном экшене', function () {
    const result = ingredientsReducer(undefined, { type: 'UNKNOWN' });
    expect(result).toEqual({
      ingredients: [],
      isLoading: false,
      error: null,
    });
  });
  test('Устанавливает состояние загрузки getIngredients.pending', function () {
    const result = ingredientsReducer(undefined, { type: getIngredients.pending.type });
    expect(result).toEqual({
      ingredients: [],
      isLoading: true,
      error: null,
    });
  });
  test('Сохраняет ингредиенты при getIngredients.fulfilled', function () {
    const mockIngredient: TIngredient = {
      _id: '123',
      name: 'test product',
      type: 'bun',
      proteins: 123,
      fat: 123,
      carbohydrates: 123,
      calories: 123,
      price: 123,
      image: 'image',
      image_large: 'image_large',
      image_mobile: 'image_mobile',
    };
    const result = ingredientsReducer(undefined, {
      type: getIngredients.fulfilled.type,
      payload: [mockIngredient],
    });
    expect(result).toEqual({
      ingredients: [mockIngredient],
      isLoading: false,
      error: null,
    });
  });
  test('Сохраняет ошибку при getIngredients.rejected', function () {
    const mockError = { message: 'Ошибка загрузки ингредиентов' };
    const loadingState = {
      ingredients: [],
      isLoading: true,
      error: null,
    };
    const result = ingredientsReducer(loadingState, {
      type: getIngredients.rejected.type,
      error: mockError,
    });
    expect(result).toEqual({
      ingredients: [],
      isLoading: false,
      error: mockError,
    });
  });
});
