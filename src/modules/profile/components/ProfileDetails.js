import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { Metrics, Colors, Fonts } from '~/themes';

const { size } = Metrics;
const { fineBlack, heavyGrey } = Colors;
const { type, typography } = Fonts;

const Content = styled.View`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const NameDetail = styled.Text`
  text-align: center;
  font-family: ${type.sf.light};
  font-size: ${typography.regular};
  color: ${fineBlack};
  font-weight: 300;
  margin-left: ${size(5)};
  bottom: ${size(2)};
`;

export default function ProfileDetails(props) {
  const { detail, icon } = props;
  return (
    <Content>
      <Icon name={icon} size={22} color={heavyGrey} />
      <NameDetail>{detail}</NameDetail>
    </Content>
  );
}

ProfileDetails.propTypes = {
  detail: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};
