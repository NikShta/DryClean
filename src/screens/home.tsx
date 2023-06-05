import {StyleSheet, TouchableHighlight, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import Banner from '../components/banner';
import TextNunito from '../components/text-nunito';
import {RootState} from '../store';
import {ERouterNames, HomeScreenNavigationProp} from '../types';

function HomeScreen(): JSX.Element {
  const navigate = useNavigation<HomeScreenNavigationProp>();
  const firstName = useSelector((state: RootState) => state.user.firstName);
  const lastName = useSelector((state: RootState) => state.user.lastName);

  const goToScreen = () => navigate.navigate(ERouterNames.CREATE_ORDER_SCREEN);

  return (
    <View style={styles.wrapper}>
      <View style={styles.topBlock}>
        <TextNunito styles={styles.textTop}>С возращением,</TextNunito>
        <TextNunito
          weight="black"
          styles={styles.textName}>{`${firstName} ${lastName}`}</TextNunito>
      </View>
      <Banner />
      <TouchableHighlight
        onPress={goToScreen}
        style={styles.button}
        underlayColor={styles.underlayColor.color}>
        <TextNunito weight="Bold" styles={styles.buttonText}>
          +
        </TextNunito>
      </TouchableHighlight>
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 20,
  },
  topBlock: {
    marginBottom: 20,
  },
  textTop: {
    fontSize: 16,
    color: '#474E68',
  },
  textName: {
    fontSize: 24,
    color: '#474E68',
  },
  button: {
    backgroundColor: '#609966',
    position: 'absolute',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    borderRadius: 100,
    zIndex: 100,
    top: '90%',
  },
  buttonText: {
    position: 'absolute',
    fontSize: 50,
    color: 'white',
  },
  underlayColor: {
    color: '#528056',
  },
});
