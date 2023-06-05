import {useNavigation, useRoute} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import uuid from 'react-native-uuid';
import FastImage from 'react-native-fast-image';
import CreatedServicesItem from '../components/admin/created-service-item';
import TextNunito from '../components/text-nunito';
import TextInputComponent from '../components/text-input';
import IconsList from '../components/admin/icons-list';
import AffiliatesApi from '../api/affiliate';
import {setLoading} from '../store/appState/actions';
import {TFetchAffiliate, TService} from '../types';
import {Arrow} from '../assets/images';
import {services as serviceIcons} from '../assets/images';

function EditAffiliateScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigation();
  const {params} = useRoute();
  const {
    id,
    city: paramsCity,
    street: paramsStreet,
    home: paramsHome,
    services: paramsServices,
    uid,
  } = params as Omit<TFetchAffiliate, 'services'> & {services: TService[]};
  const [city, setCity] = useState(paramsCity);
  const [street, setStreet] = useState(paramsStreet);
  const [home, setHome] = useState(paramsHome);
  const [services, setServices] = useState(paramsServices);
  const [isShowServices, setIsShowServices] = useState(false);
  const [isShowForm, setIsShowForm] = useState(false);
  const [newServiceTitle, setNewServiceTitle] = useState('');
  const [newServicePrice, setNewServicePrice] = useState('');
  const [newServiceImage, setNewServiceImage] = useState('');
  const [iconNames, setIconNames] = useState<string[]>([]);

  useEffect(() => {
    setIconNames(Object.keys(serviceIcons));
  }, [serviceIcons]);

  const onSave = async () => {
    const newData = {
      uid: uid ? uid : String(uuid.v4()),
      city,
      street,
      home,
      services,
    };

    dispatch(setLoading(true));

    await AffiliatesApi.saveAffiliate(newData, id);

    dispatch(setLoading(false));

    navigate.goBack();
  };

  const onRemoveService = (serviceUid: string) => {
    setServices(prev => prev?.filter(({uid}) => uid !== serviceUid));
  };

  const onAddService = () => {
    const newService = {
      uid: String(uuid.v4()),
      title: newServiceTitle,
      price: Number(newServicePrice),
      image: newServiceImage,
    };
    setServices(prev => [...prev, newService]);
    setNewServicePrice('');
    setNewServiceTitle('');
    setNewServiceImage('');
  };

  const renderItem = ({item}: {item: TService}) => (
    <CreatedServicesItem item={item} onPress={onRemoveService} />
  );

  const keyExtractor = (item: TService) => item.uid;

  const onShowList = () => {
    if (!services?.length) {
      return (
        <TextNunito weight="Black" styles={styles.textServicesTitle}>
          Список услуг пуст...
        </TextNunito>
      );
    }

    return (
      <FlatList
        scrollEnabled={false}
        data={services}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />
    );
  };

  const showServicesListHandler = () => {
    setIsShowServices(!isShowServices);
  };

  const showFormHandler = () => {
    setIsShowForm(!isShowForm);
  };

  return (
    <View style={styles.wrapper}>
      <ScrollView style={styles.wrapperInner}>
        <TextInputComponent
          value={city}
          onChangeText={setCity}
          styles={styles.input}
          placeholder={'Введите название города...'}
          placeholderTextColor={styles.placeholderTextColor.color}
        />
        <TextInputComponent
          value={street}
          onChangeText={setStreet}
          styles={styles.input}
          placeholder={'Введите название улицы...'}
          placeholderTextColor={styles.placeholderTextColor.color}
        />
        <TextInputComponent
          value={home}
          onChangeText={setHome}
          styles={styles.input}
          placeholder={'Введите номер дома...'}
          placeholderTextColor={styles.placeholderTextColor.color}
          keyboardType={'numeric'}
        />
        <TouchableWithoutFeedback onPress={showServicesListHandler}>
          <View>
            <View style={styles.servicesTitleWrapper}>
              <TextNunito weight="Black" styles={styles.textServicesTitle}>
                Список услуг
              </TextNunito>
              <FastImage
                style={styles.arrowIcon}
                source={Arrow}
                resizeMode={FastImage.resizeMode.contain}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
        {isShowServices && onShowList()}
        <View>
          <TouchableWithoutFeedback onPress={showFormHandler}>
            <View style={styles.addServiceTitle}>
              <TextNunito weight="Bold" styles={styles.addServiceText}>
                Добавить услугу
              </TextNunito>
              <TextNunito weight="Black" styles={styles.addServicePlus}>
                +
              </TextNunito>
            </View>
          </TouchableWithoutFeedback>
          {isShowForm && (
            <>
              <TextInputComponent
                value={newServiceTitle}
                onChangeText={setNewServiceTitle}
                styles={styles.input}
                placeholder={'Введите название услуги...'}
                placeholderTextColor={styles.placeholderTextColor.color}
              />
              <TextInputComponent
                value={newServicePrice}
                onChangeText={setNewServicePrice}
                styles={styles.input}
                placeholder={'Введите стоимость услуги...'}
                placeholderTextColor={styles.placeholderTextColor.color}
                keyboardType={'numeric'}
              />
              <View style={styles.servicesTitleWrapper}>
                <TextNunito weight="Bold" styles={styles.textIconsList}>
                  Выбрать иконку
                </TextNunito>
                <FastImage
                  style={styles.arrowIcon}
                  source={Arrow}
                  resizeMode={FastImage.resizeMode.contain}
                />
              </View>
              <IconsList
                data={iconNames}
                setIcon={setNewServiceImage}
                pickName={newServiceImage}
              />
              <TouchableHighlight
                onPress={onAddService}
                style={styles.addBtn}
                underlayColor={styles.underlayColor.color}>
                <TextNunito weight="Bold" styles={styles.addBtnText}>
                  Добавить
                </TextNunito>
              </TouchableHighlight>
            </>
          )}
        </View>
      </ScrollView>
      <View style={styles.bottomBlock}>
        <TouchableHighlight
          onPress={onSave}
          style={styles.button}
          underlayColor={styles.underlayColor.color}>
          <TextNunito weight="Bold" styles={styles.buttonText}>
            Сохранить
          </TextNunito>
        </TouchableHighlight>
      </View>
    </View>
  );
}

export default EditAffiliateScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  wrapperInner: {
    width: '100%',
    marginBottom: 60,
  },
  input: {
    width: '100%',
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
  servicesTitleWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 15,
  },
  textServicesTitle: {
    color: '#474E68',
    fontSize: 20,
    marginRight: 10,
  },
  arrowIcon: {
    width: 16,
    height: 16,
  },
  addServiceTitle: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  addServiceText: {
    fontSize: 20,
    color: '#474E68',
    marginRight: 15,
  },
  addServicePlus: {
    fontSize: 22,
    color: '#474E68',
  },
  addBtn: {
    backgroundColor: '#FFF',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#5D9C59',
  },
  addBtnText: {
    fontSize: 22,
    color: '#5D9C59',
  },
  textIconsList: {
    color: '#474E68',
    fontSize: 14,
    marginRight: 10,
  },
  bottomBlock: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#f2f2f2',
    width: '100%',
  },
  button: {
    backgroundColor: '#609966',
    padding: 10,
    borderRadius: 30,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 22,
    color: 'white',
  },
  underlayColor: {
    color: '#528056',
  },
});
