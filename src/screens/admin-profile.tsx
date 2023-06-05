import {StyleSheet, TouchableHighlight} from 'react-native';
import {useDispatch} from 'react-redux';
import TextNunito from '../components/text-nunito';
import {logOut} from '../store/appState/actions';
import {removeUserInfo} from '../store/user/actions';

function AdminProfile() {
  const dispatch = useDispatch();

  const userLogOut = () => {
    dispatch(logOut());
    dispatch(removeUserInfo());
  };

  return (
    <TouchableHighlight
      onPress={userLogOut}
      style={styles.button}
      underlayColor={styles.underlayColor.color}>
      <TextNunito weight="Bold" styles={styles.buttonText}>
        Выйти из профиля
      </TextNunito>
    </TouchableHighlight>
  );
}

export default AdminProfile;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#609966',
    padding: 10,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 40,
  },
  buttonText: {
    fontSize: 22,
    color: 'white',
  },
  underlayColor: {color: '#528056'},
});
