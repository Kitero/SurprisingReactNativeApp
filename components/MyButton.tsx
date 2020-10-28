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
  styleButton: PropTypes.shape({
    paddingTop: PropTypes.number,
    paddingBottom: PropTypes.number,
    paddingLeft: PropTypes.number,
    paddingRight: PropTypes.number,
    marginTop: PropTypes.number,
    marginBottom: PropTypes.number,
    marginLeft: PropTypes.number,
    marginRight: PropTypes.number,
    backgroundColor: PropTypes.string,
    borderRadius: PropTypes.number,
    borderColor: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number,
  }),
  styleText: PropTypes.shape({
    color: PropTypes.string,
    textAlign: PropTypes.string,
    fontSize: PropTypes.number,
  }),
  onPress: PropTypes.func,
  title: PropTypes.string,
};

MyButton.defaultProps = {
  title: 'Button',
  styleButton: ButtonStyle.button,
  styleText: ButtonStyle.text,
  onPress: () => {},
};
