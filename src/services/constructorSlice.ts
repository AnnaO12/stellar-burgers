import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { TConstructorIngredient, TConstructorState } from '@/utils/types';

const initialState: TConstructorState = {
  bun: null,
  ingredients: [],
};

const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    setBun(state, action: PayloadAction<TConstructorIngredient>) {
      state.bun = action.payload;
    },
    addIngredient(state, action: PayloadAction<TConstructorIngredient>) {
      state.ingredients.push(action.payload);
    },
    removeIngredient(state, action: PayloadAction<string>) {
      state.ingredients = state.ingredients.filter(function (ingredient) {
        return ingredient.id !== action.payload;
      });
    },
    clearConstructor(state) {
      state.bun = null;
      state.ingredients = [];
    },
    moveIngredient(
      state,
      action: PayloadAction<{ id: string; direction: 'up' | 'down' }>
    ) {
      const index = state.ingredients.findIndex(function (ingredient) {
        return ingredient.id === action.payload.id;
      });
      if (index === -1) {
        return;
      }
      let newIndex: number;
      if (action.payload.direction === 'up') {
        newIndex = index - 1;
      } else {
        newIndex = index + 1;
      }
      if (newIndex < 0 || newIndex >= state.ingredients.length) {
        return;
      }
      const temp = state.ingredients[index];
      state.ingredients[index] = state.ingredients[newIndex];
      state.ingredients[newIndex] = temp;
    },
  },
});

export const constructorReducer = constructorSlice.reducer;
export const {
  setBun,
  addIngredient,
  removeIngredient,
  clearConstructor,
  moveIngredient,
} = constructorSlice.actions;
