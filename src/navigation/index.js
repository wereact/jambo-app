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
  },
  {
    initialRouteName: 'NewsScreen',
  },
);

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
