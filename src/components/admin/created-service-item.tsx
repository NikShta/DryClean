import FastImage from 'react-native-fast-image';
import {StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
import {Delete, services} from '../../assets/images';
import TextNunito from '../text-nunito';
import {TCreatedServicesItemProps} from '../../types';

function CreatedServicesItem({
  item,
  onPress,
}: TCreatedServicesItemProps): JSX.Element {
  const onPressItem = () => onPress(item.uid);

  return (
    <View style={styles.wrapper}>
      <View style={styles.removeBtn}>
        <TouchableWithoutFeedback onPress={onPressItem}>
          <FastImage
            style={styles.removeIcon}
            source={Delete}
            resizeMode={FastImage.resizeMode.contain}
          />
        </TouchableWithoutFeedback>
      </View>
      <FastImage
        style={styles.serviceIcon}
        source={services[item.image]}
        resizeMode={FastImage.resizeMode.contain}
      />
      <View>
        <TextNunito weight="Bold" styles={styles.text}>
          {` Название: ${item.title}`}
        </TextNunito>
        <TextNunito weight="Bold" styles={styles.text}>
          {`Стоимость услуги: ${item.price}`}
        </TextNunito>
      </View>
    </View>
  );
}

export default CreatedServicesItem;

const styles = StyleSheet.create({
  wrapper: {
    minWidth: '100%',
    flexDirection: 'row',
    marginTop: 10,
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 5,
  },
  removeBtn: {
    position: 'absolute',
    right: 10,
    top: 10,
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    zIndex: 1,
  },
  removeIcon: {
    width: 20,
    height: 20,
  },
  text: {
    color: '#474E68',
    maxWidth: '90%',
  },
  serviceIcon: {
    width: 40,
    height: 40,
  },
});
