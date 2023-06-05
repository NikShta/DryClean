import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useCallback, useState} from 'react';
import {FlatList, ListRenderItem, StyleSheet, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {setLoading} from '../store/appState/actions';
import OrdersApi from '../api/orders';
import OrderItem from '../components/admin/order-item';
import {
  ERouterNamesAdmin,
  OrdersScreenNavigationProp,
  TPostOrder,
} from '../types';

function OrdersScreen({}): JSX.Element {
  const navigator = useNavigation<OrdersScreenNavigationProp>();
  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  const getOrders = async () => {
    dispatch(setLoading(true));
    const ordersData = await OrdersApi.getOrders();

    if (ordersData) {
      setData(ordersData);
    }

    dispatch(setLoading(false));
  };

  useFocusEffect(
    useCallback(() => {
      getOrders();
    }, []),
  );

  const goToScreen = (item: TPostOrder) =>
    navigator.navigate(ERouterNamesAdmin.ORDER_SCREEN, item);

  const renderItem: ListRenderItem<TPostOrder> = ({item}) => (
    <OrderItem item={item} onPress={goToScreen} />
  );

  const keyExtractor = (item: TPostOrder) => item.orderUid;

  return (
    <View style={styles.wrapper}>
      <FlatList
        data={data}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />
    </View>
  );
}

export default OrdersScreen;

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 20,
  },
});
