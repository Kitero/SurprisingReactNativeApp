import * as React from 'react';
import {
  TextInput,
} from 'react-native';
import { inputStyle } from '../Style/StyleSheet';

export function MyTextInput(props) {
  const { ...otherProps } = props;
  return (
    <>
      <TextInput
        style={inputStyle.textInput}
        {...otherProps}
      />
    </>
  );
}
