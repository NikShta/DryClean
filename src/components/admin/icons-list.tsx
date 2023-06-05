import {
  FlatList,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {services} from '../../assets/images';
import {TIconsListProps, TListItem} from '../../types';

const ListItem = ({item, onPress, borderColor}: TListItem): JSX.Element => {
  const onPressIcon = () => onPress(item);
  return (
    <TouchableWithoutFeedback onPress={onPressIcon}>
      <View style={[styles.wrapper, borderColor]}>
        <FastImage
          style={styles.icon}
          source={services[item]}
          resizeMode={FastImage.resizeMode.contain}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

function IconsList({data, setIcon, pickName}: TIconsListProps): JSX.Element {
  const setBorderColor = (pickName: string, name: string) => ({
    borderColor: pickName === name ? '#609966' : '#6B728E',
  });

  const renderItem = ({item}: {item: string}) => (
    <ListItem
      item={item}
      onPress={setIcon}
      borderColor={setBorderColor(pickName, item)}
    />
  );

  const keyExtractor = (item: string) => item;

  return (
    <FlatList
      horizontal={true}
      data={data}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
    />
  );
}

export default IconsList;

const styles = StyleSheet.create({
  wrapper: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    marginRight: 10,
    marginBottom: 20,
    width: 70,
  },
  icon: {
    width: 60,
    height: 60,
  },
});
