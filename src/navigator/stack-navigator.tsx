import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';
import CreateOrderScreen from '../screens/create-order-screen';
import EditAffiliateScreen from '../screens/edit-affiliate';
import LoginScreen from '../screens/login';
import LogupScreen from '../screens/logup';
import OrderScreen from '../screens/order';
import {RootState} from '../store';
import {ERouterNames, ERouterNamesAdmin} from '../types';
import TabNavigatorUser from './tab-navigator';
import TabNavigatorAdmin from './tab-navigator-admin';

const Stack = createNativeStackNavigator();

const screenOptions = {
  headerShown: false,
};

const createOrderScreenOptions = {
  headerShown: true,
};

export function StackNavigator() {
  const isAuth = useSelector((state: RootState) => state.appState.isAuth);
  const isAdmin = useSelector((state: RootState) => state.user.isAdmin);

  const getScreens = (isAdmin: boolean) => {
    if (isAdmin) {
      return (
        <>
          <Stack.Screen
            name={ERouterNamesAdmin.TABS}
            component={TabNavigatorAdmin}
          />
          <Stack.Screen
            name={ERouterNamesAdmin.EDIT_AFFILIATE_SCREEN}
            component={EditAffiliateScreen}
            options={createOrderScreenOptions}
          />
          <Stack.Screen
            name={ERouterNamesAdmin.ORDER_SCREEN}
            component={OrderScreen}
            options={createOrderScreenOptions}
          />
        </>
      );
    }
    return (
      <>
        <Stack.Screen name={ERouterNames.TABS} component={TabNavigatorUser} />
        <Stack.Screen
          name={ERouterNames.CREATE_ORDER_SCREEN}
          component={CreateOrderScreen}
          options={createOrderScreenOptions}
        />
      </>
    );
  };

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      {isAuth ? (
        getScreens(isAdmin)
      ) : (
        <>
          <Stack.Screen
            name={ERouterNames.LOGIN_SCREEN}
            component={LoginScreen}
          />
          <Stack.Screen
            name={ERouterNames.LOGUP_SCREEN}
            component={LogupScreen}
          />
        </>
      )}
    </Stack.Navigator>
  );
}

export default StackNavigator;
