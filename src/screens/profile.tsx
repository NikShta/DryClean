import {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import {useDispatch, useSelector} from 'react-redux';
import {Arrow} from '../assets/images';
import TextNunito from '../components/text-nunito';
import UserOrderItem from '../components/user-order-item';
import {RootState} from '../store';
import {TUserOrderFetch} from '../types';
import {useOrder} from '../utils/hooks';
import {logOut} from '../store/appState/actions';
import {removeUserInfo, changeDeposit} from '../store/user/actions';
import TextInputComponent from '../components/text-input';
import UserApi from '../api/users';

function ProfileScreen() {
  const firstName = useSelector((state: RootState) => state.user.firstName);
  const lastName = useSelector((state: RootState) => state.user.lastName);
  const deposit = useSelector((state: RootState) => state.user.deposit);
  const id = useSelector((state: RootState) => state.user.id);
  const uid = useSelector((state: RootState) => state.user.uid);
  const dispatch = useDispatch();
  const [ordersData, setOrdersData] = useState<TUserOrderFetch[]>([]);
  const [isShowOrdersList, setIsShowOrderList] = useState(false);
  const [depositeValue, setDepositeValue] = useState(0);
  const {getUserOrders} = useOrder();

  useFocusEffect(
    useCallback(() => {
      getUserOrders(uid, setOrdersData);
    }, [uid, setOrdersData]),
  );

  const renderOrderItem = ({item}: {item: TUserOrderFetch}) =>
    isShowOrdersList ? (
      <UserOrderItem
        id={item.id}
        isDone={item.isDone}
        reason={item.reason}
        createdAt={item.createdAt}
        status={item.status}
        totalCost={item.totalCost}
        services={item.order}
      />
    ) : null;

  const keyExtractor = (item: TUserOrderFetch) => item.id;

  const userLogOut = () => {
    dispatch(logOut());
    dispatch(removeUserInfo());
  };

  const showListHAndler = () => setIsShowOrderList(!isShowOrdersList);

  const onReplenishBalance = async () => {
    if (depositeValue <= 0) {
      return;
    }

    await UserApi.changeDeposit(depositeValue, id);
    dispatch(changeDeposit(depositeValue));

    setDepositeValue(0);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={ordersData}
        keyExtractor={keyExtractor}
        renderItem={renderOrderItem}
        ListEmptyComponent={
          <TextNunito styles={styles.emptyListBlock}>
            Список заказов пуст
          </TextNunito>
        }
        ListHeaderComponent={
          <>
            <View style={styles.nameBlockWrapper}>
              <TextNunito weight="Bold" styles={styles.textBlock}>
                Ваше имя:
              </TextNunito>
              <TextNunito weight="Black" styles={styles.textName}>
                {`${firstName} ${lastName}`}
              </TextNunito>
            </View>
            <View style={styles.idBlockWrapper}>
              <TextNunito weight="Bold" styles={styles.textBlock}>
                Ваш ID:
              </TextNunito>
              <TextNunito weight="Black" styles={styles.textBlock}>
                {uid}
              </TextNunito>
            </View>
            <View style={styles.nameBlockWrapper}>
              <TextNunito weight="Bold" styles={styles.textBlock}>
                Ваш баланс:
              </TextNunito>
              <TextNunito weight="Black" styles={styles.textName}>
                {`${deposit}`}
              </TextNunito>
            </View>
            <View style={styles.idBlockWrapper}>
              <TextNunito weight="Bold" styles={styles.textBlock}>
                Пополнить баланс
              </TextNunito>
              <TextInputComponent
                value={depositeValue ? String(depositeValue) : ''}
                onChangeText={setDepositeValue}
                styles={styles.depositInput}
                placeholder={'Введите сумму'}
                placeholderTextColor={styles.placeholderTextColor.color}
                keyboardType={'numeric'}
              />
              <TouchableOpacity
                style={styles.depositeBtn}
                onPress={onReplenishBalance}>
                <TextNunito weight="Bold" styles={styles.textBlock}>
                  Пополнить
                </TextNunito>
              </TouchableOpacity>
            </View>
            <TouchableHighlight
              onPress={userLogOut}
              style={styles.button}
              underlayColor={styles.underlayColor.color}>
              <TextNunito weight="Bold" styles={styles.buttonText}>
                Выйти из профиля
              </TextNunito>
            </TouchableHighlight>
            <TouchableWithoutFeedback onPress={showListHAndler}>
              <View style={styles.ordersTitleWrapper}>
                <TextNunito weight="Black" styles={styles.ordersTitle}>
                  Ваши заказы
                </TextNunito>
                <FastImage
                  style={styles.icon}
                  source={Arrow}
                  resizeMode={FastImage.resizeMode.contain}
                />
              </View>
            </TouchableWithoutFeedback>
          </>
        }
      />
    </View>
  );
}

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  nameBlockWrapper: {
    borderBottomWidth: 1,
    borderColor: '#474E68',
    marginBottom: 20,
  },
  textBlock: {
    fontSize: 16,
    color: '#474E68',
  },
  textName: {
    fontSize: 22,
    marginBottom: 10,
    color: '#474E68',
  },
  idBlockWrapper: {
    borderBottomWidth: 1,
    borderColor: '#474E68',
    marginBottom: 40,
  },
  ordersTitleWrapper: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    borderColor: '#474E68',
  },
  ordersTitle: {
    fontSize: 20,
    marginBottom: 10,
    color: '#474E68',
    marginRight: 20,
  },
  icon: {
    width: 20,
    height: 20,
  },
  emptyListBlock: {
    fontSize: 20,
    marginBottom: 10,
    color: '#474E68',
    marginRight: 20,
  },
  button: {
    backgroundColor: '#609966',
    padding: 10,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 40,
  },
  buttonText: {
    fontSize: 22,
    color: 'white',
  },
  underlayColor: {
    color: '#528056',
  },
  depositInput: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 10,
    alignSelf: 'flex-start',
    marginTop: 10,
  },
  depositeBtn: {
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    alignSelf: 'flex-start',
    padding: 5,
    marginVertical: 10,
  },
  placeholderTextColor: {
    color: '#6B728E',
  },
});
