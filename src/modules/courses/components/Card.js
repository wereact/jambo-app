import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

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
  /* background: red; */
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
  /* width: ${wp('50%')}; */
  /* background: red; */
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

export default function Card(props) {
  const { courseImage, courseName, date, author } = props;

  return (
    <Container>
      <ContentOnPress>
        <WrapperCourseImage>
          <ImageCourse
            source={courseImage ? { uri: courseImage } : imgCoursesPlaceHolder}
          />
        </WrapperCourseImage>
        <WrapperDetails>
          <WrapperCourseName>
            <TextCourseName>{courseName}</TextCourseName>
          </WrapperCourseName>
          <WrapperCourseDate>
            <TextCourseDate>{date}</TextCourseDate>
          </WrapperCourseDate>
          <WrapperCourseAuthor>
            <TextCourseAuthor>{author}</TextCourseAuthor>
          </WrapperCourseAuthor>
        </WrapperDetails>
        <WrapperArrowRight>
          <Icon name="arrow-right" size={size(9)} color={fineGrey} />
        </WrapperArrowRight>
      </ContentOnPress>
    </Container>
  );
}

Card.defaultProps = {
  courseImage: '',
  date: '',
  author: '',
};

Card.propTypes = {
  courseImage: PropTypes.string,
  courseName: PropTypes.string.isRequired,
  date: PropTypes.string,
  author: PropTypes.string,
};
