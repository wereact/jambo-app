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
  const email = item && item.email ? item.email : '';
  const objPicture = item && item.picture && item.picture.data;
  const picture = objPicture ? item.picture.data.url : '';
  await db
    .collection('users')
    .add({
      fbId: id,
      fbName: name,
      fbEmail: email,
      fbPictureUrl: picture,
    })
    .then(() => handleFbDataSave(item, accessToken))
    .catch(error => {
      console.log('error lol', error);
      return Alert.alert(
        'Ops!',
        'Ocorreu um problema ao efetuar o login. Por favor, tenta novamente mais tarde.',
        [{ text: 'OK' }],
        { cancelable: false },
      );
    });
};

const queryFirebase = async (item, accessToken) => {
  let doubleCheck;
  db.collection('users')
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        if (doc && doc.data().fbId === item.id) {
          doubleCheck = true;
        }
      });
      if (doubleCheck) {
        handleFbDataSave(item, accessToken);
      } else {
        mutationFirebase(item, accessToken);
      }
    })
    .catch(error => {
      console.log('error lol', error);
      return Alert.alert(
        'Ops!',
        'Ocorreu um problema ao efetuar o login. Por favor, tenta novamente mais tarde.',
        [{ text: 'OK' }],
        { cancelable: false },
      );
    });
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
                // await mutationFirebase(r, accessToken);
                await queryFirebase(r, accessToken);
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
// let query = usersRef.where('fbId', '==', id);
// OR
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
// TODO - TO GET DATA FROM FB
// axios
//   .get(
//     `https://graph.facebook.com/${id}
//   ?fields=id,name,email,address,birthday,gender
//   &access_token=${accessToken}`,
//   )
//   .then(response => {
//     // handle success
//     console.log('RESPONSE LOL', response);
//   })
//   .catch(error => {
//     // handle error
//     console.log('ERROZADA LOL', error);
//   });
