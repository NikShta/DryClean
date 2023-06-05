export type TUserInfo = {
  id: '';
  uid: string;
  login: string;
  password: string;
  firstName: string;
  lastName: string;
  deposit: number;
  isAdmin: boolean;
};

export enum EActionTypes {
  SET_USER_INFO = 'SET_USER_INFO',
  REMOVE_USER_NFO = 'REMOVE_USER_NFO',
  CHANGE_DEPOSIT = 'CHANGE_DEPOSIT',
}

export type TAction<T = undefined> = {
  type: EActionTypes;
  payload?: T;
};
