import React, { useEffect } from 'react';
import { Platform, BackHandler } from 'react-native';

import styled from 'styled-components/native';

import { FacebookService } from '~/services';
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

const WrapperButton = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-end;
  padding-bottom: ${size(50)}px;
`;

export function loginScreenConfig() {
  return {
    header: null,
  };
}

const LoginScreen = () => {
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
        </WrapperLogo>
        <WrapperButton>{FacebookService.fbLogin(() => {})}</WrapperButton>
      </SafeArea>
    </Container>
  );
};

export default LoginScreen;
