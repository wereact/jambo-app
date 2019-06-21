import React, { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';

import styled from 'styled-components/native';
import AsyncStorage from '@react-native-community/async-storage';

const Container = styled.View`
  flex: 1;
  background: white;
`;

const WrapperLoading = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const ScreenTracking = props => {
  const { navigation } = props;
  const { navigate, state } = navigation;
  const isLogout = state.params && navigation.state.params.randomString;

  const getToken = async () => {
    let returnToken;
    try {
      const value = await AsyncStorage.getItem('@access_token');
      if (value !== null) {
        returnToken = navigate('HomeScreen', {});
      } else {
        returnToken = navigate('LoginScreen', {});
      }
    } catch (e) {
      // error reading value
    }
    return returnToken;
  };

  useEffect(() => {
    getToken();
  }, [isLogout]);

  return (
    <Container>
      <WrapperLoading>
        <ActivityIndicator />
      </WrapperLoading>
    </Container>
  );
};

export default ScreenTracking;

ScreenTracking.propTypes = {
  navigation: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  ).isRequired,
};
