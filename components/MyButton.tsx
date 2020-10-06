import * as React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

interface State {
  isFocused: boolean;
}

export default function MyButton(props) {
  const { ...otherProps } = props;
  return (
    <TouchableOpacity
      onPress={props.onPress}
      {...otherProps}
    >
      <View style={props.styleButton}>
        <Text style={props.styleText}>
          {props.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
