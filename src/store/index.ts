import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineReducers, createStore} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';
import appStateReducer from './appState/reducer';
import basketReducer from './basket/reducer';
import userReduser from './user/reducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  user: userReduser,
  appState: appStateReducer,
  basket: basketReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer);
const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;

export {store, persistor};
