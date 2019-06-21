import React from 'react';
import PropTypes from 'prop-types';

import Touchable from 'react-native-platform-touchable';

import styled from 'styled-components/native';

import { Metrics, Colors, Fonts, Images } from '~/themes';

const { size, pw } = Metrics;
const { jamboBlue, lightGrey, white, mediumGrey } = Colors;
const { typography, type } = Fonts;
const { gifLoadingWhite } = Images;

const SquareButton = styled(Touchable)`
  padding: ${size(14)}px ${size(62)}px ${size(14)}px ${size(62)}px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: ${size(10)}px;
  margin-bottom: ${size(10)}px;
  background: ${props => props.buttonColor};
  border-radius: ${size(5)}px;
  width: ${props => props.widthSquareButton};
`;

const DisabledButton = styled(SquareButton)`
  background: ${props => props.disabledButtonColor};
`;

const FullButton = styled(SquareButton)`
  width: ${pw(100)};
  border-radius: ${size(0)}px;
`;

const LabelButton = styled.Text`
  font-size: ${typography.regular};
  color: ${props => props.labelColor};
  font-family: ${type.sf.semiBold};
`;

const DisableLabelButton = styled(LabelButton)`
  color: ${props => props.disabledLabelColor};
`;

const WrapperGifLoading = styled.View`
  padding-top: ${size(10)};
  padding-bottom: ${size(3)};
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const GifLoading = styled.Image``;

export default function Button(props) {
  const {
    variant,
    labelText,
    onPress,
    buttonColor,
    labelColor,
    widthSquareButton,
    loading,
  } = props;
  const renderSquareButton = () => (
    <SquareButton
      onPress={onPress ? () => onPress() : null}
      buttonColor={buttonColor}
      hitSlop={{
        top: 10,
        left: 10,
        bottom: 10,
        right: 10,
      }}
      widthSquareButton={widthSquareButton}
    >
      {loading ? (
        <WrapperGifLoading>
          <GifLoading source={gifLoadingWhite} />
        </WrapperGifLoading>
      ) : (
        <LabelButton labelColor={labelColor}>{labelText}</LabelButton>
      )}
    </SquareButton>
  );
  const renderDisabledButton = () => (
    <DisabledButton>
      {loading ? (
        <WrapperGifLoading>
          <GifLoading source={gifLoadingWhite} />
        </WrapperGifLoading>
      ) : (
        <DisableLabelButton labelColor={labelColor}>
          {labelText}
        </DisableLabelButton>
      )}
    </DisabledButton>
  );
  const renderFullButton = () => (
    <FullButton
      onPress={onPress ? () => onPress() : null}
      buttonColor={buttonColor}
      hitSlop={{
        top: 10,
        left: 10,
        bottom: 10,
        right: 10,
      }}
      widthSquareButton={widthSquareButton}
    >
      {loading ? (
        <WrapperGifLoading>
          <GifLoading source={gifLoadingWhite} />
        </WrapperGifLoading>
      ) : (
        <LabelButton labelColor={labelColor}>{labelText}</LabelButton>
      )}
    </FullButton>
  );
  const handleChooseButton = () => {
    let returnButtonChosen;
    if (variant === 'enable') {
      returnButtonChosen = renderSquareButton();
    } else if (variant === 'disable') {
      returnButtonChosen = renderDisabledButton();
    } else if (variant === 'full') {
      returnButtonChosen = renderFullButton();
    }
    return returnButtonChosen;
  };

  return handleChooseButton();
}

Button.defaultProps = {
  buttonColor: jamboBlue,
  labelColor: white,
  disabledButtonColor: lightGrey,
  disabledLabelColor: mediumGrey,
  widthSquareButton: `${pw(95)}px`,
  loading: false,
};
Button.propTypes = {
  variant: PropTypes.oneOf(['enable', 'disable', 'full']).isRequired,
  buttonColor: PropTypes.string,
  onPress: PropTypes.func.isRequired,
  labelText: PropTypes.string,
  labelColor: PropTypes.string,
  widthSquareButton: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  loading: PropTypes.bool,
};
