import {useDispatch, useSelector} from 'react-redux';
import uuid from 'react-native-uuid';
import {RootState} from '../store';
import {setLoading} from '../store/appState/actions';
import {clearBasket} from '../store/basket/actions';
import {TBasketItemData, TPostOrder, TUserOrderFetch} from '../types';
import OrdersApi from '../api/orders';
import UserApi from '../api/users';

export function useOrder() {
  const userUid = useSelector((state: RootState) => state.user.uid);
  const userId = useSelector((state: RootState) => state.user.id);
  const userFirstName = useSelector((state: RootState) => state.user.firstName);
  const userLastName = useSelector((state: RootState) => state.user.lastName);

  const dispatch = useDispatch();

  const onPostOrder = async (data: TBasketItemData[], totalCost: number) => {
    const newOrder: Omit<TPostOrder, 'id'> = {
      userId,
      userUid: userUid,
      userFirstName,
      userLastName,
      orderUid: String(uuid.v4()),
      order: data,
      status: 0,
      totalCost,
      isDone: false,
      reason: '',
    };

    dispatch(setLoading(true));
    await OrdersApi.postOrder(newOrder);
    await UserApi.changeDeposit(-totalCost, userId);
    dispatch(clearBasket());
    dispatch(setLoading(false));
  };

  const changeOrder = async (data: Partial<TPostOrder>, id: string) => {
    dispatch(setLoading(true));
    await OrdersApi.changeOrder(data, id);
    dispatch(setLoading(false));
  };

  const getUserOrders = async (
    userUid: string,
    setData: (data: TUserOrderFetch[]) => void,
  ) => {
    dispatch(setLoading(true));
    const data = await OrdersApi.getUserOrders(userUid);
    setData(data);
    dispatch(clearBasket());
    dispatch(setLoading(false));
  };

  const doneOrder = async (id: string) => {
    changeOrder({isDone: true}, id);
  };

  return {onPostOrder, getUserOrders, changeOrder, doneOrder};
}
