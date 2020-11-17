import * as React from 'react';
import PropTypes from 'prop-types';
import { Modal, Text, View } from 'react-native';
import MyButton from '../components/MyButton';
import MyErrorPrinter from '../components/MyErrorPrinter';
import MyTextInput from '../components/MyTextInput';
import { ButtonStyle, modalStyle, textStyle } from '../Style/StyleSheet';

export default function CreateListModal({ visible, setVisible, onValidate }) {
	const [errors, setErrors] = React.useState([]);
	const [listName, setListName] = React.useState('');
	const [buttonDisable, setButtonDisable] = React.useState(true);

	const needDisable = () => {
		return listName.length == 0;
	}

	React.useEffect(() => {
		setButtonDisable(needDisable());
	}, [listName]);

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
							placeholder={"list name"}
							value={listName}
							onChangeText={(text) => {
								setListName(text);
							}}>
						</MyTextInput>
						<MyButton
							title="Create"
							onPress={() => {
								onValidate(listName, setErrors);
							}}
							styleButton={modalStyle.modalButton}
							styleText={ButtonStyle.text}
							disable={buttonDisable}
						/>
					</View>
				</View>
			</View>
		</Modal>
	)
}

CreateListModal.propTypes = {
	visible: PropTypes.bool.isRequired,
	setVisible: PropTypes.func.isRequired,
	onValidate: PropTypes.func
}

CreateListModal.defaultProps = {
	onValidate: (listName, setErrors) => { }
}