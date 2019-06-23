import { createAppContainer, createStackNavigator } from 'react-navigation';

import { Authentication } from '~/common/components';

import LoginScreen, {
  loginScreenConfig,
} from '~/modules/login/screens/LoginScreen';

import NewsScreen, {
  newsScreenConfig,
} from '~/modules/news/screens/NewsScreen';

const LoginStack = createStackNavigator(
  {
    LoginScreen: {
      screen: LoginScreen,
      navigationOptions: loginScreenConfig,
    },
  },
  {
    headerMode: 'none',
    initialRouteName: 'LoginScreen',
  },
);

const NewsStack = createStackNavigator(
  {
    NewsScreen: {
      screen: NewsScreen,
      navigationOptions: newsScreenConfig,
    },
  },
  {
    initialRouteName: 'NewsScreen',
  },
);

const Navigation = createStackNavigator(
  {
    Authentication: {
      screen: Authentication,
    },
    LoginStack: {
      screen: LoginStack,
    },
    NewsStack: {
      screen: NewsStack,
    },
  },
  {
    headerMode: 'none',
    initialRouteName: 'Authentication',
    defaultNavigationOptions: {
      gesturesEnabled: false,
    },
  },
);

export default createAppContainer(Navigation);
