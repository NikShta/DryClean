import React, {useState} from 'react';
import FastImage from 'react-native-fast-image';
import {
  TouchableWithoutFeedback,
  View,
  FlatList,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Pen, Arrow, Delete} from '../../assets/images';
import {
  AffiliatesScreenNavigationProp,
  ERouterNamesAdmin,
  TFetchAffiliate,
  TService,
} from '../../types';
import ServicesItem from './services-item';
import TextNunito from '../text-nunito';

function AffiliatesItem({
  id,
  uid,
  city,
  street,
  home,
  services,
  removeAffiliate,
}: TFetchAffiliate) {
  const navigate = useNavigation<AffiliatesScreenNavigationProp>();
  const [isShowServices, setIsShowServices] = useState(false);

  const keyExtractor = (item: TService) => item.uid;

  const renderItem = ({item}: {item: TService}) => (
    <ServicesItem
      uid={item.uid}
      title={item.title}
      price={item.price}
      image={item.image}
    />
  );

  const goToScreen = () =>
    navigate.navigate(ERouterNamesAdmin.EDIT_AFFILIATE_SCREEN, {
      id,
      uid,
      city,
      street,
      home,
      services,
    });

  const onRemoveAffiliate = () => removeAffiliate(id);

  const showListHandler = () => setIsShowServices(!isShowServices);

  return (
    <View style={styles.affiliateItemWrapper}>
      <View style={styles.editIconBlock}>
        <TouchableWithoutFeedback onPress={goToScreen}>
          <FastImage
            style={styles.actionIcon}
            source={Pen}
            resizeMode={FastImage.resizeMode.contain}
          />
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.removeIconBlock}>
        <TouchableWithoutFeedback onPress={onRemoveAffiliate}>
          <FastImage
            style={styles.actionIcon}
            source={Delete}
            resizeMode={FastImage.resizeMode.contain}
          />
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.textAddressWrapper}>
        <TextNunito weight="Bold" styles={styles.textAddress}>
          Адрес:
        </TextNunito>
        <TextNunito weight="Black" styles={styles.textAddress}>
          {`${city}, ${street}, ${home}`}
        </TextNunito>
      </View>
      <TouchableWithoutFeedback onPress={showListHandler}>
        <View style={styles.servicesTitleWrapper}>
          <TextNunito weight="Black" styles={styles.textServicesTitle}>
            Список доступных услуг
          </TextNunito>
          <FastImage
            style={styles.serviceIconBtn}
            source={Arrow}
            resizeMode={FastImage.resizeMode.contain}
          />
        </View>
      </TouchableWithoutFeedback>
      {isShowServices && (
        <FlatList
          data={services}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
        />
      )}
    </View>
  );
}

export default AffiliatesItem;

const styles = StyleSheet.create({
  affiliateItemWrapper: {
    borderWidth: 1,
    borderColor: '#474E68',
    padding: 10,
    marginVertical: 5,
    minWidth: '100%',
    borderRadius: 10,
  },
  editIconBlock: {
    position: 'absolute',
    right: 10,
    top: 10,
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
  },
  removeIconBlock: {
    position: 'absolute',
    right: 10,
    top: 50,
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
  },
  actionIcon: {
    width: 20,
    height: 20,
    marginBottom: 5,
  },
  textAddressWrapper: {
    flexDirection: 'row',
    marginBottom: 20,
    maxWidth: '70%',
  },
  textAddress: {
    color: '#474E68',
    fontSize: 16,
    marginRight: 10,
  },
  servicesTitleWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 15,
    maxWidth: '70%',
  },
  serviceIconBtn: {
    width: 16,
    height: 16,
  },
  textServicesTitle: {
    color: '#474E68',
    fontSize: 16,
    marginRight: 10,
  },
});
