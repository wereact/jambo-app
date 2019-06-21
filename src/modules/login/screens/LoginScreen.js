import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components/native';

import { StatusBarManager, Button } from '~/common/components';
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
  justify-content: flex-end;
  padding-bottom: ${size(30)}px;
`;

export function loginScreenConfig() {
  return {
    header: null,
  };
}

const LoginScreen = ({ navigation }) => (
  <Container>
    <SafeArea>
      <StatusBarManager />
      <WrapperLogo>
        <Logo source={logoJambo} />
      </WrapperLogo>
      <WrapperButton>
        <Button
          variant="enable"
          labelText="Logar"
          onPress={() => {
            navigation.navigate('LoginScreen');
          }}
          hitSlop={{
            top: 10,
            left: 10,
            bottom: 10,
            right: 10,
          }}
        />
      </WrapperButton>
    </SafeArea>
  </Container>
);

export default LoginScreen;

LoginScreen.propTypes = {
  navigation: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  ).isRequired,
};
