import {useState} from 'react';
import {Pressable, StyleSheet, TouchableHighlight, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import {useDispatch} from 'react-redux';
import uuid from 'react-native-uuid';
import TextInputComponent from '../components/text-input';
import TextNunito from '../components/text-nunito';
import {WashingMachine} from '../assets/images';
import UserApi from '../api/users';
import {setUSerInfo} from '../store/user/actions';
import {setLoading, logIn} from '../store/appState/actions';
import {ERouterNames, LogupScreenNavigationProp} from '../types';

function LogupScreen(): JSX.Element {
  const navigation = useNavigation<LogupScreenNavigationProp>();
  const dispatch = useDispatch();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const onLogupUser = async () => {
    if (!login || !password || !password || !password) {
      console.log('заполните все поля');

      return;
    }

    dispatch(setLoading(true));

    const newUserInfo = {
      uid: String(uuid.v4()),
      login,
      password,
      firstName,
      lastName,
      deposit: 0,
      isAdmin: false,
    };

    const data = await UserApi.logUpUser(newUserInfo);

    if (data) {
      dispatch(logIn());
      dispatch(setUSerInfo(data));
    }

    dispatch(setLoading(false));
  };

  const goToScreen = () => navigation.navigate(ERouterNames.LOGIN_SCREEN);

  return (
    <View style={styles.container}>
      <FastImage
        style={styles.icon}
        source={WashingMachine}
        resizeMode={FastImage.resizeMode.contain}
      />
      <TextNunito styles={styles.title} weight="bold">
        Регистрация в приложение
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
      <TextInputComponent
        value={firstName}
        onChangeText={setFirstName}
        styles={styles.input}
        placeholder={'Введите имя...'}
        placeholderTextColor={styles.placeholderTextColor.color}
      />
      <TextInputComponent
        value={lastName}
        onChangeText={setLastName}
        styles={styles.input}
        placeholder={'Введите фамилию...'}
        placeholderTextColor={styles.placeholderTextColor.color}
      />
      <TouchableHighlight
        onPress={onLogupUser}
        style={styles.button}
        underlayColor="#528056">
        <TextNunito weight="Bold" styles={styles.buttonText}>
          Зарегистрировать
        </TextNunito>
      </TouchableHighlight>
      <Pressable style={styles.bottomBlock} onPress={goToScreen}>
        <TextNunito styles={styles.bottomBlockText}>или</TextNunito>
        <TextNunito styles={styles.bottomBlockText}>войти</TextNunito>
      </Pressable>
    </View>
  );
}

export default LogupScreen;

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
    textAlign: 'center',
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
    minWidth: '40%',
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
