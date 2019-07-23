import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import styled from 'styled-components/native';
import AsyncStorage from '@react-native-community/async-storage';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { FacebookService } from '~/services';
import { db } from '~/config/firebase';
import { StatusBarManager, CollapsingToolbar } from '~/common/components';
import { Metrics, Images, Colors, Fonts } from '~/themes';

const { size } = Metrics;
const { imgAvatarPlaceHolder, imgGroupPeople } = Images;
const { fineBlack, white } = Colors;
const { type, typography } = Fonts;

const Content = styled.View`
  display: flex;
  flex: 1;
`;

const WrapperBackgroundGroup = styled.View`
  position: absolute;
  top: ${size(-80)};
  left: ${size(-15)};
`;

const BackgroundGroup = styled.Image.attrs(() => ({
  resizeMode: 'cover',
  resizeMethod: 'resize',
}))`
  width: ${wp('100%')};
  height: ${hp('40%')};
`;

const ContentProfileAvatar = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const WrapperProfileAvatar = styled.View`
  margin-top: ${hp('15%')};
  border-color: ${white};
  width: ${size(120)};
  height: ${size(119)};
  border-radius: ${size(63)};
  border-width: ${size(2)};
`;

const ProfileAvatar = styled.Image.attrs(() => ({
  resizeMode: 'contain',
  resizeMethod: 'resize',
}))`
  align-self: center;
  width: ${size(115)};
  height: ${size(115)};
  border-radius: ${size(55)};
`;

const WrapperProfileName = styled.View`
  margin-top: ${hp('3%')};
  align-items: center;
  justify-content: center;
`;

const ProfileName = styled.Text`
  text-align: center;
  font-family: ${type.sf.light};
  font-size: ${typography.h1};
  color: ${fineBlack};
  font-weight: 600;
`;

const WrapperProfileDetails = styled.View`
  margin-top: ${hp('5%')};
  margin-bottom: ${hp('3%')};
`;

const WrapperButton = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-end;
  padding-bottom: ${hp('5%')};
`;

const styles = StyleSheet.create({
  shimmerComponent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  postUserImage: {
    width: size(116),
    height: size(115),
    borderRadius: size(63),
    borderColor: white,
    borderWidth: size(2),
  },
});

export function profileScreenConfig() {
  return {
    header: null,
  };
}

const ProfileScreen = props => {
  const { navigation } = props;
  const { navigate } = navigation;

  const [profile, setProfile] = useState(null);
  const [shimmer, setShimmer] = useState(false);

  const handleLogout = async () => {
    AsyncStorage.clear();
    navigate('Authentication', { isLogout: true });
  };

  const queryFirebase = async data => {
    let user;
    let returnAlert;
    db.collection('users')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          if (doc && doc.data().fbId === data.id) {
            user = doc.data();
          }
        });
        if (!user) {
          returnAlert = Alert.alert(
            'Ops!',
            'Ocorreu um problema ao carregar os dados, tenta novamente mais tarde.',
            [{ text: 'OK' }],
            { cancelable: false },
          );
        }
        setProfile(user);
        setShimmer(true);
        return returnAlert;
      })
      .catch(error => {
        console.log('error lol', error);
        return Alert.alert(
          'Ops!',
          'Ocorreu um problema ao carregar os dados, tenta novamente mais tarde.',
          [{ text: 'OK' }],
          { cancelable: false },
        );
      });
  };

  const loadData = async () => {
    const profileFb = await AsyncStorage.getItem('@fb_data');
    queryFirebase(JSON.parse(profileFb));
  };
  useEffect(() => {
    loadData();
  }, []);

  const profileAvatarLoaded = profile && profile.fbPictureUrl;
  const profileNameLoaded = profile && profile.fbName;

  const profileAvatar = profileAvatarLoaded ? profile.fbPictureUrl : null;
  const profileName = profileNameLoaded ? profile.fbName : '';

  return (
    <CollapsingToolbar headerTitle="Perfil" scrollEnabled={false}>
      <StatusBarManager />
      <Content>
        <WrapperBackgroundGroup>
          <BackgroundGroup source={imgGroupPeople} />
        </WrapperBackgroundGroup>
        <ContentProfileAvatar>
          <WrapperProfileAvatar>
            <ShimmerPlaceHolder
              style={styles.postUserImage}
              backgroundColorBehindBorder="white"
              visible={shimmer}
            >
              <ProfileAvatar
                source={
                  profileAvatar ? { uri: profileAvatar } : imgAvatarPlaceHolder
                }
              />
            </ShimmerPlaceHolder>
          </WrapperProfileAvatar>
        </ContentProfileAvatar>
        <WrapperProfileName>
          <ShimmerPlaceHolder
            style={styles.shimmerComponent}
            autoRun
            visible={shimmer}
          >
            {profileName ? <ProfileName>{profileName}</ProfileName> : null}
          </ShimmerPlaceHolder>
        </WrapperProfileName>
        <WrapperProfileDetails />
        <WrapperButton>
          {FacebookService.fbLogout(() => {
            handleLogout();
          })}
        </WrapperButton>
      </Content>
    </CollapsingToolbar>
  );
};

export default ProfileScreen;

ProfileScreen.propTypes = {
  navigation: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  ).isRequired,
};
