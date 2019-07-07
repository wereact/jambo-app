import React from 'react';
import { Alert } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import {
  LoginButton,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';

import { Navigator } from '~/common/utils';

const handleFbDataSave = async (data, accessToken) => {
  await AsyncStorage.setItem('@fb_data', JSON.stringify(data));
  await AsyncStorage.setItem('@fb_access_token', JSON.stringify(accessToken));
  Navigator.navigate('Authentication', { isLogout: false });
};

function fbLogin() {
  return (
    <LoginButton
      readPermissions={['public_profile']}
      onLoginFinished={(error, result) => {
        if (error) {
          Alert.alert(
            'Ops!',
            'Ocorreu um problema ao efetuar o login. Por favor, tenta novamente mais tarde.',
            [{ text: 'OK' }],
            { cancelable: false },
          );
          console.log(`login has error: ${result.error}`);
        } else if (result.isCancelled) {
          console.log('login is cancelled.');
        } else {
          AccessToken.getCurrentAccessToken().then(data => {
            const { accessToken } = data;
            const fbAccessToken = accessToken;

            const responseInfoCallback = (e, r) => {
              if (error) {
                Alert.alert(
                  'Ops!',
                  'Ocorreu um problema ao efetuar o login. Por favor, tenta novamente mais tarde.',
                  [{ text: 'OK' }],
                  { cancelable: false },
                );
                console.log(`Error fetching data: ${e.toString()}`);
              } else {
                handleFbDataSave(r, accessToken);
              }
            };

            const infoRequest = new GraphRequest(
              '/me',
              {
                accessToken: fbAccessToken,
                parameters: {
                  fields: {
                    string:
                      'id, email, name, picture.type(large), gender, address, birthday,',
                  },
                },
              },
              responseInfoCallback,
            );

            // Start the graph request.
            new GraphRequestManager().addRequest(infoRequest).start();
          });
        }
      }}
    />
  );
}

function fbLogout(callback) {
  return (
    <LoginButton
      onLogoutFinished={() => {
        callback();
      }}
    />
  );
}

export default {
  fbLogin,
  fbLogout,
  handleFbDataSave,
};
