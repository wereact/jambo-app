import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { StatusBarManager } from '~/common/components';
import { Metrics, Colors, Fonts } from '~/themes';

const { iPhoneXHelper, size } = Metrics;
const { white, black, jamboBlue, lightGrey, fineGrey } = Colors;
const { typography, type } = Fonts;

const WrapperHeaderTitle = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const HeaderTitle = styled.Text.attrs(() => ({
  ellipsizeMode: 'tail',
  numberOfLines: 1,
}))`
  font-size: ${typography.regular}px;
  font-family: ${type.sf.semiBold};
  color: ${black};
  text-align: center;
`;

const WrapperHeaderLeft = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding-left: ${size(16)};
`;

const WrapperHeaderRight = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding-right: ${size(16)};
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
  padding-left: ${wp('5%')};
  padding-right: ${wp('5%')};
  padding-bottom: ${hp('5%')};
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

const WrapperDetails = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: ${hp('2%')};
  width: ${wp('53%')};
  margin-top: ${hp('1%')};
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
  /* background: black; */
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

export function newsDetailScreenConfig({ navigation }) {
  const { goBack, state } = navigation;
  const { params } = state;
  const { title, link } = params;
  return {
    headerStyle: {
      backgroundColor: white,
      borderBottomColor: lightGrey,
      borderBottomWidth: size(1),
      elevation: 0,
    },
    headerTitle: (
      <WrapperHeaderTitle>
        <HeaderTitle>{title}</HeaderTitle>
      </WrapperHeaderTitle>
    ),
    headerLeft: (
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
    ),
    headerRight: (
      <WrapperHeaderRight
        onPress={link ? () => {} : () => {}}
        hitSlop={{
          top: 10,
          left: 10,
          bottom: 10,
          right: 10,
        }}
        disabled={!link && true}
      >
        {link && <Icon name="share" size={size(18)} color={jamboBlue} />}
      </WrapperHeaderRight>
    ),
    // tabBar: { visible: false },
  };
}

const NewsDetailScreen = ({ navigation }) => {
  const { state } = navigation;
  const { params } = state;
  const { title, date, source, body } = params;
  return (
    <Container>
      <SafeArea>
        <StatusBarManager />
        <Content>
          <WrapperNewsTitle>
            <TextNewsTitle>{title}</TextNewsTitle>
          </WrapperNewsTitle>
          <WrapperDetails>
            <WrapperDate>
              <TextDate>{date}</TextDate>
            </WrapperDate>
            <WrapperSource>
              <TextSource>{source}</TextSource>
            </WrapperSource>
          </WrapperDetails>
          <WrapperBody>
            <TextBody>{body + body}</TextBody>
          </WrapperBody>
        </Content>
      </SafeArea>
    </Container>
  );
};

export default NewsDetailScreen;

NewsDetailScreen.propTypes = {
  navigation: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  ).isRequired,
};
