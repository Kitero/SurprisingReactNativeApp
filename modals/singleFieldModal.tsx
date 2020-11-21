import * as React from 'react';
import PropTypes from 'prop-types';
import { Modal, Text, View } from 'react-native';
import MyButton from '../components/MyButton';
import MyErrorPrinter from '../components/MyErrorPrinter';
import MyTextInput from '../components/MyTextInput';
import { ButtonStyle, modalStyle, textStyle } from '../Style/StyleSheet';

export default function SingleFieldModal({
  visible, setVisible, onValidate, placeholder }) {
  const [errors, setErrors] = React.useState([]);
  const [fieldValue, setFieldValue] = React.useState('');
  const [buttonDisable, setButtonDisable] = React.useState(true);

  const needDisable = () => fieldValue.length === 0;

  React.useEffect(() => {
    setButtonDisable(needDisable());
  }, [fieldValue]);

  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
    >
      <View style={modalStyle.centerModal}>
        <View style={modalStyle.basicModalNewList}>
          <MyButton
            title="X"
            onPress={() => {
              setVisible(false);
            }}
            styleButton={ButtonStyle.buttonClose}
            styleText={ButtonStyle.text}
          />
          <Text style={textStyle.text}>
            Create new list
          </Text>
          <MyErrorPrinter errors={errors} />
          <View style={modalStyle.modalContainerColumn}>
            <MyTextInput
              placeholder={placeholder}
              value={fieldValue}
              onChangeText={(text) => {
                setFieldValue(text);
              }}
              autoFocus
            />
            <MyButton
              title="Create"
              onPress={() => {
                onValidate(fieldValue, setErrors);
                setVisible(false);
              }}
              styleButton={modalStyle.modalButton}
              styleText={ButtonStyle.text}
              disable={buttonDisable}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

SingleFieldModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  onValidate: PropTypes.func,
  placeholder: PropTypes.string,
};

SingleFieldModal.defaultProps = {
  onValidate: (listName, setErrors) => { },
  placeholder: '',
};
