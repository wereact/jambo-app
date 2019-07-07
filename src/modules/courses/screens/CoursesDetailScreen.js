import React from 'react';
import { Linking } from 'react-native';
import PropTypes from 'prop-types';

import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Share from 'react-native-share';

import { StatusBarManager, Button } from '~/common/components';
import { Metrics, Colors, Fonts, Images } from '~/themes';

const { iPhoneXHelper, size } = Metrics;
const { white, black, jamboBlue, lightGrey, fineGrey, overlay } = Colors;
const { typography, type } = Fonts;
const { imgGroupStudying, imgGroupVideo, iconPlay } = Images;

const WrapperHeaderLeft = styled.TouchableOpacity`
  position: absolute;
  top: ${hp('2%')};
  left: ${wp('5%')};
`;

const WrapperHeaderRight = styled.TouchableOpacity`
  position: absolute;
  top: ${hp('2%')};
  right: ${wp('5%')};
`;

const Container = styled.ScrollView.attrs(() => ({
  showsVerticalScrollIndicator: false,
}))`
  flex: 1;
`;

const SafeArea = styled.SafeAreaView`
  margin-top: ${iPhoneXHelper}px;
  background: ${white};
`;

const Content = styled.View`
  flex: 1;
  padding-top: ${hp('5%')};
  padding-bottom: ${hp('5%')};
`;

const WrapperContent = styled.View`
  flex: 1;
  padding-left: ${wp('5%')};
  padding-right: ${wp('5%')};
`;

const WrapperNewsTitle = styled.View`
  width: ${wp('70%')};
  justify-content: center;
`;

const TextNewsTitle = styled.Text`
  font-size: ${typography.h1}px;
  font-family: ${type.sf.light};
  color: ${black};
  text-align: left;
`;

const WrapperDescription = styled.View`
  width: ${wp('20%')};
  justify-content: center;
  align-items: flex-start;
  margin-top: ${hp('2%')};
`;

const TextDescription = styled.Text.attrs(() => ({
  ellipsizeMode: 'tail',
  numberOfLines: 1,
}))`
  text-align: center;
  font-family: ${type.sf.medium};
  font-size: ${typography.smallMinus};
  color: ${fineGrey};
  font-weight: normal;
`;

const WrapperAuthor = styled.View`
  width: ${wp('30%')};
  justify-content: center;
  align-items: flex-start;
  margin-top: ${hp('2%')};
  margin-bottom: ${hp('1%')};
`;

const TextAuthor = styled.Text.attrs(() => ({
  ellipsizeMode: 'tail',
  numberOfLines: 1,
}))`
  text-align: center;
  font-family: ${type.sf.medium};
  font-size: ${typography.smallMinus};
  color: ${fineGrey};
  font-weight: normal;
`;

const WrapperBody = styled.View`
  flex: 1;
  width: ${wp('85%')};
  margin-top: ${hp('1%')};
`;

const TextBody = styled.Text`
  font-size: ${typography.medium}px;
  font-family: ${type.sf.regular};
  color: ${black};
  text-align: left;
`;

const WrapperBackgroundGroup = styled.View`
  border-bottom-color: ${lightGrey};
  border-bottom-width: ${size(1)};
`;

const BackgroundGroup = styled.Image.attrs(() => ({
  resizeMode: 'cover',
  resizeMethod: 'resize',
}))`
  width: ${wp('100%')};
  height: ${hp('40%')};
`;

const WrapperVideo = styled.View`
  margin-top: ${hp('2%')};
`;

const WrapperVideoTitle = styled.View`
  width: ${wp('20%')};
  justify-content: center;
  align-items: flex-start;
  margin-bottom: ${hp('3%')};
`;

const TextVideoTitle = styled.Text.attrs(() => ({
  ellipsizeMode: 'tail',
  numberOfLines: 1,
}))`
  text-align: center;
  font-family: ${type.sf.medium};
  font-size: ${typography.smallMinus};
  color: ${fineGrey};
  font-weight: normal;
`;

const WrapperVideoThumbnail = styled.View``;

const ImgVideoThumbnail = styled.Image.attrs(() => ({
  resizeMode: 'cover',
  resizeMethod: 'resize',
}))`
  width: ${wp('80%')};
  height: ${hp('40%')};
`;

const WrapperOverlayVideo = styled.TouchableOpacity`
  position: absolute;
  background: ${overlay};
  width: ${wp('90%')};
  height: ${hp('41%')};
  bottom: ${hp('21%')};
  left: ${wp('5%')};
  justify-content: center;
  align-items: center;
`;

const IconPlayVideo = styled.Image.attrs(() => ({
  resizeMode: 'contain',
  resizeMethod: 'resize',
}))`
  width: ${wp('10%')};
  height: ${hp('20%')};
`;

const WrapperCourseButton = styled.View`
  margin-top: ${hp('5%')};
  justify-content: center;
  align-items: center;
  width: ${wp('90%')};
`;

export function coursesDetailScreenConfig() {
  return {
    header: null,
  };
}

const CoursesDetailScreen = ({ navigation }) => {
  const { goBack, state } = navigation;
  const { params } = state;
  const { title, author, body, courseLink, videoLink } = params;
  const shareOptions = {
    title: 'Cursos Jambo!',
    message: `Hey! \n Se liga nesse Curso da Jambo Sobre: ${title}! \n`,
    url: `Link do Curso: ${courseLink}`,
    subject: 'Cursos Jambo!',
    failOnCancel: false,
  };

  return (
    <Container>
      <SafeArea>
        <StatusBarManager />
        <Content>
          <WrapperBackgroundGroup>
            <BackgroundGroup source={imgGroupStudying} />
          </WrapperBackgroundGroup>
          <WrapperContent>
            <WrapperAuthor>
              <TextAuthor>{author}</TextAuthor>
            </WrapperAuthor>
            <WrapperNewsTitle>
              <TextNewsTitle>{title}</TextNewsTitle>
            </WrapperNewsTitle>
            <WrapperDescription>
              <TextDescription>Descrição</TextDescription>
            </WrapperDescription>
            <WrapperBody>
              <TextBody>{body}</TextBody>
            </WrapperBody>
            {videoLink ? (
              <WrapperVideo>
                <WrapperVideoTitle>
                  <TextVideoTitle>Vídeo</TextVideoTitle>
                </WrapperVideoTitle>

                <WrapperVideoThumbnail>
                  <ImgVideoThumbnail source={imgGroupVideo} />
                </WrapperVideoThumbnail>
              </WrapperVideo>
            ) : null}
            <WrapperCourseButton>
              <Button
                onPress={() => Linking.openURL(courseLink)}
                variant="enable"
                labelText="Ir para o Curso"
                widthSquareButton={wp('80%')}
              />
            </WrapperCourseButton>
          </WrapperContent>
          <WrapperHeaderLeft
            onPress={() => goBack()}
            hitSlop={{
              top: 10,
              left: 10,
              bottom: 10,
              right: 10,
            }}
          >
            <Icon name="arrow-left" size={size(18)} color={jamboBlue} />
          </WrapperHeaderLeft>
          <WrapperHeaderRight
            onPress={() => Share.open(shareOptions)}
            hitSlop={{
              top: 10,
              left: 10,
              bottom: 10,
              right: 10,
            }}
          >
            <Icon name="share" size={size(18)} color={jamboBlue} />
          </WrapperHeaderRight>
          {videoLink ? (
            <WrapperOverlayVideo onPress={() => Linking.openURL(videoLink)}>
              <IconPlayVideo source={iconPlay} />
            </WrapperOverlayVideo>
          ) : null}
        </Content>
      </SafeArea>
    </Container>
  );
};

export default CoursesDetailScreen;

CoursesDetailScreen.propTypes = {
  navigation: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  ).isRequired,
};
