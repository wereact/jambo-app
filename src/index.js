import React, { useEffect } from 'react';

import SplashScreen from 'react-native-splash-screen';

import '~/config/reactotron';
import AppNavigation from '~/navigation';
import { Navigator } from '~/common/utils';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <AppNavigation
      ref={navigatorRef => Navigator.setTopLevelNavigator(navigatorRef)}
    />
  );
};

export default App;
