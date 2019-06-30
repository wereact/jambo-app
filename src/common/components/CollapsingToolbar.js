import React from 'react';
import { Animated, Dimensions, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import styled from 'styled-components/native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { Colors, Metrics, Fonts } from '~/themes';

const { white, black } = Colors;
const { type, typography } = Fonts;

const { iPhoneXHelper, size } = Metrics;

const HEADER_EXPANDED_HEIGHT = hp('15%');
const HEADER_COLLAPSED_HEIGHT = hp('10%');

const { width: SCREEN_WIDTH } = Dimensions.get('screen');

const scrollY = new Animated.Value(0);

const headerHeight = scrollY.interpolate({
  inputRange: [0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT],
  outputRange: [HEADER_EXPANDED_HEIGHT, HEADER_COLLAPSED_HEIGHT],
  extrapolate: 'clamp',
});
const headerTitleOpacity = scrollY.interpolate({
  inputRange: [0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT],
  outputRange: [0, 1],
  extrapolate: 'clamp',
});
const heroTitleOpacity = scrollY.interpolate({
  inputRange: [0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT],
  outputRange: [1, 0],
  extrapolate: 'clamp',
});

const Container = styled.View`
  flex: 1;
  /* align-items: center; */
  background: ${white};
`;

const SafeArea = styled.SafeAreaView`
  margin-top: ${iPhoneXHelper}px;
  background: ${white};
`;

const ScrollContainer = styled.ScrollView.attrs(props => ({
  contentContainerStyle: {
    padding: size(16),
    paddingTop: HEADER_EXPANDED_HEIGHT,
  },
  onScroll: props.onScroll,
  scrollEventThrottle: size(16),
  showsVerticalScrollIndicator: false,
}))``;

const Header = styled(Animated.View).attrs(props => ({
  height: headerHeight,
  backgroundColor: props.background,
  position: 'absolute',
  width: SCREEN_WIDTH,
  top: 0,
  left: 0,
  zIndex: 9999,
}))`
    /* background: lightblue; */
    /* position: absolute; */
    /* width: ${SCREEN_WIDTH}px; */
    /* height: ${props => props.headerHeight}px; */
    /* height: ${HEADER_EXPANDED_HEIGHT}; */
    /* height: 300px; */
    /* top: 0; */
    /* left: 0; */
    /* z-index: 9999; */
  `;

const styles = StyleSheet.create({
  TitleCollapse: {
    textAlign: 'center',
    fontFamily: type.sf.semiBold,
    fontSize: typography.regular,
    marginTop: hp('5%'),
  },
  Title: {
    textAlign: 'center',
    fontFamily: type.sf.semiBold,
    fontSize: hp('5%'),
    position: 'absolute',
    bottom: size(16),
    left: size(16),
  },
});

export default function CollapsingToolbar(props) {
  const { headerTitle, children, background, titleColor } = props;

  return (
    <Container>
      <SafeArea>
        <Header background={background}>
          <Animated.Text
            style={[
              styles.TitleCollapse,
              { opacity: headerTitleOpacity, color: titleColor },
            ]}
          >
            {headerTitle}
          </Animated.Text>
          <Animated.Text
            style={[
              styles.Title,
              { opacity: heroTitleOpacity, color: titleColor },
            ]}
          >
            {headerTitle}
          </Animated.Text>
        </Header>
        <ScrollContainer
          onScroll={Animated.event([
            {
              nativeEvent: {
                contentOffset: {
                  y: scrollY,
                },
              },
            },
          ])}
        >
          {children}
        </ScrollContainer>
      </SafeArea>
    </Container>
  );
}

CollapsingToolbar.defaultProps = {
  background: white,
  titleColor: black,
};

CollapsingToolbar.propTypes = {
  headerTitle: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  ).isRequired,
  background: PropTypes.string,
  titleColor: PropTypes.string,
};
