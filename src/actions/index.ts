import { createAction } from '@reduxjs/toolkit';
import ActionType from '../constants/actionType';
import { CartItem } from '../types';

export const startLoading = createAction(ActionType.START_LOADING);

export const endLoading = createAction(ActionType.END_LOADING);

export const throwError = createAction(ActionType.THROW_ERROR);

export const clearError = createAction(ActionType.CLEAR_ERROR);

export const getCart = createAction(ActionType.GET_CART);

export const addToCart = createAction<CartItem>(ActionType.ADD_TO_CART);

export const removeFromCart = createAction<{ id: number, isAll?: boolean }>(ActionType.REMOVE_FROM_CART);
