import {EActionTypes, TAction} from './types';

export const logIn = (): TAction => ({type: EActionTypes.LOGIN});

export const logOut = (): TAction => ({type: EActionTypes.LOGOUT});

export const setLoading = (flag: boolean): TAction<boolean> => ({
  type: EActionTypes.SET_LOADING,
  payload: flag,
});
