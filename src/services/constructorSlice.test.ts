import {
  constructorReducer,
  setBun,
  addIngredient,
  removeIngredient,
  clearConstructor,
  moveIngredient,
} from './constructorSlice';

import type { TConstructorIngredient } from '@/utils/types';

describe('Тестирование constructorReducer', function () {
  const mockBun: TConstructorIngredient = {
    _id: '123',
    id: 'bun-1',
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
  const firstIngredient: TConstructorIngredient = {
    ...mockBun,
    id: 'ingredient-1',
    type: 'main',
  };
  const secondIngredient: TConstructorIngredient = {
    ...mockBun,
    id: 'ingredient-2',
    type: 'sauce',
  };
  test('Проверка неизвестного экшена', function () {
    const result = constructorReducer(undefined, { type: 'UNKNOWN' });
    expect(result).toEqual({
      bun: null,
      ingredients: [],
    });
  });
  test('Проверка замены булки', function () {
    const secondBun = { ...mockBun, _id: '121', id: 'bun-2' };
    const filledState = { bun: mockBun, ingredients: [] };
    const result = constructorReducer(filledState, setBun(secondBun));
    expect(result).toEqual({ bun: secondBun, ingredients: [] });
  });
  test('Проверка добавления начинки', function () {
    const filledState = { bun: null, ingredients: [firstIngredient] };
    const result = constructorReducer(filledState, addIngredient(secondIngredient));
    expect(result).toEqual({
      bun: null,
      ingredients: [firstIngredient, secondIngredient],
    });
  });
  test('Проверка удаления начинки', function () {
    const filledState = { bun: null, ingredients: [firstIngredient, secondIngredient] };
    const result = constructorReducer(
      filledState,
      removeIngredient(secondIngredient.id)
    );
    expect(result).toEqual({ bun: null, ingredients: [firstIngredient] });
  });
  test('Проверка очистки конструктора', function () {
    const filledState = {
      bun: mockBun,
      ingredients: [firstIngredient],
    };
    const result = constructorReducer(filledState, clearConstructor());
    expect(result).toEqual({ bun: null, ingredients: [] });
  });
  test('Проверка перемещения начинки вверх', function () {
    const filledState = { bun: null, ingredients: [firstIngredient, secondIngredient] };
    const result = constructorReducer(
      filledState,
      moveIngredient({ id: secondIngredient.id, direction: 'up' })
    );
    expect(result).toEqual({
      bun: null,
      ingredients: [secondIngredient, firstIngredient],
    });
  });
  test('Проверка перемещения начинки вниз', function () {
    const filledState = { bun: null, ingredients: [firstIngredient, secondIngredient] };
    const result = constructorReducer(
      filledState,
      moveIngredient({ id: firstIngredient.id, direction: 'down' })
    );
    expect(result).toEqual({
      bun: null,
      ingredients: [secondIngredient, firstIngredient],
    });
  });
  test('Проверка невозможности перемещения первого ингредиента вверх', function () {
    const filledState = { bun: null, ingredients: [firstIngredient, secondIngredient] };
    const result = constructorReducer(
      filledState,
      moveIngredient({ id: firstIngredient.id, direction: 'up' })
    );
    expect(result).toEqual({
      bun: null,
      ingredients: [firstIngredient, secondIngredient],
    });
  });
  test('Проверка невозможности перемещения последнего ингредиента вниз', function () {
    const filledState = { bun: null, ingredients: [firstIngredient, secondIngredient] };
    const result = constructorReducer(
      filledState,
      moveIngredient({ id: secondIngredient.id, direction: 'down' })
    );
    expect(result).toEqual({
      bun: null,
      ingredients: [firstIngredient, secondIngredient],
    });
  });
  test('Проверка отсутствия перемещения при несуществующем id', function () {
    const filledState = { bun: null, ingredients: [firstIngredient, secondIngredient] };
    const result = constructorReducer(
      filledState,
      moveIngredient({ id: 'ingredient-3', direction: 'up' })
    );
    expect(result).toEqual({
      bun: null,
      ingredients: [firstIngredient, secondIngredient],
    });
  });
});
