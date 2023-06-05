import {EActionTypes, TAction, TUserInfo} from './types';

const initialState: TUserInfo = {
  id: '',
  uid: '',
  login: '',
  password: '',
  firstName: '',
  lastName: '',
  deposit: 0,
  isAdmin: false,
};

const userReduser = (
  state = initialState,
  action: TAction<TUserInfo | number>,
): TUserInfo => {
  switch (action.type) {
    case EActionTypes.SET_USER_INFO:
      return (action.payload as TUserInfo) || state;
    case EActionTypes.REMOVE_USER_NFO:
      return initialState;
    case EActionTypes.CHANGE_DEPOSIT:
      const newDeposit = Number(state.deposit) + Number(action.payload);
      return {...state, deposit: newDeposit};
    default:
      return state;
  }
};
export default userReduser;
