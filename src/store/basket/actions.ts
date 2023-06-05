import {
  EActionTypes,
  TActionType,
  TChangeItemCount,
  TServiceObject,
} from './types';

export const addService = (
  service: TServiceObject,
): TActionType<TServiceObject> => ({
  type: EActionTypes.ADD_SERVICE,
  payload: service,
});

export const clearBasket = (): TActionType => ({
  type: EActionTypes.CLEAR_BASKET,
});

export const incrementItem = (
  fieldsInfo: TChangeItemCount,
): TActionType<TChangeItemCount> => ({
  type: EActionTypes.INCREMENT_ITEM,
  payload: fieldsInfo,
});

export const decrementItem = (
  fieldsInfo: TChangeItemCount,
): TActionType<TChangeItemCount> => ({
  type: EActionTypes.DECREMENT_ITEM,
  payload: fieldsInfo,
});
