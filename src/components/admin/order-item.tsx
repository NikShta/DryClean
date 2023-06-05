import {StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
import {TPostOrder} from '../../types';
import {orderAdminStatus} from '../../utils/constants';
import TextNunito from '../text-nunito';

type TOrderItemProps = {
  item: TPostOrder;
  onPress: (item: TPostOrder) => void;
};

function OrderItem({item, onPress}: TOrderItemProps): JSX.Element {
  const onPressItem = () => onPress(item);

  return (
    <TouchableWithoutFeedback onPress={onPressItem}>
      <View style={styles.wrapper}>
        <View style={styles.fieldWrapper}>
          <TextNunito styles={styles.textField}>ID заказа:</TextNunito>
          <TextNunito weight={'Bold'} styles={styles.textInfo}>
            {item.orderUid}
          </TextNunito>
        </View>
        <View style={styles.fieldWrapper}>
          <TextNunito styles={styles.textField}>Имя Заказчика:</TextNunito>
          <TextNunito weight={'Bold'} styles={styles.textInfo}>
            {`${item.userFirstName} ${item.userLastName}`}
          </TextNunito>
        </View>
        <View style={styles.fieldWrapper}>
          <TextNunito styles={styles.textField}>Сумма заказа:</TextNunito>
          <TextNunito weight={'Bold'} styles={styles.textInfo}>
            {String(item.totalCost)}
          </TextNunito>
        </View>
        <View style={styles.fieldWrapper}>
          <TextNunito styles={styles.textField}>Статус заказа:</TextNunito>
          <TextNunito weight={'Bold'} styles={styles.textInfo}>
            {orderAdminStatus[item.status]}
          </TextNunito>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default OrderItem;

const styles = StyleSheet.create({
  wrapper: {
    borderWidth: 1,
    borderRadius: 15,
    borderColor: '#474E68',
    padding: 15,
    marginBottom: 20,
  },
  fieldWrapper: {
    flexDirection: 'row',
    maxWidth: '90%',
  },
  textField: {
    fontSize: 16,
    color: '#474E68',
  },
  textInfo: {
    fontSize: 18,
    color: '#474E68',
    marginLeft: 10,
  },
});
