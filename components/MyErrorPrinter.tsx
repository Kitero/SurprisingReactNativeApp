import * as React from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import ErrorPrinterStyle from '../Style/ErrorPrinterStyle';

export default function myErrorPrinter({ errors }) {
    return (
        <View style={ErrorPrinterStyle.container}>
            {
                errors.length ?
                    errors.map((e, index) => (
                        <Text key={index} style={ErrorPrinterStyle.text}>
                            {e}
                        </Text>
                    ))
                    : <></>
            }
        </View>
    )
}

myErrorPrinter.propTypes = {
    errors: PropTypes.array.isRequired
};