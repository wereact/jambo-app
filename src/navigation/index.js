import React from 'react';

import {
  createAppContainer,
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';
import Icon from 'react-native-vector-icons/Entypo';

import { Authentication } from '~/common/components';

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

import { Colors } from '~/themes';

const { black, jamboBlue } = Colors;

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
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        const tabBarIconColor = focused ? jamboBlue : black;
        let returnTabBarIcon;
        if (routeName === 'NewsStack') {
          returnTabBarIcon = (
            <Icon name="news" size={18} color={tabBarIconColor} />
          );
        } else if (routeName === 'CoursesStack') {
          returnTabBarIcon = (
            <Icon name="open-book" size={18} color={tabBarIconColor} />
          );
        } else if (routeName === 'ProfileStack') {
          returnTabBarIcon = (
            <Icon name="user" size={18} color={tabBarIconColor} />
          );
        } else {
          returnTabBarIcon = null;
        }
        return returnTabBarIcon;
      },
      tabBarOptions: {
        activeTintColor: jamboBlue,
        inactiveTintColor: black,
      },
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
