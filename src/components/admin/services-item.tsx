import FastImage from 'react-native-fast-image';
import {StyleSheet, View} from 'react-native';
import {services} from '../../assets/images';
import TextNunito from '../text-nunito';
import {TService} from '../../types';

function ServicesItem({title, price, image}: TService): JSX.Element {
  return (
    <View style={styles.wrapper}>
      <FastImage
        style={styles.icon}
        source={services[image]}
        resizeMode={FastImage.resizeMode.contain}
      />
      <View>
        <TextNunito weight="Bold" styles={styles.text}>
          {` Название: ${title}`}
        </TextNunito>
        <TextNunito weight="Bold" styles={styles.text}>
          {`Стоимость услуги: ${price}`}
        </TextNunito>
      </View>
    </View>
  );
}

export default ServicesItem;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    maxWidth: '90%',
    marginTop: 10,
  },
  text: {
    color: '#474E68',
  },
  icon: {
    width: 40,
    height: 40,
  },
});
