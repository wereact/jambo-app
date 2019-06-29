import React, { useEffect } from 'react';
import { ActivityIndicator, Platform } from 'react-native';
import PropTypes from 'prop-types';

import styled from 'styled-components/native';
import { AccessToken } from 'react-native-fbsdk';
import AsyncStorage from '@react-native-community/async-storage';

import { Colors } from '~/themes';

const { jamboBlue, mediumGrey } = Colors;

const Container = styled.View`
  flex: 1;
  background: white;
`;

const WrapperLoading = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const Authentication = props => {
  const { navigation } = props;
  const { navigate, state } = navigation;
  const isLogout = state.params && navigation.state.params.isLogout;

  const getFbToken = async () => {
    let returnFbToken;
    try {
      const fbToken = await AsyncStorage.getItem('@fb_access_token');
      if (fbToken !== null) {
        returnFbToken = true;
      } else {
        returnFbToken = false;
      }
    } catch (e) {
      // error reading value
    }
    return returnFbToken;
  };

  const isLoggedIn = () =>
    new Promise((resolve, reject) => {
      AccessToken.getCurrentAccessToken()
        .then(data => {
          if (data) {
            if (data.accessToken) {
              resolve(true);
            } else {
              resolve(getFbToken());
            }
          } else {
            resolve(getFbToken());
          }
        })
        .catch(err => reject(err));
    });

  useEffect(() => {
    isLoggedIn()
      .then(LoggedIn => {
        navigate(LoggedIn ? 'TabBarStack' : 'LoginScreen');
      })
      .catch(() => {
        console.log('error on auth loading');
      });
  }, [isLogout]);

  return (
    <Container>
      <WrapperLoading>
        <ActivityIndicator
          color={Platform.OS === 'android' ? jamboBlue : mediumGrey}
        />
      </WrapperLoading>
    </Container>
  );
};

export default Authentication;

Authentication.propTypes = {
  navigation: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  ).isRequired,
};
