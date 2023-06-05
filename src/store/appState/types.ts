export enum EActionTypes {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  SET_LOADING = 'SET_LOADING',
}

export type TAppState = {
  isAuth: boolean;
  isLoading: boolean;
};

export type TAction<T = undefined> = {
  type: EActionTypes;
  payload?: T;
};
