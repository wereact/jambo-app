import React from 'react';
import { StyleSheet } from 'react-native';

import Icon from 'react-native-vector-icons/Entypo';

import { Colors, Fonts } from '~/themes';

const { white, jamboBlue, fineBlack, fineGrey } = Colors;
const { type, typography } = Fonts;

const styles = StyleSheet.create({
  tabBarLabel: {
    fontFamily: type.sf.medium,
    fontSize: typography.tiny,
  },
  tabBarItem: {
    alignItems: 'center',
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
  },
  tabBar: {
    backgroundColor: white,
  },
});

function tabBarIcon(focused, navigation) {
  const { routeName } = navigation.state;
  const tabBarIconColor = focused ? jamboBlue : fineGrey;
  let returnTabBarIcon;
  if (routeName === 'NewsStack') {
    returnTabBarIcon = <Icon name="news" size={18} color={tabBarIconColor} />;
  } else if (routeName === 'CoursesStack') {
    returnTabBarIcon = (
      <Icon name="open-book" size={18} color={tabBarIconColor} />
    );
  } else if (routeName === 'ProfileStack') {
    returnTabBarIcon = <Icon name="user" size={18} color={tabBarIconColor} />;
  } else {
    returnTabBarIcon = null;
  }
  return returnTabBarIcon;
}

function tabBarOptions() {
  return {
    activeTintColor: fineBlack,
    inactiveTintColor: fineGrey,
    labelStyle: styles.tabBarLabel,
    tabStyle: styles.tabBarItem,
    style: styles.tabBar,
  };
}

export default {
  tabBarIcon,
  tabBarOptions,
};
