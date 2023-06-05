import {StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {WashingMachine} from '../assets/images';
import TextNunito from './text-nunito';

function Banner() {
  return (
    <View style={styles.wrapper}>
      <View>
        <TextNunito weight="Black" styles={styles.textPercents}>
          20%
        </TextNunito>
        <TextNunito styles={styles.textTitle}>на ваш первый ЗАКАЗ</TextNunito>
        <View style={styles.codeBlock}>
          <TextNunito styles={styles.textBlock}>
            Используйте код: FIRSTORDER
          </TextNunito>
        </View>
      </View>
      <FastImage
        style={styles.icon}
        source={WashingMachine}
        resizeMode={FastImage.resizeMode.contain}
      />
    </View>
  );
}

export default Banner;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#658864',
    padding: 10,
    borderRadius: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  textPercents: {
    color: '#FFF',
    fontSize: 34,
  },
  textTitle: {
    color: '#FFF',
    fontSize: 12,
  },
  codeBlock: {
    backgroundColor: '#FFF',
    alignSelf: 'flex-start',
    padding: 5,
    borderRadius: 5,
    marginVertical: 10,
  },
  textBlock: {
    fontSize: 12,
  },
  icon: {
    width: 90,
    height: 90,
  },
});
