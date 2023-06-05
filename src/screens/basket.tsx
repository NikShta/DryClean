import {useEffect, useState} from 'react';
import {SectionList, StyleSheet, TouchableHighlight, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import BasketItem from '../components/basket-item';
import TextNunito from '../components/text-nunito';
import {RootState} from '../store';
import {decrementItem, incrementItem} from '../store/basket/actions';
import {changeDeposit} from '../store/user/actions';
import {TBasketItemData, TBasketItem, TBasketListItem} from '../types';
import {setOrderItems} from '../utils/functions';
import {useOrder} from '../utils/hooks';
import UserApi from '../api/users';

const BasketListItem = ({item, dispatch}: TBasketListItem): JSX.Element => {
  const onPressPlus = () =>
    dispatch(
      incrementItem({
        affiliateUid: item.affiliateUid,
        serviceUid: item.serviceUid,
      }),
    );

  const onPressMinus = () =>
    dispatch(
      decrementItem({
        affiliateUid: item.affiliateUid,
        serviceUid: item.serviceUid,
      }),
    );

  return (
    <BasketItem
      title={item.title}
      image={item.image}
      count={item.count}
      onPlus={onPressPlus}
      onMinus={onPressMinus}
    />
  );
};

function BasketScreen() {
  const deposit = useSelector((state: RootState) => state.user.deposit);
  const basket = useSelector((state: RootState) => state.basket);
  const isLoading = useSelector((state: RootState) => state.appState.isLoading);
  const dispatch = useDispatch();
  const [data, setData] = useState<TBasketItemData[]>([]);
  const [totalCost, setTotalCost] = useState(0);
  const {onPostOrder} = useOrder();

  useEffect(() => {
    if (basket) {
      const {order, totalCost} = setOrderItems(basket);
      setData(order);
      setTotalCost(totalCost);
    }
  }, [basket]);

  const renderItem = ({item}: {item: TBasketItem}) => {
    return <BasketListItem item={item} dispatch={dispatch} />;
  };

  const renderSectionHeader = ({
    section: {title},
  }: {
    section: {title: string};
  }) => {
    return (
      <TextNunito weight="Bold" styles={styles.sectionTitle}>
        {title}
      </TextNunito>
    );
  };

  const qwe = (qwe: number) => {
    return 10000 + qwe;
  };

  const onPressSend = async () => {
    if (deposit <= totalCost) {
      console.log('Мало деняг');
      return;
    }

    await onPostOrder(data, totalCost);
    dispatch(changeDeposit(-totalCost));
  };

  if (!Object.keys(basket).length) {
    return (
      <View style={styles.container}>
        <TextNunito weight="Black" styles={styles.topBlockText}>
          Корзина пуста
        </TextNunito>
      </View>
    );
  }

  const keyExtractor = (item: TBasketItem, index: number) =>
    item.serviceUid + index;

  return (
    <View style={styles.container}>
      <View style={styles.topBlock}>
        <View style={styles.topBlockTextWrapper}>
          <TextNunito weight="Black" styles={styles.topBlockText}>
            Ваш счет
          </TextNunito>
          <TextNunito weight="Black" styles={styles.topBlockText}>
            {String(deposit)}
          </TextNunito>
        </View>
        <View style={styles.topBlockTextWrapper}>
          <TextNunito weight="Black" styles={styles.topBlockText}>
            Общая стоимость
          </TextNunito>
          <TextNunito weight="Black" styles={styles.topBlockText}>
            {String(totalCost)}
          </TextNunito>
        </View>
      </View>
      <SectionList
        style={styles.sectionList}
        sections={data}
        stickySectionHeadersEnabled={false}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
      />
      <View style={styles.bottomBlock}>
        <TouchableHighlight
          disabled={isLoading}
          onPress={onPressSend}
          style={styles.bottomButton}
          underlayColor={styles.underlayColor.color}>
          <TextNunito weight="Bold" styles={styles.bottomButtonText}>
            Отправить заказ
          </TextNunito>
        </TouchableHighlight>
      </View>
    </View>
  );
}

export default BasketScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
    marginTop: 20,
  },
  topBlock: {
    marginBottom: 20,
  },
  topBlockTextWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  topBlockText: {
    fontSize: 20,
  },
  sectionList: {
    marginBottom: 60,
    maxHeight: 200,
  },
  sectionTitle: {
    fontSize: 18,
  },
  icon: {
    width: 40,
    height: 40,
  },
  underlayColor: {
    color: '#528056',
  },
  bottomBlock: {
    position: 'absolute',
    bottom: 0,
    paddingTop: 10,
    backgroundColor: '#f2f2f2',
    width: '100%',
  },
  bottomButton: {
    backgroundColor: '#609966',
    padding: 10,
    borderRadius: 30,
    alignItems: 'center',
  },
  bottomButtonText: {
    fontSize: 22,
    color: 'white',
  },
});
