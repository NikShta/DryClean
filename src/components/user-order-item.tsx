import {useState} from 'react';
import {
  SectionList,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {TBasketItem, TUserOrderItem} from '../types';
import TextNunito from './text-nunito';
import {services as servicesIcon} from '../assets/images';
import {orderUserStatus} from '../utils/constants';
import {useOrder} from '../utils/hooks';

function UserOrderItem({
  id,
  createdAt,
  status,
  totalCost,
  services,
  isDone,
  reason,
}: TUserOrderItem): JSX.Element {
  const [isShowServices, setIsShowServices] = useState(false);
  const [isDoneValue, setIsDoneValue] = useState(isDone);
  const {doneOrder} = useOrder();

  const renderItem = ({item}: {item: TBasketItem}) => (
    <View style={styles.detailsWrapper}>
      <FastImage
        style={styles.icon}
        source={servicesIcon[item.image]}
        resizeMode={FastImage.resizeMode.contain}
      />
      <TextNunito styles={styles.textInfo}>{item.title}</TextNunito>
    </View>
  );

  const renderSectionHeader = ({
    section: {title},
  }: {
    section: {title: string};
  }) => (
    <TextNunito weight="Black" styles={styles.detailsText}>
      {title}
    </TextNunito>
  );

  const setShowServicesList = () => {
    setIsShowServices(!isShowServices);
  };

  const onDoneOrder = () => {
    doneOrder(id);
    setIsDoneValue(true);
  };

  const getStatus = () => {
    if (isDoneValue) {
      return 'завершен';
    }
    if (status === 3) {
      return `${orderUserStatus[status]} (${reason})`;
    }
    return orderUserStatus[status];
  };

  return (
    <TouchableWithoutFeedback onPress={setShowServicesList}>
      <View style={styles.wrapper}>
        <TextNunito weight="Bold" styles={styles.textInfo}>
          {`Заказ№ ${id}`}
        </TextNunito>
        <TextNunito weight="Bold" styles={styles.textInfo}>
          {`Дата заказа: ${createdAt.slice(0, 10)}`}
        </TextNunito>
        <View style={styles.doneWrapper}>
          <TextNunito weight="Bold" styles={styles.textInfo}>
            {`Статус: ${getStatus()}`}
          </TextNunito>
          {status === 2 && !isDoneValue && (
            <TouchableOpacity style={styles.doneBtn} onPress={onDoneOrder}>
              <TextNunito weight="Bold" styles={styles.textInfo}>
                Завершить
              </TextNunito>
            </TouchableOpacity>
          )}
        </View>
        <TextNunito weight="Bold" styles={styles.textInfo}>
          {`Стоимость ${totalCost}`}
        </TextNunito>
        {isShowServices && (
          <SectionList
            sections={services}
            renderItem={renderItem}
            renderSectionHeader={renderSectionHeader}
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

export default UserOrderItem;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fffff',
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    borderRadius: 20,
    borderColor: '#474E68',
  },
  doneWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  doneBtn: {
    borderWidth: 1,
    alignContent: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    padding: 5,
    borderRadius: 5,
    marginLeft: 10,
  },
  textInfo: {
    color: '#474E68',
    fontSize: 16,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  detailsWrapper: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  detailsText: {
    color: '#474E68',
    fontSize: 16,
    marginTop: 15,
  },
});
