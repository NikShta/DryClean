import {useCallback, useState} from 'react';
import {FlatList, StyleSheet, TouchableHighlight, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import AffiliatesApi from '../api/affiliate';
import AffiliatesItem from '../components/admin/affiliates-item';
import TextNunito from '../components/text-nunito';
import {
  AffiliatesScreenNavigationProp,
  ERouterNamesAdmin,
  TFetchAffiliate,
} from '../types';
import {setLoading} from '../store/appState/actions';

function Affiliates() {
  const dispatch = useDispatch();
  const navigate = useNavigation<AffiliatesScreenNavigationProp>();
  const [data, setData] = useState<TFetchAffiliate[]>([]);

  const getAffiliates = async () => {
    dispatch(setLoading(true));
    const affiliatesData = await AffiliatesApi.getAffiliates();

    if (affiliatesData) {
      setData(affiliatesData);
    }

    dispatch(setLoading(false));
  };

  useFocusEffect(
    useCallback(() => {
      getAffiliates();
    }, []),
  );

  const onRemoveAffiliate = async (idAffiliate: string) => {
    dispatch(setLoading(true));
    await AffiliatesApi.removeAffiliate(idAffiliate);
    setData(prev => prev.filter(({id}) => id !== idAffiliate));
    dispatch(setLoading(false));
  };

  const renderItem = ({item}: {item: TFetchAffiliate}) => (
    <AffiliatesItem
      id={item.id}
      uid={item.uid}
      city={item.city}
      street={item.street}
      home={item.home}
      services={item.services}
      removeAffiliate={onRemoveAffiliate}
    />
  );

  const goToScreen = () =>
    navigate.navigate(ERouterNamesAdmin.EDIT_AFFILIATE_SCREEN, {
      uid: '',
      city: '',
      street: '',
      home: '',
      services: [],
    });

  const keyExtractor = (item: TFetchAffiliate) => item.uid;

  return (
    <View style={styles.wrapper}>
      <TextNunito weight="Black" styles={styles.title}>
        Список филиалов
      </TextNunito>
      <FlatList
        data={data}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />
      <View style={styles.bottomBlock}>
        <TouchableHighlight
          onPress={goToScreen}
          style={styles.button}
          underlayColor={styles.underlayColor.color}>
          <TextNunito weight="Bold" styles={styles.buttonText}>
            Добавить новый филиал
          </TextNunito>
        </TouchableHighlight>
      </View>
    </View>
  );
}

export default Affiliates;

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 20,
    flex: 1,
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: 25,
    marginBottom: 10,
    color: '#474E68',
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
