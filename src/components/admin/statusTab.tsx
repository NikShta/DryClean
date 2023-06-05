import {StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
import TextNunito from '../text-nunito';

function StatusTab({
  status,
  index,
  isActive,
  onPress,
}: {
  status: string;
  index: number;
  isActive: boolean;
  onPress: (index: number) => void;
}): JSX.Element {
  const onSetTab = () => onPress(index);

  const getColor = (field: string) => ({
    [field]: isActive ? '#609966' : '#474E68',
  });

  const getTextStyles = {...styles.text, ...getColor('color')};

  return (
    <TouchableWithoutFeedback onPress={onSetTab}>
      <View style={[styles.wrapper, getColor('borderColor')]}>
        <TextNunito styles={getTextStyles}>{status}</TextNunito>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default StatusTab;

const styles = StyleSheet.create({
  wrapper: {
    padding: 5,
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginLeft: 10,
    marginTop: 10,
  },
  text: {
    color: '#474E68',
    fontSize: 16,
  },
});
