import * as React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import { ButtonStyle } from '../Style/StyleSheet';

export default function MyButton({
  onPress, styleButton, styleText, title,
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
    >
      <View style={styleButton}>
        <Text style={styleText}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

MyButton.propTypes = {
  styleButton: PropTypes.element,
  styleText: PropTypes.element,
  onPress: PropTypes.func,
  title: PropTypes.string,
};

MyButton.defaultProps = {
  title: 'Button',
  styleButton: ButtonStyle.button,
  styleText: ButtonStyle.text,
  onPress: () => {},
};
