import * as React from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import ErrorPrinterStyle from '../Style/ErrorPrinterStyle';

interface IProps {
  errors: string[];
}

export default function MyErrorPrinter({ errors }: IProps) {
  return (
    <View style={ErrorPrinterStyle.container}>
      {
        errors.length
          ? errors.map((e) => (
            <Text key={e} style={ErrorPrinterStyle.text}>
              {e}
            </Text>
          ))
          : <></>
      }
    </View>
  );
}

MyErrorPrinter.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.string).isRequired,
};
