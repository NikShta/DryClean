import {TouchableWithoutFeedback, View} from 'react-native';
import {TAffiliateItemProps} from '../types';
import TextNunito from './text-nunito';

function AffiliateItem({
  item,
  onPress,
  stylesItem,
  stylesText,
  city,
  street,
  home,
}: TAffiliateItemProps): JSX.Element {
  const onPressItem = () => onPress(item);

  return (
    <TouchableWithoutFeedback onPress={onPressItem}>
      <View style={stylesItem}>
        <TextNunito styles={stylesText}>{city}</TextNunito>
        <TextNunito styles={stylesText}>{`${street} ${home}`}</TextNunito>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default AffiliateItem;
