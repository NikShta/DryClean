import {StyleSheet, TouchableHighlight, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {services} from '../assets/images';
import {TService} from '../types';
import TextNunito from './text-nunito';

function OrderItem({
  item,
  onPress,
}: {
  item: TService;
  onPress: (uid: string, title: string, image: string, price: number) => void;
}): JSX.Element {
  const onPressItem = () =>
    onPress(item.uid, item.title, item.image, item.price);

  return (
    <View style={styles.wrapper}>
      <FastImage
        style={styles.icon}
        source={services[item.image]}
        resizeMode={FastImage.resizeMode.contain}
      />
      <TextNunito weight="Bold" styles={styles.textTitle}>
        {item.title}
      </TextNunito>
      <TextNunito weight="Bold" styles={styles.textPrice}>
        {`стоимость: ${String(item.price)}`}
      </TextNunito>
      <TouchableHighlight
        onPress={onPressItem}
        style={styles.button}
        underlayColor={styles.underlayColor.color}>
        <TextNunito weight="Bold" styles={styles.buttonText}>
          +
        </TextNunito>
      </TouchableHighlight>
    </View>
  );
}

export default OrderItem;

const styles = StyleSheet.create({
  wrapper: {
    maxWidth: '50%',
    backgroundColor: '#5D9C59',
    padding: 15,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  icon: {
    width: 60,
    height: 60,
  },
  textTitle: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 10,
  },
  textPrice: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#FFF',
    position: 'absolute',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 100,
    top: '100%',
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
});
