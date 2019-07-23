import React, { useEffect } from 'react';
import { ActivityIndicator, Platform, Alert } from 'react-native';
import PropTypes from 'prop-types';

import styled from 'styled-components/native';
import { AccessToken } from 'react-native-fbsdk';
import AsyncStorage from '@react-native-community/async-storage';
import { StackActions, NavigationActions } from 'react-navigation';

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
  const { state } = navigation;
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
      console.log('error reading value on getFbToken', e);
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

  const handleResetAction = LoggedIn => {
    let resetAction;
    if (LoggedIn) {
      resetAction = StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({
            routeName: 'TabBarStack',
            params: {},
          }),
        ],
      });
    } else {
      resetAction = StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({
            routeName: 'LoginStack',
            params: {},
          }),
        ],
      });
    }

    return navigation.dispatch(resetAction);
  };

  useEffect(() => {
    isLoggedIn()
      .then(LoggedIn => {
        handleResetAction(LoggedIn);
      })
      .catch(erro => {
        console.log('error on auth loading', erro);
        return Alert.alert(
          'Ops!',
          'Ocorreu um problema ao efetuar o login. Por favor, tenta novamente mais tarde.',
          [{ text: 'OK' }],
          { cancelable: false },
        );
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
