import React, { useEffect } from 'react';

import SplashScreen from 'react-native-splash-screen';

import '~/config/reactotron';
import AppNavigation from '~/navigation';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return <AppNavigation />;
};

export default App;
