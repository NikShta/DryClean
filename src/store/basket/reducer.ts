import {createServiceObject} from '../../utils/functions';
import {
  EActionTypes,
  TActionType,
  TBasket,
  TChangeItemCount,
  TServiceObject,
} from './types';

const initialState: TBasket = {};

const basketReducer = (
  state = initialState,
  action: TActionType<TServiceObject | TChangeItemCount>,
): TBasket => {
  switch (action.type) {
    case EActionTypes.ADD_SERVICE: {
      const newState: TBasket = {...state};
      const serviceObject: TServiceObject = action.payload as TServiceObject;

      if (!newState[serviceObject.affiliateUid]) {
        newState[serviceObject.affiliateUid] = {
          affiliateUid: serviceObject.affiliateUid,
          affiliateAddress: serviceObject.affiliateAddress,
          services: {
            [serviceObject.service.serviceUid]: createServiceObject(
              serviceObject.service.serviceUid,
              serviceObject.service.title,
              serviceObject.service.image,
              serviceObject.service.price,
            ),
          },
        };

        return newState;
      }

      if (
        !newState[serviceObject.affiliateUid].services[
          serviceObject.service.serviceUid
        ]
      ) {
        newState[serviceObject.affiliateUid].services[
          serviceObject.service.serviceUid
        ] = createServiceObject(
          serviceObject.service.serviceUid,
          serviceObject.service.title,
          serviceObject.service.image,
          serviceObject.service.price,
        );
      } else {
        newState[serviceObject.affiliateUid].services[
          serviceObject.service.serviceUid
        ].count += 1;
      }

      return newState;
    }

    case EActionTypes.INCREMENT_ITEM: {
      const newState = {...state};
      const {affiliateUid, serviceUid} = action.payload as TChangeItemCount;
      newState[affiliateUid].services[serviceUid].count += 1;

      return newState;
    }

    case EActionTypes.DECREMENT_ITEM: {
      const newState = {...state};
      const {affiliateUid, serviceUid} = action.payload as TChangeItemCount;
      newState[affiliateUid].services[serviceUid].count -= 1;
      const count = newState[affiliateUid].services[serviceUid].count;

      if (count <= 0) {
        delete newState[affiliateUid].services[serviceUid];
      }

      const serviceLength = Object.keys(newState[affiliateUid].services).length;

      if (!serviceLength) {
        delete newState[affiliateUid];
      }

      return newState;
    }

    case EActionTypes.CLEAR_BASKET:
      return {};

    default:
      return state;
  }
};

export default basketReducer;
