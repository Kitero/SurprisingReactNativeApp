import * as React from 'react';
import {
  TextInput,
} from 'react-native';
import PropTypes from 'prop-types';
import { inputStyle } from '../Style/StyleSheet';

export default function MyTextInput({
  placeholder, keyboardType, secureTextEntry,
  textContentType, style, onEndEditing,
  placeholderTextColor, underlineColorAndroid, value, onChangeText, autoFocus
}) {
  return (
    <>
      <TextInput
        style={style}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        textContentType={textContentType}
        onEndEditing={onEndEditing}
        underlineColorAndroid={underlineColorAndroid}
        value={value}
        editable
        onChangeText={onChangeText}
        autoFocus={autoFocus}
      />
    </>
  );
}

// get value by onChangeText or

MyTextInput.propTypes = {
  style: PropTypes.shape({
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    marginTop: PropTypes.number,
    marginBottom: PropTypes.number,
    marginRight: PropTypes.number,
    marginLeft: PropTypes.number,
    paddingTop: PropTypes.number,
    paddingBottom: PropTypes.number,
    paddingLeft: PropTypes.number,
    paddingRight: PropTypes.number,
    backgroundColor: PropTypes.string,
    borderRadius: PropTypes.number,
    borderColor: PropTypes.string,
    color: PropTypes.string,
  }),
  placeholder: PropTypes.string,
  placeholderTextColor: PropTypes.string,
  keyboardType: PropTypes.string,
  secureTextEntry: PropTypes.bool,
  textContentType: PropTypes.string,
  onEndEditing: PropTypes.func,
  underlineColorAndroid: PropTypes.string,
  value: PropTypes.string,
  autoFocus: PropTypes.bool,
};

MyTextInput.defaultProps = {
  keyboardType: 'default',
  placeholder: '',
  placeholderTextColor: '#000',
  secureTextEntry: false,
  textContentType: 'username',
  style: inputStyle.textInput,
  underlineColorAndroid: null,
  value: '',
  autoFocus: false,
  onEndEditing: () => { },
};
