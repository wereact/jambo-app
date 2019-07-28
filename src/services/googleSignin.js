import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Platform, Alert, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from 'react-native-google-signin';
import styled from 'styled-components/native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

import FirebaseService from './firebase';
import { Colors, Metrics, Fonts } from '~/themes';

const { jamboBlue, mediumGrey } = Colors;

const { size } = Metrics;
const { type, typography } = Fonts;

const Wrapper = styled.View``;

const WrapperLogout = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: ${wp('17%')};
`;

const WrapperLogoutIcon = styled.TouchableOpacity`
  padding-top: ${size(5)};
`;

const TextLogout = styled.Text`
  text-align: center;
  font-family: ${type.sf.regular};
  font-size: ${typography.h1};
  color: ${jamboBlue};
`;

const styles = StyleSheet.create({
  buttonSize: {
    width: size(200),
    height: size(48),
  },
});

export default function GoogleSigninService(props) {
  const { navigation } = props;
  const { navigate } = navigation;

  const [isUserSignedIn, setIsUserSignedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState({});
  const [checkingSignedInStatus, setCheckingSignedInStatus] = useState(true);
  const [isSigninInProgress, setIsSigninInProgress] = useState(false);

  /**
   * @name showSignInError
   * @param alertMessage - message to be shown on alert box
   */
  const showSignInError = alertMessage => {
    Alert.alert(
      'Google Signin Error',
      alertMessage,
      [
        {
          text: 'OK',
        },
      ],
      {
        cancelable: false,
      },
    );
  };

  /**
   * @name getGooglePlayServices
   */
  const getGooglePlayServices = async () => {
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      // google services are available
    } catch (err) {
      showSignInError('play services are not available');
    }
  };

  /**
   * @name handleSignInError
   * @param error the SignIn error object
   */
  const handleSignInError = async error => {
    if (error.code) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // showSignInError('User cancelled the login flow.');
        setCheckingSignedInStatus(false);
        setIsSigninInProgress(false);
      } else if (error.code === statusCodes.IN_PROGRESS) {
        showSignInError('Sign in is in progress.');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        await getGooglePlayServices();
      } else {
        showSignInError(JSON.stringify(error));
      }
    } else {
      showSignInError(JSON.stringify(error));
    }
    setIsSigninInProgress(false);
  };

  /**
   * @name onSignInPress
   */
  const onSignInPress = async () => {
    try {
      setIsSigninInProgress(true);
      setCheckingSignedInStatus(true);
      await GoogleSignin.hasPlayServices();
      const loggedInUserObject = await GoogleSignin.signIn();
      FirebaseService.usersQuery(loggedInUserObject);
      setLoggedInUser(loggedInUserObject);
      setIsUserSignedIn(true);
      setIsSigninInProgress(false);
    } catch (error) {
      setCheckingSignedInStatus(false);
      setIsSigninInProgress(false);
      handleSignInError(error);
    }
  };

  /**
   * @name getCurrentUserInfo
   */
  const getCurrentUserInfo = async () => {
    try {
      const loggedInUserObject = await GoogleSignin.signInSilently();
      setLoggedInUser(loggedInUserObject);
    } catch (error) {
      setLoggedInUser({});
    }
  };

  /**
   * @name checkIsUserSignedIn
   */
  const checkIsUserSignedIn = async () => {
    setIsUserSignedIn(false);
    setCheckingSignedInStatus(true);
    const isUserSignedInBool = await GoogleSignin.isSignedIn();
    if (isUserSignedInBool) {
      await getCurrentUserInfo();
    }
    setIsUserSignedIn(isUserSignedInBool);
    setCheckingSignedInStatus(false);
  };

  /**
   * @name signOut
   */
  const signOut = async () => {
    try {
      setCheckingSignedInStatus(true);
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      setIsUserSignedIn(false);
      setLoggedInUser(null);
      AsyncStorage.clear();
      navigate('Authentication', { isLogout: true });
    } catch (error) {
      setCheckingSignedInStatus(false);
      handleSignInError(error);
    }
  };

  const onLogout = () => {
    Alert.alert(
      'Confirmação',
      'Deseja realmente Sair?',
      [
        { text: 'Não', onPress: () => null, style: 'cancel' },
        {
          text: 'Sim',
          onPress: () => signOut(),
        },
      ],
      { cancelable: false },
    );
  };

  const handleShowButton = () => {
    let returnShowButton;
    const userLogin = isUserSignedIn && loggedInUser && loggedInUser.user;
    if (checkingSignedInStatus || isSigninInProgress) {
      returnShowButton = (
        <Wrapper>
          <ActivityIndicator
            size="large"
            color={Platform.OS === 'android' ? jamboBlue : mediumGrey}
          />
        </Wrapper>
      );
    } else if (userLogin) {
      returnShowButton = (
        <Wrapper>
          <WrapperLogout
            onPress={() => onLogout()}
            hitSlop={{
              top: 10,
              left: 10,
              bottom: 10,
              right: 10,
            }}
          >
            <TextLogout>Sair</TextLogout>
            <WrapperLogoutIcon>
              <Icon
                name="logout"
                size={size(20)}
                color="red"
                onPress={() => onLogout()}
              />
            </WrapperLogoutIcon>
          </WrapperLogout>
        </Wrapper>
      );
    } else {
      returnShowButton = (
        <GoogleSigninButton
          style={styles.buttonSize}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={onSignInPress}
          disabled={isSigninInProgress}
        />
      );
    }
    return returnShowButton;
  };

  useEffect(() => {
    GoogleSignin.configure();
    // GoogleSignin.configure({
    //   webClientId:
    //     '862748090723-0jdpa05ri8f7sto53ftg2psv5jst04do.apps.googleusercontent.com',
    // });
    checkIsUserSignedIn();
  }, []);

  return <Wrapper>{handleShowButton()}</Wrapper>;
}

GoogleSigninService.propTypes = {
  navigation: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  ).isRequired,
};
