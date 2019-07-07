import {
  createAppContainer,
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';

import { Authentication, TabBar } from '~/common/components';

import LoginScreen, {
  loginScreenConfig,
} from '~/modules/login/screens/LoginScreen';

import NewsScreen, {
  newsScreenConfig,
} from '~/modules/news/screens/NewsScreen';

import NewsDetailScreen, {
  newsDetailScreenConfig,
} from '~/modules/news/screens/NewsDetailScreen';

import CoursesScreen, {
  coursesScreenConfig,
} from '~/modules/courses/screens/CoursesScreen';

import ProfileScreen, {
  profileScreenConfig,
} from '~/modules/profile/screens/ProfileScreen';

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
    NewsDetailScreen: {
      screen: NewsDetailScreen,
      navigationOptions: newsDetailScreenConfig,
    },
  },
  {
    initialRouteName: 'NewsScreen',
  },
);

NewsStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  const statsIsNotEmpty = navigation.state.index > 0;
  const stateOnRoute1 = navigation.state.routes[1];
  const route1Name = stateOnRoute1
    ? stateOnRoute1.routeName === 'NewsDetailScreen'
    : false;
  if (statsIsNotEmpty && stateOnRoute1 && route1Name) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};

const CoursesStack = createStackNavigator(
  {
    CoursesScreen: {
      screen: CoursesScreen,
      navigationOptions: coursesScreenConfig,
    },
  },
  {
    initialRouteName: 'CoursesScreen',
  },
);

const ProfileStack = createStackNavigator(
  {
    ProfileScreen: {
      screen: ProfileScreen,
      navigationOptions: profileScreenConfig,
    },
  },
  {
    initialRouteName: 'ProfileScreen',
  },
);

const TabBarStack = createBottomTabNavigator(
  {
    NewsStack: {
      screen: NewsStack,
      navigationOptions: {
        title: 'Notícias',
      },
    },
    CoursesStack: {
      screen: CoursesStack,
      navigationOptions: {
        title: 'Cursos',
      },
    },
    ProfileStack: {
      screen: ProfileStack,
      navigationOptions: {
        title: 'Meu Perfil',
      },
    },
  },
  {
    initialRouteName: 'NewsStack',
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => TabBar.tabBarIcon(focused, navigation),
      tabBarOptions: TabBar.tabBarOptions(),
    }),
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
    TabBarStack: {
      screen: TabBarStack,
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
