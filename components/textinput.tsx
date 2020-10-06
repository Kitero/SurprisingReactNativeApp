import * as React from 'react';
import {
  TextInput,
} from 'react-native';
import PropTypes from 'prop-types';
import { inputStyle } from '../Style/StyleSheet';

export default function MyTextInput({
  placeholder, keyboardType, secureTextEntry, textContentType, style,
}) {
  return (
    <>
      <TextInput
        style={style}
        placeholder={placeholder}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        textContentType={textContentType}
      />
    </>
  );
}

MyTextInput.propTypes = {
  style: PropTypes.element,
  placeholder: PropTypes.string,
  keyboardType: PropTypes.string,
  secureTextEntry: PropTypes.bool,
  textContentType: PropTypes.string,
};

MyTextInput.defaultProps = {
  keyboardType: 'default',
  placeholder: '',
  secureTextEntry: false,
  textContentType: 'username',
  style: inputStyle.textInput,
};
