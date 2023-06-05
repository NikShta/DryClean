import axios from 'axios';
import {TPostOrder} from '../types';

class OrdersApi {
  async postOrder(order: Omit<TPostOrder, 'id'>) {
    try {
      axios.post(`https://6400a81563e89b0913b3f891.mockapi.io/orders`, order);
    } catch (error) {
      console.log(error);
    }
  }

  async changeOrder(order: Partial<TPostOrder>, id: string) {
    try {
      axios.patch(
        `https://6400a81563e89b0913b3f891.mockapi.io/orders/${id}`,
        order,
      );
    } catch (error) {
      console.log(error);
    }
  }

  async getOrders() {
    try {
      const {data} = await axios.get(
        `https://6400a81563e89b0913b3f891.mockapi.io/orders`,
      );

      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async getUserOrders(useUid: string) {
    try {
      const {data} = await axios.get(
        `https://6400a81563e89b0913b3f891.mockapi.io/orders?userUid=${useUid}`,
      );

      return data;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new OrdersApi();
