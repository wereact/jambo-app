import { Alert } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import uuidv4 from 'uuid/v4';

import { Navigator } from '~/common/utils';
import { db } from '~/config/firebase';

const handleSaveData = async (data, idToken) => {
  await AsyncStorage.setItem('@user_data', JSON.stringify(data));
  await AsyncStorage.setItem('@idToken', JSON.stringify(idToken));
  Navigator.navigate('Authentication', { isLogout: false });
};

const usersMutation = async item => {
  const idToken = item && item.idToken ? item.idToken : '';
  const id = item && item.user && item.user.id ? item.user.id : '';
  const name = item && item.user && item.user.name ? item.user.name : '';
  const email = item && item.user && item.user.email ? item.user.email : '';
  const photo = item && item.user && item.user.photo ? item.user.photo : '';

  await db
    .collection('users')
    .add({
      id: uuidv4(),
      googleId: id,
      name,
      email,
      photo,
    })
    .then(() => handleSaveData(item, idToken))
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

const usersQuery = async item => {
  let doubleCheck;
  db.collection('users')
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        if (doc && doc.data().googleId === item.user.id) {
          doubleCheck = true;
        }
      });
      if (doubleCheck) {
        handleSaveData(item, item.idToken);
      } else {
        usersMutation(item);
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

export default {
  usersQuery,
  usersMutation,
};
