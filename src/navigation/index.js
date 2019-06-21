import { createAppContainer, createStackNavigator } from 'react-navigation';

import LoginScreen from '~/modules/login/screens/LoginScreen';

const LoginStack = createStackNavigator(
  {
    LoginScreen: { screen: LoginScreen },
  },
  {
    headerMode: 'none',
    initialRouteName: 'LoginScreen',
  },
);

const Navigation = createStackNavigator(
  {
    LoginStack: { screen: LoginStack },
  },
  {
    headerMode: 'none',
    initialRouteName: 'LoginStack',
    defaultNavigationOptions: {
      gesturesEnabled: false,
    },
  },
);

export default createAppContainer(Navigation);
