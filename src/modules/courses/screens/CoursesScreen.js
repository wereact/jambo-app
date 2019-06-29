import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components/native';
import AsyncStorage from '@react-native-community/async-storage';

import { FacebookService } from '~/services';
import { StatusBarManager } from '~/common/components';
import { Metrics, Colors } from '~/themes';

const { size, iPhoneXHelper } = Metrics;
const { white } = Colors;

const Container = styled.View`
  flex: 1;
  align-items: center;
  background: ${white};
`;

const SafeArea = styled.SafeAreaView`
  margin-top: ${iPhoneXHelper}px;
  background: ${white};
`;

const WrapperButton = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-end;
  padding-bottom: ${size(50)}px;
`;

const ExampleText = styled.Text``;

export function coursesScreenConfig() {
  //   return {
  //     header: null,
  //   };
}

const CoursesScreen = props => {
  const { navigation } = props;
  const { navigate } = navigation;

  const handleLogout = async () => {
    AsyncStorage.clear();
    navigate('Authentication', { isLogout: true });
  };

  return (
    <Container>
      <SafeArea>
        <StatusBarManager />
        <ExampleText>CoursesScreen</ExampleText>
        <WrapperButton>
          {FacebookService.fbLogout(() => {
            handleLogout();
          })}
        </WrapperButton>
      </SafeArea>
    </Container>
  );
};

export default CoursesScreen;

CoursesScreen.propTypes = {
  navigation: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  ).isRequired,
};
