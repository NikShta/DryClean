import {useEffect, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import OrderItem from '../components/order-item';
import TextNunito from '../components/text-nunito';
import AffiliatesApi from '../api/affiliate';
import {setLoading} from '../store/appState/actions';
import {
  CreateOrderScreenNavigationProp,
  ERouterNames,
  TAffiliate,
  TService,
} from '../types';
import {RootState} from '../store';
import {affiliateInitialState} from '../utils/constants';
import AffiliateItem from '../components/affiliate-item';
import {addService} from '../store/basket/actions';
import {TServiceObject} from '../store/basket/types';

function CreateOrderScreen() {
  const navigate = useNavigation<CreateOrderScreenNavigationProp>();
  const isLoading = useSelector((state: RootState) => state.appState.isLoading);
  const dispatch = useDispatch();
  const [isShowList, setIsShowList] = useState(false);
  const [data, setData] = useState<TAffiliate[]>([]);
  const [affiliate, setAffiliate] = useState<TAffiliate>(affiliateInitialState);

  const getAffiliatesData = async () => {
    dispatch(setLoading(true));
    const data = await AffiliatesApi.getAffiliates();

    if (data) {
      setData(data);
    }

    dispatch(setLoading(false));
  };

  const onAddService = (
    uid: string,
    title: string,
    image: string,
    price: number,
  ) => {
    const serviceObject: TServiceObject = {
      affiliateUid: affiliate.uid,
      affiliateAddress: `${affiliate.city}, ${affiliate.street}, ${affiliate.home}`,
      service: {
        title,
        serviceUid: uid,
        image,
        price,
      },
    };
    dispatch(addService(serviceObject));
  };

  useEffect(() => {
    getAffiliatesData();
  }, []);

  const renderOrderItem = ({item}: {item: TService}) => (
    <OrderItem item={item} onPress={onAddService} />
  );

  const onSetAffiliateItem = (item: TAffiliate) => {
    setAffiliate(item);
    setIsShowList(false);
  };

  const renderAffiliateItem = ({item}: {item: TAffiliate}) => (
    <AffiliateItem
      item={item}
      onPress={onSetAffiliateItem}
      stylesItem={styles.affiliateItem}
      stylesText={styles.affiliatesText}
      city={item.city}
      street={item.street}
      home={item.home}
    />
  );

  const showListHandler = () => setIsShowList(!isShowList);

  const goToScreen = () => navigate.navigate(ERouterNames.BASKET_SCREEN);

  const keyExtractorAffiliates = (item: TAffiliate) => item.uid;

  const keyExtractorServices = (item: TService) => item.uid;

  return (
    <View style={styles.wrapper}>
      <TouchableWithoutFeedback
        onPress={showListHandler}
        style={styles.affiliatesWrapper}
        disabled={isLoading}>
        <View style={styles.affiliateBlock}>
          <TextNunito styles={styles.affiliatesText}>{`${
            affiliate.city
              ? `${affiliate.city}, ${affiliate.street} ${affiliate.home}`
              : 'Выберите город'
          }`}</TextNunito>
          {isShowList && (
            <FlatList
              data={data}
              keyExtractor={keyExtractorAffiliates}
              renderItem={renderAffiliateItem}
            />
          )}
        </View>
      </TouchableWithoutFeedback>
      {affiliate.services && !isShowList && (
        <FlatList
          style={styles.list}
          data={affiliate.services}
          numColumns={2}
          columnWrapperStyle={styles.itemsWrapper}
          keyExtractor={keyExtractorServices}
          renderItem={renderOrderItem}
        />
      )}
      <View style={styles.bottomBlock}>
        <TouchableHighlight
          onPress={goToScreen}
          style={styles.button}
          underlayColor={styles.underlayColor.color}>
          <TextNunito weight="Bold" styles={styles.buttonText}>
            Перейти в корзину
          </TextNunito>
        </TouchableHighlight>
      </View>
    </View>
  );
}

export default CreateOrderScreen;

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 20,
    alignItems: 'center',
    height: '100%',
  },
  affiliateBlock: {
    backgroundColor: '#fff',
    alignSelf: 'stretch',
    marginTop: 20,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#6B728E',
    marginBottom: 30,
  },
  affiliatesWrapper: {
    marginBottom: 30,
  },
  affiliateItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#6B728E',
  },
  affiliatesText: {
    fontSize: 20,
  },
  itemsWrapper: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  list: {
    marginBottom: 10,
    height: '90%',
  },
  bottomBlock: {
    position: 'absolute',
    bottom: 0,
    paddingTop: 10,
    backgroundColor: '#f2f2f2',
    width: '100%',
  },
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
