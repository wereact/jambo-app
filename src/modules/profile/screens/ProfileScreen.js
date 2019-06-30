import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components/native';
import AsyncStorage from '@react-native-community/async-storage';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { FacebookService } from '~/services';
import { StatusBarManager, CollapsingToolbar } from '~/common/components';
import { ProfileDetails } from '~/modules/profile/components';
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
  width: ${size(130)};
  height: ${size(130)};
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

export function profileScreenConfig() {
  return {
    header: null,
  };
}

const ProfileScreen = props => {
  const { navigation } = props;
  const { navigate } = navigation;

  const handleLogout = async () => {
    AsyncStorage.clear();
    navigate('Authentication', { isLogout: true });
  };

  const profileName = 'Samuel Mataraso';
  const profileEmail = 'samuelmataraso@gmail.com';

  return (
    <CollapsingToolbar headerTitle="Perfil">
      <StatusBarManager />
      <Content>
        <WrapperBackgroundGroup>
          <BackgroundGroup source={imgGroupPeople} />
        </WrapperBackgroundGroup>
        <ContentProfileAvatar>
          <WrapperProfileAvatar>
            <ProfileAvatar source={imgAvatarPlaceHolder} />
          </WrapperProfileAvatar>
        </ContentProfileAvatar>
        <WrapperProfileName>
          <ProfileName>{profileName}</ProfileName>
        </WrapperProfileName>
        <WrapperProfileDetails>
          <ProfileDetails icon="email" detail={profileEmail} />
        </WrapperProfileDetails>
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
