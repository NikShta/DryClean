import {EActionTypes, TAction, TUserInfo} from './types';

export const setUSerInfo = (payload: TUserInfo): TAction<TUserInfo> => ({
  type: EActionTypes.SET_USER_INFO,
  payload,
});

export const removeUserInfo = (): TAction => ({
  type: EActionTypes.REMOVE_USER_NFO,
});

export const changeDeposit = (payload: number): TAction<number> => ({
  type: EActionTypes.CHANGE_DEPOSIT,
  payload,
});
