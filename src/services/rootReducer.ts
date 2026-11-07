import { combineReducers } from '@reduxjs/toolkit';

import { constructorReducer } from './constructorSlice';
import { feedReducer } from './feedSlice';
import { historyReducer } from './historySlice';
import { ingredientsReducer } from './ingredientsSlice';
import { orderDetailsReducer } from './orderDetailsSlice';
import { orderReducer } from './orderSlice';
import { userReducer } from './userSlice';

export const rootReducer = combineReducers({
  user: userReducer,
  ingredients: ingredientsReducer,
  burgerConstructor: constructorReducer,
  order: orderReducer,
  feed: feedReducer,
  history: historyReducer,
  orderDetails: orderDetailsReducer,
});
