import * as React from 'react';
import PropTypes from 'prop-types';
import { Modal, Text, View } from 'react-native';
import MyButton from '../components/MyButton';
import { ButtonStyle, modalStyle, textStyle } from '../Style/StyleSheet';

interface IProps {
  visible: boolean;
  setVisible: Function;
  title: string;
  validateText: string;
  rejectText: string;
  onValidate: Function;
  onReject: Function;
}

export default function YesNoModal({
  visible, setVisible, title, validateText, rejectText, onValidate, onReject,
}: IProps) {
  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
    >
      <View style={modalStyle.centerModal}>
        <View style={modalStyle.basicModal}>
          <MyButton
            title="X"
            onPress={() => {
              setVisible(false);
            }}
            styleButton={ButtonStyle.buttonClose}
            styleText={ButtonStyle.text}
          />
          <Text style={textStyle.text}>
            {title}
          </Text>
          <View style={modalStyle.modalContainer}>
            <MyButton
              title={validateText}
              onPress={() => {
                onValidate();
                setVisible(false);
              }}
              styleButton={modalStyle.modalButton}
              styleText={ButtonStyle.text}
            />
            <MyButton
              title={rejectText}
              onPress={() => {
                onReject();
                setVisible(false);
              }}
              styleButton={modalStyle.modalRejectButton}
              styleText={ButtonStyle.text}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

YesNoModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  title: PropTypes.string,
  validateText: PropTypes.string,
  rejectText: PropTypes.string,
  onValidate: PropTypes.func,
  onReject: PropTypes.func,
};

YesNoModal.defaultProps = {
  title: 'Yes No Box',
  validateText: 'Yes',
  rejectText: 'no',
  onValidate: () => { },
  onReject: () => { },
};
