import {NavigationContainer} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import Loader from '../components/loader';
import {RootState} from '../store';
import StackNavigator from './stack-navigator';

function RootNavigator() {
  const isLoading = useSelector((state: RootState) => state.appState.isLoading);

  return (
    <>
      {isLoading && <Loader />}
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </>
  );
}

export default RootNavigator;
