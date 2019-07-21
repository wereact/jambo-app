import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components/native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { Metrics, Colors, Fonts } from '~/themes';

const { size } = Metrics;
const { fineBlack, white, fineGrey, jamboBlue } = Colors;
const { type, typography } = Fonts;

const Container = styled.View.attrs(() => ({
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.1,
  shadowRadius: 2,
  elevation: 1,
}))`
  display: flex;
  flex: 1;
  align-items: flex-start;
  height: ${hp('20%')};
  background: white;
  border-radius: ${size(5)};
  padding-left: ${wp('3%')};
  padding-right: ${wp('3%')};
  padding-top: ${hp('3%')};
  padding-bottom: ${hp('3%')};
  margin-left: ${wp('1%')};
  margin-right: ${wp('1%')};
`;

const ContentOnPress = styled.TouchableOpacity`
  display: flex;
  flex: 1;
  align-items: flex-start;
`;

const CategoryBox = styled.View`
  height: ${hp('4%')};
  align-items: center;
  justify-content: center;
  background: ${props => props.color};
  border-radius: ${size(5)};
  padding-left: ${wp('3%')};
  padding-right: ${wp('3%')};
  margin-bottom: ${hp('2%')};
`;

const CategoryName = styled.Text.attrs(() => ({
  ellipsizeMode: 'tail',
  numberOfLines: 1,
}))`
  text-align: center;
  font-family: ${type.sf.semiBold};
  font-size: ${typography.small};
  color: ${white};
  font-weight: 500;
`;

const WrapperTitle = styled.View`
  width: ${wp('70%')};
  justify-content: center;
  margin-bottom: ${hp('2%')};
`;

const TextTitle = styled.Text.attrs(() => ({
  ellipsizeMode: 'tail',
  numberOfLines: 2,
}))`
  text-align: left;
  font-family: ${type.sf.regular};
  font-size: ${typography.small};
  color: ${fineBlack};
  font-weight: 500;
`;

const WrapperDetails = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: ${hp('2%')};
  width: ${wp('80%')};
  align-items: center;
`;

const WrapperDate = styled.View`
  width: ${wp('20%')};
  justify-content: center;
  align-items: flex-start;
`;

const TextDate = styled.Text.attrs(() => ({
  ellipsizeMode: 'tail',
  numberOfLines: 1,
}))`
  text-align: center;
  font-family: ${type.sf.medium};
  font-size: ${typography.smallMinus};
  color: ${fineGrey};
  font-weight: normal;
`;

const WrapperSource = styled.View`
  width: ${wp('30%')};
  justify-content: center;
  align-items: flex-start;
`;

const TextSource = styled.Text.attrs(() => ({
  ellipsizeMode: 'tail',
  numberOfLines: 1,
}))`
  text-align: center;
  font-family: ${type.sf.medium};
  font-size: ${typography.smallMinus};
  color: ${fineGrey};
  font-weight: normal;
`;

export default function Card(props) {
  const { category, categoryColor, title, date, source, onPress } = props;

  return (
    <Container>
      <ContentOnPress onPress={onPress ? () => onPress() : null}>
        <CategoryBox color={!category ? white : categoryColor}>
          <CategoryName>{category.toUpperCase()}</CategoryName>
        </CategoryBox>
        <WrapperTitle>
          <TextTitle>{title}</TextTitle>
        </WrapperTitle>
        <WrapperDetails>
          <WrapperDate>
            <TextDate>{date}</TextDate>
          </WrapperDate>
          <WrapperSource>
            <TextSource>{source}</TextSource>
          </WrapperSource>
        </WrapperDetails>
      </ContentOnPress>
    </Container>
  );
}

Card.defaultProps = {
  category: '',
  categoryColor: jamboBlue,
  title: '',
  date: '',
  source: '',
  onPress: () => {},
};

Card.propTypes = {
  category: PropTypes.string,
  categoryColor: PropTypes.string,
  title: PropTypes.string,
  date: PropTypes.string,
  source: PropTypes.string,
  onPress: PropTypes.func,
};
