import {EActionTypes, TAction, TAppState} from './types';

const initialState: TAppState = {
  isAuth: false,
  isLoading: false,
};

const appStateReducer = (
  state = initialState,
  action: TAction<boolean>,
): TAppState => {
  switch (action.type) {
    case EActionTypes.LOGIN:
      return {...state, isAuth: true};
    case EActionTypes.LOGOUT:
      return {...state, isAuth: false};
    case EActionTypes.SET_LOADING:
      return {...state, isLoading: !!action.payload};
    default:
      return state;
  }
};

export default appStateReducer;
