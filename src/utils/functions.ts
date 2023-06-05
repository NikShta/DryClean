import {TBasket, TService} from '../store/basket/types';
import {TBasketItemData, TBasketItem} from '../types';

export const setOrderItems = (basket: TBasket) => {
  const order: TBasketItemData[] = [];
  let totalCost: number = 0;

  for (const key in basket) {
    const title = basket[key].affiliateAddress;
    const data: TBasketItem[] = [];

    for (let subKey in basket[key].services) {
      const service = {
        ...basket[key].services[subKey],
        affiliateUid: basket[key].affiliateUid,
      };
      totalCost +=
        basket[key].services[subKey].price * basket[key].services[subKey].count;

      data.push(service);
    }
    order.push({title, data});
  }

  return {order, totalCost};
};

export const createServiceObject = (
  serviceUid: string,
  title: string,
  image: string,
  price: number,
): TService => ({
  serviceUid,
  title,
  image,
  price,
  count: 1,
});
