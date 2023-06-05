import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import BasketScreen from '../screens/basket';
import HomeScreen from '../screens/home';
import ProfileScreen from '../screens/profile';
import {ERouterNames} from '../types';

const Tab = createBottomTabNavigator();

const screenOptions = {
  headerShown: false,
  tabBarStyle: {
    backgroundColor: '#f2f2f2',
    borderTopWidth: 0,
  },
};

function TabNavigatorUser() {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen name={ERouterNames.HOME_SCREEN} component={HomeScreen} />
      <Tab.Screen name={ERouterNames.BASKET_SCREEN} component={BasketScreen} />
      <Tab.Screen
        name={ERouterNames.PROFILE_SCREEN}
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
}

export default TabNavigatorUser;
