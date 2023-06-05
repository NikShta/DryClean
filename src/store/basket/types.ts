export enum EActionTypes {
  ADD_SERVICE = 'ADD_SERVICE',
  CLEAR_BASKET = 'CLEAR_BASKET',
  INCREMENT_ITEM = 'INCREMENT_ITEM',
  DECREMENT_ITEM = 'DECREMENT_ITEM',
}

export type TActionType<T = undefined> = {
  type: EActionTypes;
  payload?: T;
};

export type TServiceObject = {
  affiliateUid: string;
  affiliateAddress: string;
  service: {
    serviceUid: string;
    title: string;
    image: string;
    price: number;
  };
};

export type TService = {
  serviceUid: string;
  title: string;
  image: string;
  price: number;
  count: number;
};

export type TServices = Record<string, TService>;

export type TAffiliate = {
  affiliateUid: string;
  affiliateAddress: string;
  services: TServices;
};

export type TBasket = Record<string, TAffiliate>;

export type TChangeItemCount = {
  affiliateUid: string;
  serviceUid: string;
};
