import React from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { Metrics, Colors, Fonts, Images } from '~/themes';

const { size } = Metrics;
const { fineBlack, white, fineGrey, lightGrey } = Colors;
const { type, typography } = Fonts;
const { imgCoursesPlaceHolder } = Images;

const Container = styled.View.attrs(() => ({
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.1,
  shadowRadius: 2,
  elevation: 1,
}))`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
  height: ${hp('20%')};
  background: ${white};
  border-radius: ${size(5)};
  padding-right: ${wp('3%')};
  margin-left: ${wp('1%')};
  margin-right: ${wp('1%')};
`;

const ContentOnPress = styled.TouchableOpacity`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

const WrapperCourseImage = styled.View`
  width: ${wp('20%')};
  height: ${hp('20%')};
  background: transparent;
  border-top-left-radius: ${size(5)};
  border-bottom-left-radius: ${size(5)};
  border-right-color: ${lightGrey};
  border-right-width: 1;
`;

const ImageCourse = styled.Image.attrs(() => ({
  resizeMode: 'contain',
  resizeMethod: 'resize',
}))`
  width: ${wp('20%')};
  height: ${hp('20%')};
`;

const WrapperDetails = styled.View`
  flex-direction: column;
  justify-content: center;
  padding-top: ${hp('2%')};
  padding-bottom: ${hp('2%')};
  padding-left: ${wp('7%')};
  width: ${wp('80%')};
`;

const WrapperCourseName = styled.View`
  margin-bottom: ${hp('2%')};
  width: ${wp('50%')};
`;

const TextCourseName = styled.Text.attrs(() => ({
  ellipsizeMode: 'tail',
  numberOfLines: 2,
}))`
  text-align: left;
  font-family: ${type.sf.regular};
  font-size: ${typography.small};
  color: ${fineBlack};
  font-weight: 500;
`;

const WrapperCourseDate = styled.View`
  margin-bottom: ${hp('2%')};
`;

const TextCourseDate = styled.Text.attrs(() => ({
  ellipsizeMode: 'tail',
  numberOfLines: 1,
}))`
  text-align: left;
  font-family: ${type.sf.medium};
  font-size: ${typography.smallMinus};
  color: ${fineGrey};
  font-weight: normal;
`;

const WrapperCourseAuthor = styled.View`
  width: ${wp('40%')};
  height: ${hp('4%')};
  align-items: center;
  justify-content: center;
  border-color: ${lightGrey};
  border-width: 1;
  border-radius: ${size(5)};
`;

const TextCourseAuthor = styled.Text.attrs(() => ({
  ellipsizeMode: 'tail',
  numberOfLines: 1,
}))`
  text-align: left;
  font-family: ${type.sf.medium};
  font-size: ${typography.smallMinus};
  color: ${fineGrey};
  font-weight: normal;
`;

const WrapperArrowRight = styled.View`
  position: absolute;
  top: ${hp('8.3%')};
  right: ${wp('3%')};
`;

const styles = StyleSheet.create({
  shimmerComponent: {
    alignSelf: 'stretch',
    marginBottom: 10,
    width: wp('50%'),
  },
  postUserImage: {
    width: wp('20%'),
    height: hp('20%'),
    borderTopLeftRadius: size(5),
    borderBottomLeftRadius: size(5),
    borderRightColor: lightGrey,
    borderRightWidth: 1,
  },
});

export default function Card(props) {
  const { imageLink, name, date, authorName, shimmer, onPress } = props;

  return (
    <Container>
      <ContentOnPress onPress={onPress ? () => onPress() : null}>
        <WrapperCourseImage>
          <ShimmerPlaceHolder
            style={styles.postUserImage}
            backgroundColorBehindBorder="white"
            visible={shimmer}
          >
            <ImageCourse
              source={imageLink ? { uri: imageLink } : imgCoursesPlaceHolder}
            />
          </ShimmerPlaceHolder>
        </WrapperCourseImage>
        <WrapperDetails>
          <WrapperCourseName>
            <ShimmerPlaceHolder
              style={styles.shimmerComponent}
              autoRun
              visible={shimmer}
            >
              <TextCourseName>{name}</TextCourseName>
            </ShimmerPlaceHolder>
          </WrapperCourseName>
          <WrapperCourseDate>
            <ShimmerPlaceHolder
              style={styles.shimmerComponent}
              autoRun
              visible={shimmer}
            >
              <TextCourseDate>{date}</TextCourseDate>
            </ShimmerPlaceHolder>
          </WrapperCourseDate>
          {!shimmer && (
            <ShimmerPlaceHolder
              style={styles.shimmerComponent}
              autoRun
              visible={shimmer}
            >
              <TextCourseAuthor>{authorName}</TextCourseAuthor>
            </ShimmerPlaceHolder>
          )}
          {shimmer && (
            <WrapperCourseAuthor>
              <TextCourseAuthor>{authorName}</TextCourseAuthor>
            </WrapperCourseAuthor>
          )}
        </WrapperDetails>
        {shimmer && (
          <WrapperArrowRight>
            <Icon name="arrow-right" size={size(9)} color={fineGrey} />
          </WrapperArrowRight>
        )}
      </ContentOnPress>
    </Container>
  );
}

Card.defaultProps = {
  imageLink: '',
  date: '',
  authorName: '',
  shimmer: false,
  onPress: () => {},
};

Card.propTypes = {
  imageLink: PropTypes.string,
  name: PropTypes.string.isRequired,
  date: PropTypes.string,
  authorName: PropTypes.string,
  shimmer: PropTypes.bool,
  onPress: PropTypes.func,
};
