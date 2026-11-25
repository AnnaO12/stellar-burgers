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
  test('Проверка добавления булки', function () {
    const result = constructorReducer(undefined, setBun(mockBun));
    expect(result).toEqual({ bun: mockBun, ingredients: [] });
  });
  test('Проверка добавления начинки', function () {
    const mockIngredient: TConstructorIngredient = {
      _id: '123',
      id: 'ingredient-1',
      name: 'test product',
      type: 'main',
      proteins: 123,
      fat: 123,
      carbohydrates: 123,
      calories: 123,
      price: 123,
      image: 'image',
      image_large: 'image_large',
      image_mobile: 'image_mobile',
    };
    const result = constructorReducer(undefined, addIngredient(mockIngredient));
    expect(result).toEqual({ bun: null, ingredients: [mockIngredient] });
  });
  test('Проверка удаления начинки', function () {
    const mockIngredient: TConstructorIngredient = {
      _id: '123',
      id: 'ingredient-1',
      name: 'test - product',
      type: 'main',
      proteins: 123,
      fat: 123,
      carbohydrates: 123,
      calories: 123,
      price: 123,
      image: 'image',
      image_large: 'image_large',
      image_mobile: 'image_mobile',
    };
    const secondIngredient: TConstructorIngredient = {
      ...mockIngredient,
      _id: '124',
      id: 'ingredient-2',
      name: 'test-product-2',
      type: 'sauce',
    };
    const filledState = { bun: null, ingredients: [mockIngredient, secondIngredient] };
    const result = constructorReducer(filledState, removeIngredient(mockIngredient.id));
    expect(result).toEqual({ bun: null, ingredients: [secondIngredient] });
  });
  test('Проверка очистки конструктора', function () {
    const filledState = {
      bun: mockBun,
      ingredients: [{ ...mockBun, id: 'ingredients', type: 'main' }],
    };
    const result = constructorReducer(filledState, clearConstructor());
    expect(result).toEqual({ bun: null, ingredients: [] });
  });
  test('Проверка перемещение начинки вверх', function () {
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
