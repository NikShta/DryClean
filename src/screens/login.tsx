import {useState} from 'react';
import {Pressable, StyleSheet, TouchableHighlight, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import {useDispatch} from 'react-redux';
import TextInputComponent from '../components/text-input';
import TextNunito from '../components/text-nunito';
import {WashingMachine} from '../assets/images';
import UserApi from '../api/users';
import {setUSerInfo} from '../store/user/actions';
import {setLoading, logIn} from '../store/appState/actions';
import {ERouterNames, LoginScreenNavigationProp} from '../types';

function LoginScreen(): JSX.Element {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const dispatch = useDispatch();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const onLoginUser = async () => {
    if (!login || !password) {
      console.log('заполните все поля');
      return;
    }
    dispatch(setLoading(true));

    const data = await UserApi.logInUser(login, password);

    if (data) {
      dispatch(logIn());
      dispatch(setUSerInfo(data));
    }

    dispatch(setLoading(false));
  };

  const goToScreen = () => navigation.navigate(ERouterNames.LOGUP_SCREEN);

  return (
    <View style={styles.container}>
      <FastImage
        style={styles.icon}
        source={WashingMachine}
        resizeMode={FastImage.resizeMode.contain}
      />
      <TextNunito styles={styles.title} weight="Bold">
        Вход в приложение
      </TextNunito>
      <TextInputComponent
        value={login}
        onChangeText={setLogin}
        styles={styles.input}
        placeholder={'Введите логин...'}
        placeholderTextColor={styles.placeholderTextColor.color}
      />
      <TextInputComponent
        value={password}
        onChangeText={setPassword}
        styles={styles.input}
        placeholder={'Введите пароль...'}
        placeholderTextColor={styles.placeholderTextColor.color}
        secureTextEntry
      />
      <TouchableHighlight
        onPress={onLoginUser}
        style={styles.button}
        underlayColor="#528056">
        <TextNunito weight="Bold" styles={styles.buttonText}>
          Войти
        </TextNunito>
      </TouchableHighlight>
      <Pressable style={styles.bottomBlock} onPress={goToScreen}>
        <TextNunito styles={styles.bottomBlockText}>или</TextNunito>
        <TextNunito styles={styles.bottomBlockText}>
          зарегистрироваться
        </TextNunito>
      </Pressable>
    </View>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 170,
    height: 170,
  },
  title: {
    fontSize: 30,
    marginVertical: 10,
    color: '#474E68',
  },
  input: {
    width: '65%',
    padding: 15,
    backgroundColor: '#F5F8FA',
    marginBottom: 20,
    borderRadius: 30,
    borderWidth: 1,
    fontFamily: 'Nunito-Bold',
    fontSize: 14,
    color: '#474E68',
  },
  placeholderTextColor: {
    color: '#6B728E',
  },
  button: {
    backgroundColor: '#609966',
    padding: 10,
    width: '40%',
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 22,
    color: 'white',
  },
  bottomBlock: {
    alignItems: 'center',
  },
  bottomBlockText: {
    fontSize: 16,
  },
});
