import { Picker } from '@react-native-community/picker';
import * as React from 'react';
import PropTypes from 'prop-types';
import { Modal, Text, View } from 'react-native';
import MyButton from '../components/MyButton';
import { ButtonStyle, modalStyle, textStyle } from '../Style/StyleSheet';

interface IRoute {
  params: {
    listId: string;
  }
}

interface IProps {
  route: IRoute;
  visible: boolean;
  setVisible: Function;
  title: string;
  fieldName: string;
  getElems: Function;
  onValidate: Function;
  onCreateNew: Function;
}

interface ElemObject {
  name: string;
  id: string;
}

export default function SelectModal({
  route,
  visible,
  setVisible,
  title,
  fieldName,
  getElems,
  onValidate,
  onCreateNew,
}: IProps) {
  const [selectedItem, setSelectedItem] = React.useState<string | number>('');
  const [items, setItems] = React.useState<Array<ElemObject>>([]);

  const handleClose = () => {
    setVisible(false);
  };

  const handleSelectedItemChange = (itemValue: string | number) => {
    if (itemValue === '-1') {
      handleClose();
      onCreateNew();
    } else {
      setSelectedItem(itemValue);
    }
  };

  const handleSetElems = () => {
    getElems()
      .then((elem: Array<ElemObject>) => {
        setItems(elem);
        if (elem.length > 0) {
          setSelectedItem(elem[0].name);
        }
      });
  };

  React.useEffect(() => {
    if (visible) {
      handleSetElems();
    }
  }, [visible]);

  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
    >
      <View style={modalStyle.centerModal}>
        <View style={modalStyle.newItemModal}>
          <MyButton
            title="X"
            onPress={handleClose}
            styleButton={ButtonStyle.buttonClose}
            styleText={ButtonStyle.text}
          />
          <Text style={textStyle.text}>
            {title}
          </Text>
          <View style={modalStyle.doubleContainer}>
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              <Text style={textStyle.textInput}>
                {fieldName}
                :
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Picker
                selectedValue={selectedItem}
                onValueChange={handleSelectedItemChange}
                mode="dropdown"
              >
                {
                  items.map((value) => (
                    <Picker.Item
                      key={value.name}
                      label={value.id}
                      value={value.name}
                    />
                  ))
                }
                <Picker.Item key="Create new" value="-1" label="Create new..." />
              </Picker>
            </View>
          </View>
          <View style={modalStyle.modalContainer}>
            <MyButton
              title="Add"
              onPress={() => {
                onValidate(route.params.listId, selectedItem);
                handleClose();
              }}
              styleButton={modalStyle.modalNewItemButton}
              styleText={ButtonStyle.text}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

SelectModal.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      name: PropTypes.string,
      listId: PropTypes.number,
    }),
  }).isRequired,
  visible: PropTypes.bool,
  setVisible: PropTypes.func,
  title: PropTypes.string.isRequired,
  fieldName: PropTypes.string.isRequired,
  getElems: PropTypes.func.isRequired,
  onValidate: PropTypes.func,
  onCreateNew: PropTypes.func,
};

SelectModal.defaultProps = {
  visible: true,
  setVisible: () => { },
  onValidate: () => { },
  onCreateNew: () => { },
};
