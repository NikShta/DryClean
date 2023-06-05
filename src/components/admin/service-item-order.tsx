import FastImage from 'react-native-fast-image';
import {StyleSheet, View} from 'react-native';
import {services} from '../../assets/images';
import {TBasketItem} from '../../types';
import TextNunito from '../text-nunito';

const ServiceItem = ({item}: {item: TBasketItem}): JSX.Element => (
  <View style={styles.serviceItemWrapper}>
    <FastImage
      style={styles.icon}
      source={services[item.image]}
      resizeMode={FastImage.resizeMode.contain}
    />
    <View>
      <View style={styles.serviceItemField}>
        <TextNunito styles={styles.serviceItemText}>
          Название услуги:
        </TextNunito>
        <TextNunito weight="Bold" styles={styles.serviceItemText}>
          {item.title}
        </TextNunito>
      </View>
      <View style={styles.serviceItemField}>
        <TextNunito styles={styles.serviceItemText}>Колличество:</TextNunito>
        <TextNunito weight="Bold" styles={styles.serviceItemText}>
          {String(item.count)}
        </TextNunito>
      </View>
      <View style={styles.serviceItemField}>
        <TextNunito styles={styles.serviceItemText}>Стоимость:</TextNunito>
        <TextNunito weight="Bold" styles={styles.serviceItemText}>
          {String(item.price * item.count)}
        </TextNunito>
      </View>
    </View>
  </View>
);

export default ServiceItem;

const styles = StyleSheet.create({
  icon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },

  serviceItemWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 20,
    marginBottom: 20,
  },
  serviceItemField: {
    flexDirection: 'row',
  },
  serviceItemText: {
    fontSize: 16,
    marginRight: 5,
    color: '#474E68',
  },
});
