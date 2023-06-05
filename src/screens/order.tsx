import {useNavigation, useRoute} from '@react-navigation/native';
import {useState} from 'react';
import {
  ListRenderItem,
  SectionList,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';
import ServiceItem from '../components/admin/service-item-order';
import StatusTab from '../components/admin/statusTab';
import TextInputComponent from '../components/text-input';
import TextNunito from '../components/text-nunito';
import {TBasketItem, TPostOrder} from '../types';
import {orderAdminStatus} from '../utils/constants';
import {useOrder} from '../utils/hooks';
import UserApi from '../api/users';

function OrderScreen() {
  const navigate = useNavigation();
  const {params} = useRoute();
  const {
    id,
    userId,
    userFirstName,
    userLastName,
    totalCost,
    status,
    order,
    reason,
  } = params as TPostOrder;
  const [userFirstNameValue, setUserFirstNameValue] = useState(userFirstName);
  const [userLastNameValue, setUserLastNameValue] = useState(userLastName);
  const [totalCostValue, setTotalCostValue] = useState(totalCost);
  const [statusValue, setStatusValue] = useState(status);
  const [reasonValue, setReasonValue] = useState(reason);
  const {changeOrder} = useOrder();

  const renderStatusItems = (status: string, index: number) => (
    <StatusTab
      key={status}
      index={index}
      status={status}
      isActive={index === statusValue}
      onPress={setStatusValue}
    />
  );

  const renderItem: ListRenderItem<TBasketItem> = ({item}) => (
    <ServiceItem item={item} />
  );

  const renderHeaderITem = ({section: {title}}: {section: {title: string}}) => (
    <TextNunito styles={styles.sectionHeaderText}>{title}</TextNunito>
  );

  const onSaveChanges = async () => {
    const data = {
      userFirstName: userFirstNameValue,
      userLastName: userLastNameValue,
      status: statusValue,
      reason: statusValue === 3 ? reasonValue : '',
    };

    await changeOrder(data, id);

    if (statusValue === 3) {
      await UserApi.changeDeposit(totalCost, userId);
    }

    navigate.goBack();
  };

  return (
    <View style={styles.wrapper}>
      <SectionList
        style={styles.servicesList}
        sections={order}
        stickySectionHeadersEnabled={false}
        renderSectionHeader={renderHeaderITem}
        renderItem={renderItem}
        ListHeaderComponent={
          <View>
            <TextInputComponent
              value={userFirstNameValue}
              onChangeText={setUserFirstNameValue}
              styles={styles.input}
              placeholder={'Имя заказчика'}
              placeholderTextColor={styles.placeholderTextColor.color}
            />
            <TextInputComponent
              value={userFirstNameValue}
              onChangeText={setUserFirstNameValue}
              styles={styles.input}
              placeholder={'Имя заказчика'}
              placeholderTextColor={styles.placeholderTextColor.color}
            />
            <TextInputComponent
              value={userLastNameValue}
              onChangeText={setUserLastNameValue}
              styles={styles.input}
              placeholder={'Фамилия заказчика'}
              placeholderTextColor={styles.placeholderTextColor.color}
            />
            <TextInputComponent
              value={String(totalCostValue)}
              onChangeText={setTotalCostValue}
              styles={styles.input}
              placeholder={'Стоимость заказа'}
              placeholderTextColor={styles.placeholderTextColor.color}
              keyboardType={'numeric'}
            />
            <View style={styles.fieldWrapper}>
              <TextNunito styles={styles.textField}>Статус заказа:</TextNunito>
              {orderAdminStatus.map(renderStatusItems)}
            </View>
            {statusValue === 3 && (
              <TextInput
                value={reasonValue}
                multiline={true}
                numberOfLines={4}
                placeholder="Введите причину отказа..."
                onChangeText={setReasonValue}
                style={styles.textInput}
              />
            )}
            <TextNunito weight="Black" styles={styles.ServicesTitle}>
              Услуги
            </TextNunito>
          </View>
        }
      />
      <View style={styles.bottomBlock}>
        <TouchableHighlight
          onPress={onSaveChanges}
          style={styles.bottomButton}
          underlayColor={styles.underlayColor.color}>
          <TextNunito weight="Bold" styles={styles.bottomButtonText}>
            Отправить заказ
          </TextNunito>
        </TouchableHighlight>
      </View>
    </View>
  );
}

export default OrderScreen;

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 20,
    flex: 1,
    alignItems: 'center',
  },
  fieldWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    alignItems: 'center',
  },
  textField: {
    fontSize: 16,
    color: '#474E68',
  },
  textInfoWrapper: {
    backgroundColor: '#FFF',
    padding: 5,
    borderRadius: 10,
  },
  input: {
    width: '100%',
    padding: 15,
    backgroundColor: '#F5F8FA',
    marginBottom: 20,
    borderRadius: 15,
    borderWidth: 1,
    fontFamily: 'Nunito-Bold',
    fontSize: 14,
    color: '#474E68',
  },
  placeholderTextColor: {
    color: '#6B728E',
  },
  bottomBlock: {
    position: 'absolute',
    bottom: 0,
    paddingTop: 10,
    backgroundColor: '#f2f2f2',
    width: '100%',
  },
  bottomButton: {
    backgroundColor: '#609966',
    padding: 10,
    borderRadius: 30,
    alignItems: 'center',
  },
  bottomButtonText: {
    fontSize: 22,
    color: 'white',
  },
  underlayColor: {
    color: '#528056',
  },
  servicesList: {
    width: '100%',
    marginBottom: 50,
  },
  ServicesTitle: {
    fontSize: 20,
    marginVertical: 20,
    color: '#474E68',
  },
  sectionHeaderText: {
    fontSize: 18,
    marginBottom: 5,
    color: '#474E68',
  },
  textInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginTop: 15,
    paddingVertical: 30,
  },
});
