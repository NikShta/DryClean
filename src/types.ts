import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {TextStyle, ViewStyle} from 'react-native/types';
import {Dispatch} from 'redux';
import {TActionType, TChangeItemCount} from './store/basket/types';

export type TUserInfo = {
  uid: string;
  login: string;
  password: string;
  firstName: string;
  lastName: string;
  deposit: number;
  isAdmin: boolean;
};

export enum ERouterNames {
  LOGIN_SCREEN = 'LOGIN_SCREEN',
  LOGUP_SCREEN = 'LOGUP_SCREEN',
  TABS = 'TABS',
  HOME_SCREEN = 'HOME_SCREEN',
  BASKET_SCREEN = 'BASKET_SCREEN',
  CREATE_ORDER_SCREEN = 'CREATE_ORDER_SCREEN',
  PROFILE_SCREEN = 'PROFILE_SCCREEN',
}

export enum ERouterNamesAdmin {
  TABS = 'TABS',
  AFFILIATES_SCREEN = 'AFFILIATES_SCREEN',
  EDIT_AFFILIATE_SCREEN = 'EDIT_AFFILIATE_SCREEN',
  ADMIN_PROFILE = 'ADMIN_PROFILE',
  ORDERS_SCREEN = 'ORDERS_SCREEN',
  ORDER_SCREEN = 'ORDER_SCREEN',
}

export type LoginScreenNavigationProp = NativeStackNavigationProp<
  {LOGUP_SCREEN: undefined},
  ERouterNames.LOGUP_SCREEN
>;

export type LogupScreenNavigationProp = NativeStackNavigationProp<
  {LOGIN_SCREEN: undefined},
  ERouterNames.LOGIN_SCREEN
>;

export type HomeScreenNavigationProp = NativeStackNavigationProp<
  {CREATE_ORDER_SCREEN: undefined},
  ERouterNames.CREATE_ORDER_SCREEN
>;

export type CreateOrderScreenNavigationProp = NativeStackNavigationProp<
  {BASKET_SCREEN: undefined},
  ERouterNames.BASKET_SCREEN
>;

export type AffiliatesScreenNavigationProp = NativeStackNavigationProp<
  {EDIT_AFFILIATE_SCREEN: TAffiliate},
  ERouterNamesAdmin.EDIT_AFFILIATE_SCREEN
>;

export type OrdersScreenNavigationProp = NativeStackNavigationProp<
  {ORDER_SCREEN: TPostOrder},
  ERouterNamesAdmin.ORDER_SCREEN
>;

export enum ELoginFields {
  LOGIN = 'LOGIN',
  PASSWORD = 'PASSWORD',
}

export enum ELogUpFileds {
  LOGIN = 'LOGIN',
  PASSWORD = 'PASSWORD',
  FIRST_NAME = 'FIRSR_NAME',
  LAST_NAME = 'LAST_NAME',
}

export type TService = {
  uid: string;
  title: string;
  price: number;
  image: string;
};

export type TAffiliate = {
  id?: string;
  uid: string;
  city: string;
  street: string;
  home: string;
  services?: Array<TService>;
};

export type TFetchAffiliate = TAffiliate & {id: string} & {
  removeAffiliate: (idAffiliate: string) => void;
};

export type TOrderItemProps = {
  uid: string;
  title: string;
  price: number;
  image: string;
  onPress: () => void;
};

export type TBasketItem = {
  affiliateUid: string;
  serviceUid: string;
  title: string;
  image: string;
  count: number;
  price: number;
};

export type TBasketItemData = {
  title: string;
  data: TBasketItem[];
};

export type TBasketItemProps = {
  title: string;
  image: string;
  count: number;
  onPlus: () => void;
  onMinus: () => void;
};

export type TPostOrder = {
  id: string;
  userId: string;
  userUid: string;
  orderUid: string;
  userFirstName: string;
  userLastName: string;
  order: TBasketItemData[];
  status: number;
  totalCost: number;
  isDone: boolean;
  reason: string;
};

export type TUserOrderFetch = {
  createdAt: string;
  id: string;
  userUid: string;
  order: TBasketItemData[];
  status: number;
  totalCost: number;
  isDone: boolean;
  reason: string;
};

export type TUserOrderItem = {
  id: string;
  createdAt: string;
  status: number;
  totalCost: number;
  services: TBasketItemData[];
  isDone: boolean;
  reason: string;
};

export type TCreatedServicesItemProps = {
  item: TService;
  onPress: (uid: string) => void;
};

export type TIconsListProps = {
  data: string[];
  setIcon: (item: string) => void;
  pickName: string;
};

export type TListItem = {
  item: string;
  onPress: (item: string) => void;
  borderColor: ViewStyle;
};

export type TAffiliateItemProps = {
  item: TAffiliate;
  onPress: (item: TAffiliate) => void;
  stylesItem: ViewStyle;
  stylesText: TextStyle;
  city: string;
  street: string;
  home: string;
};

export type TTextInputComponentProps = {
  onChangeText: (value: any) => void;
  styles: ViewStyle;
  placeholder: string;
  placeholderTextColor: string;
  secureTextEntry?: boolean;
  value?: string;
  keyboardType?: 'default' | 'numeric';
};

export type TTextNunitoProps = {
  children: string;
  weight?: string;
  styles: TextStyle;
};

export type TBasketListItem = {
  item: TBasketItem;
  dispatch: Dispatch<TActionType<TChangeItemCount>>;
};
