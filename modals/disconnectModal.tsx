import * as React from 'react';
import PropTypes from 'prop-types';
import { Modal, Text, View } from 'react-native';
import MyButton from '../components/MyButton';
import { ButtonStyle, modalStyle, textStyle } from '../Style/StyleSheet';

export default function DisconnectModal({ visible, setVisible, onValidate, onReject }) {
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
						Disconnect?
            </Text>
					<View style={modalStyle.modalContainer}>
						<MyButton
							title="Yes"
							onPress={() => {
								onValidate();
								setVisible(false);
							}}
							styleButton={modalStyle.modalButton}
							styleText={ButtonStyle.text}
						/>
						<MyButton
							title="No"
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
	)
}

DisconnectModal.propTypes = {
	visible: PropTypes.bool.isRequired,
	setVisible: PropTypes.func.isRequired,
	onValidate: PropTypes.func,
	onReject: PropTypes.func
}

DisconnectModal.defaultProps = {
	onValidate: () => { },
	onReject: () => { }
}