import React, { useEffect, useState } from 'react';
import { Platform, BackHandler, Alert, ActivityIndicator } from 'react-native';

import styled from 'styled-components/native';
import {
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager,
} from 'react-native-fbsdk';

import { FacebookService } from '~/services';
import { StatusBarManager } from '~/common/components';
import { Metrics, Colors, Images } from '~/themes';

const { size, iPhoneXHelper } = Metrics;
const { white, jamboBlue, mediumGrey } = Colors;
const { logoJambo, imgLoginFb } = Images;

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

const WrapperLoginFb = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
`;

const ImgLoginFb = styled.Image.attrs(() => ({
  resizeMode: 'contain',
  resizeMethod: 'resize',
}))`
  height: ${size(88)}px;
  width: ${size(214)}px;
  margin-top: ${size(173)};
  margin-bottom: ${size(100)};
`;

export function loginScreenConfig() {
  return {
    header: null,
  };
}

const LoginScreen = () => {
  const [loading, setLoading] = useState(false);
  const handleBackButton = () => true;

  const fbAuth = () => {
    LoginManager.logInWithReadPermissions(['public_profile'])
      .then((result, error) => {
        if (result.isCancelled) {
          setLoading(false);
          console.log('Login Cancelled');
        } else {
          AccessToken.getCurrentAccessToken().then(data => {
            const { accessToken } = data;
            const fbAccessToken = accessToken;

            const responseInfoCallback = async (e, r) => {
              if (error) {
                setLoading(false);
                Alert.alert(
                  'Ops!',
                  'Ocorreu um problema ao efetuar o login. Por favor, tenta novamente mais tarde.',
                  [{ text: 'OK' }],
                  { cancelable: false },
                );
                console.log(`Error fetching data: ${e.toString()}`);
              } else {
                await FacebookService.queryFirebase(r, accessToken);
              }
            };

            const infoRequest = new GraphRequest(
              '/me',
              {
                accessToken: fbAccessToken,
                parameters: {
                  fields: {
                    string: 'id, email, name, picture.type(large)',
                  },
                },
              },
              responseInfoCallback,
            );

            // Start the graph request.
            new GraphRequestManager().addRequest(infoRequest).start();
          });
        }
      })
      .catch(error => {
        console.log('some error occurred!!', error);
      });
  };

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
        <WrapperButton>
          {loading ? (
            <ActivityIndicator
              color={Platform.OS === 'android' ? jamboBlue : mediumGrey}
            />
          ) : (
            <WrapperLoginFb
              onPress={() => {
                setLoading(true);
                fbAuth();
              }}
            >
              <ImgLoginFb source={imgLoginFb} />
            </WrapperLoginFb>
          )}
        </WrapperButton>
      </SafeArea>
    </Container>
  );
};

export default LoginScreen;
