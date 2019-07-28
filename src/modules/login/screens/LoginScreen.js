import React, { useEffect } from 'react';
import { Platform, BackHandler } from 'react-native';
import PropTypes from 'prop-types';

import styled from 'styled-components/native';

import { GoogleSigninService } from '~/services';
import { StatusBarManager } from '~/common/components';
import { Metrics, Colors, Images } from '~/themes';

const { size, iPhoneXHelper } = Metrics;
const { white } = Colors;
const { logoJambo } = Images;

const Container = styled.View`
  flex: 1;
  align-items: center;
  background: ${white};
`;

const WrapperLogo = styled.View`
  flex: 1;
  align-items: center;
`;

const Logo = styled.Image.attrs(() => ({
  resizeMode: 'contain',
  resizeMethod: 'resize',
}))`
  height: ${size(88)}px;
  width: ${size(214)}px;
  margin-top: ${size(173)};
  margin-bottom: ${size(100)};
`;

const SafeArea = styled.SafeAreaView`
  margin-top: ${iPhoneXHelper}px;
  background: ${white};
`;

export function loginScreenConfig() {
  return {
    header: null,
  };
}

const LoginScreen = props => {
  const { navigation } = props;

  const handleBackButton = () => true;

  // Disable Android hardware back button on LoginScreen
  useEffect(() => {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    }
    return () => {
      if (Platform.OS === 'android') {
        BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
      }
    };
  }, []);

  return (
    <Container>
      <SafeArea>
        <StatusBarManager />
        <WrapperLogo>
          <Logo source={logoJambo} />
          <GoogleSigninService navigation={navigation} />
        </WrapperLogo>
      </SafeArea>
    </Container>
  );
};

export default LoginScreen;

LoginScreen.propTypes = {
  navigation: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  ).isRequired,
};
