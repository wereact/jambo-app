import {
  createAppContainer,
  createStackNavigator,
  createBottomTabNavigator,
  NavigationActions,
} from 'react-navigation';
import { Platform } from 'react-native';

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

import CoursesDetailScreen, {
  coursesDetailScreenConfig,
} from '~/modules/courses/screens/CoursesDetailScreen';

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
    CoursesDetailScreen: {
      screen: CoursesDetailScreen,
      navigationOptions: coursesDetailScreenConfig,
    },
  },
  {
    initialRouteName: 'CoursesScreen',
  },
);

CoursesStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  const statsIsNotEmpty = navigation.state.index > 0;
  const stateOnRoute1 = navigation.state.routes[1];
  const route1Name = stateOnRoute1
    ? stateOnRoute1.routeName === 'CoursesDetailScreen'
    : false;
  if (statsIsNotEmpty && stateOnRoute1 && route1Name) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};

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

// Disable Android hardware back button on specifics screens
if (Platform.OS === 'android') {
  const defaultGetStateForAction = Navigation.router.getStateForAction;

  Navigation.router.getStateForAction = (action, state) => {
    const { type } = action;
    const androidBack = NavigationActions.BACK;

    const screen = state ? state.routes[state.index] : null;
    const tab = screen && screen.routes ? screen.routes[screen.index] : null;
    const tbScreen = tab && tab.routes ? tab.routes[tab.index] : null;

    const NewsTab = tab && tab.routeName === 'NewsStack';
    const NewsTabScreen = tbScreen && tbScreen.routeName === 'NewsScreen';
    const CoursesTab = tab && tab.routeName === 'CoursesStack';
    const CoursesTabScreen = tbScreen && tbScreen.routeName === 'CoursesScreen';
    const ProfileTab = tab && tab.routeName === 'ProfileStack';
    const ProfileTabScreen = tbScreen && tbScreen.routeName === 'ProfileScreen';

    const someNews = NewsTab || NewsTabScreen;
    const someCourses = CoursesTab || CoursesTabScreen;
    const someProfile = ProfileTab || ProfileTabScreen;
    const isDisable = someNews || someCourses || someProfile;

    if (type === androidBack && isDisable) {
      // Option 1: will close the application
      // return null;

      // Option 2: will keep the app open
      const newRoutes = state.routes.filter(
        r => r.routeName !== 'Authentication',
      );
      const newIndex = newRoutes.length - 1;

      return defaultGetStateForAction(action, {
        index: newIndex,
        routes: newRoutes,
      });
    }

    return defaultGetStateForAction(action, state);
  };
}

export default createAppContainer(Navigation);
