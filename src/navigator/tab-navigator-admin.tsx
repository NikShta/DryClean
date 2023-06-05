import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AdminProfile from '../screens/admin-profile';
import Affiliates from '../screens/affiliates';
import OrdersScreen from '../screens/orders';
import {ERouterNamesAdmin} from '../types';

const Tab = createBottomTabNavigator();

const screenOptions = {
  headerShown: false,
  tabBarStyle: {
    backgroundColor: '#f2f2f2',
    borderTopWidth: 0,
  },
};

function TabNavigatorAdmin() {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name={ERouterNamesAdmin.AFFILIATES_SCREEN}
        component={Affiliates}
      />
      <Tab.Screen
        name={ERouterNamesAdmin.ORDERS_SCREEN}
        component={OrdersScreen}
      />
      <Tab.Screen
        name={ERouterNamesAdmin.ADMIN_PROFILE}
        component={AdminProfile}
      />
    </Tab.Navigator>
  );
}

export default TabNavigatorAdmin;
