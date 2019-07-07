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
import { db } from '~/config/firebase';

const handleFbDataSave = async (data, accessToken) => {
  await AsyncStorage.setItem('@fb_data', JSON.stringify(data));
  await AsyncStorage.setItem('@fb_access_token', JSON.stringify(accessToken));
  Navigator.navigate('Authentication', { isLogout: false });
};

const mutationFirebase = async (item, accessToken) => {
  const id = item && item.id ? item.id : '';
  const name = item && item.name ? item.name : '';
  const email = item && item.email ? item.email : ''; // check why email dont come
  const objPicture = item && item.picture && item.picture.data;
  const picture = objPicture ? item.picture.data.url : '';
  try {
    await db.ref(`users/ + ${id}`).set({
      fbId: id,
      fbName: name,
      fbEmail: email,
      fbPictureUrl: picture,
    });
    return handleFbDataSave(item, accessToken);
  } catch (err) {
    console.log(`error on query:  + ${err}`);
    return Alert.alert(
      'Ops!',
      'Ocorreu um problema ao efetuar o login. Por favor, tenta novamente mais tarde.',
      [{ text: 'OK' }],
      { cancelable: false },
    );
  }
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

            const responseInfoCallback = async (e, r) => {
              if (error) {
                Alert.alert(
                  'Ops!',
                  'Ocorreu um problema ao efetuar o login. Por favor, tenta novamente mais tarde.',
                  [{ text: 'OK' }],
                  { cancelable: false },
                );
                console.log(`Error fetching data: ${e.toString()}`);
              } else {
                // handleFbDataSave(r, accessToken);
                await mutationFirebase(r, accessToken);
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

// How use Query on Firebase:

// Create a reference to the cities collection
// const usersRef = db.ref('users');

// Create a query against the collection.
// const queryFirebase = async item => {
//   let returnResult;
//   await usersRef.once(
//     'value',
//     snapshot => {
// try {
//         // const data = snapshot.val();
//         // if (data) {
//         //   // Get the data by object
//         //   // const items = Object.values(data);
//         //   returnResult = mutationFirebase(item);
//         // } else {
//         //   returnResult = mutationFirebase(item);
//         // }
// } catch (err) {
//   console.log(`error on query:  + ${err}`);
//   return Alert.alert(
//     'Ops!',
//     'Ocorreu um problema ao efetuar o login. Por favor, tenta novamente mais tarde.',
//     [{ text: 'OK' }],
//     { cancelable: false },
//   );
// }
//       return returnResult;
//     },
//     errorObject => {
//       console.log(`error on query:  + ${errorObject.code}`);
//       return Alert.alert(
//         'Ops!',
//         'Ocorreu um problema ao efetuar o login. Por favor, tenta novamente mais tarde.',
//         [{ text: 'OK' }],
//         { cancelable: false },
//       );
//     },
//   );
// };
