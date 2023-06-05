import {StyleSheet, TouchableHighlight, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {services} from '../assets/images';
import {TBasketItemProps} from '../types';
import TextNunito from './text-nunito';

function BasketItem({
  title,
  image,
  count,
  onPlus,
  onMinus,
}: TBasketItemProps): JSX.Element {
  return (
    <View style={styles.item}>
      <View style={styles.leftBlock}>
        <FastImage
          style={styles.icon}
          source={services[image]}
          resizeMode={FastImage.resizeMode.contain}
        />
        <TextNunito styles={styles.title}>{title}</TextNunito>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableHighlight
          onPress={onPlus}
          style={styles.button}
          underlayColor={styles.underlayColor.color}>
          <TextNunito weight="Bold" styles={styles.buttonText}>
            +
          </TextNunito>
        </TouchableHighlight>
        <TextNunito weight="Bold" styles={styles.couter}>
          {String(count)}
        </TextNunito>
        <TouchableHighlight
          onPress={onMinus}
          style={styles.button}
          underlayColor={styles.underlayColor.color}>
          <TextNunito weight="Bold" styles={styles.buttonText}>
            -
          </TextNunito>
        </TouchableHighlight>
      </View>
    </View>
  );
}

export default BasketItem;

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    marginVertical: 8,
  },
  leftBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: '50%',
  },
  title: {
    fontSize: 16,
    marginLeft: 10,
  },
  icon: {
    width: 40,
    height: 40,
  },
  button: {
    backgroundColor: '#FFF',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#5D9C59',
  },
  buttonText: {
    position: 'absolute',
    fontSize: 30,
    color: '#5D9C59',
  },
  underlayColor: {
    color: '#528056',
  },
  couter: {
    fontSize: 16,
    marginHorizontal: 10,
  },
});
