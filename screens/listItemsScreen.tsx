import * as React from 'react';
import {
  View,
  Text,
  FlatList,
  Modal,
} from 'react-native';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native-gesture-handler';
import CheckBox from '@react-native-community/checkbox';
import MyButton from '../components/MyButton';
import { ButtonStyle, modalStyle, textStyle } from '../Style/StyleSheet';
import { itemsStyle } from '../Style/listStyle';
import MyTextInput from '../components/MyTextInput';

export default function listItemsScreen({ route, navigation }) {
  const { name } = route.params;

  const baseData = [
    {
      name: 'choucroutte',
      quantity: 1,
      id: '0',
      done: false,
    },
    {
      name: 'poires',
      quantity: 4,
      id: '1',
      done: false,
    },
    {
      name: 'steak',
      quantity: 3,
      id: '2',
      done: false,
    },
    {
      name: 'sel',
      quantity: 1,
      id: '3',
      done: false,
    },
    {
      name: 'pommes',
      quantity: 5,
      id: '4',
      done: false,
    },
    {
      name: 'patates',
      quantity: 5,
      id: '5',
      done: false,
    },
    {
      name: 'farine',
      quantity: 1,
      id: '6',
      done: false,
    },
    {
      name: 'poussière d\'étoile',
      quantity: 2,
      id: '7',
      done: false,
    },
  ];

  const [data, setData] = React.useState(baseData);
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);
  const [disconnectModalVisible, setDisconnectModalVisible] = React.useState(false);
  const [newItemModalVisible, setNewItemModalVisible] = React.useState(false);
  const [newQuantity, setNewQuantity] = React.useState('');
  const [newItem, setNewItem] = React.useState('');
  const [checkBox, setCheckBox] = React.useState(false);

  function disconnect() {
    setDisconnectModalVisible(!disconnectModalVisible);
    // add disconnect feature
  }

  const deleteList = () => {
    setDeleteModalVisible(!deleteModalVisible);
    // add request to delete the list
  };

  const saveNewData = () => {
    // to do
    console.log('Save new data');
  };

  // Set "disconnect" buttons in the top bar
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View
          style={{
            flex: 1,
            alignContent: 'flex-end',
            flexDirection: 'row',
          }}
        >
          <MyButton
            title="Disconnect"
            onPress={() => {
              setDisconnectModalVisible(!disconnectModalVisible);
            }}
            styleButton={ButtonStyle.buttonDisconnect}
            styleText={ButtonStyle.text}
          />
        </View>
      ),
    });
  }, [navigation]);

  const renderItemList = ({ item, index }) => (
    <View>
      <View style={data[index].done ? itemsStyle.itemChecked : itemsStyle.item}>
        <View style={data[index].done ? itemsStyle.numberChecked : itemsStyle.number}>
          <MyTextInput
            style={itemsStyle.numberText}
            value={`${item.quantity}`}
            keyboardType="number-pad"
            onChangeText={(value) => {
              data[index].quantity = parseInt(value, 10);
              setData(data.slice());
              saveNewData();
            }}
            onEndEditing={ () => {
              
            }
            }
          />
        </View>
        <View style={{ flexGrow: 2 }}>
          <ScrollView
            horizontal
          >
            <MyTextInput
              style={itemsStyle.itemText}
              value={item.name}
              onChangeText={(value) => {
                data[index].name = value;
                setData(data.slice());
                saveNewData();
              }}
            />
          </ScrollView>
        </View>
        <View style={{ flexGrow: 1 }}>
          <CheckBox
            value={data[index].done}
            onValueChange={(value) => {
              data[index].done = value;
              setData(data.slice());
              saveNewData();
            }}
            style={itemsStyle.checkbox}
          />
        </View>
      </View>
    </View>
  );

  const handleNewQuantityChange = (quantity) => {
    setNewQuantity(quantity);
  };

  const handleNewItemChange = (item) => {
    setNewItem(item);
  };

  return (
    <View>
      <FlatList
        data={data}
        renderItem={renderItemList}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={(
          <>
            <MyButton
              title="Delete list"
              onPress={() => {
                setDeleteModalVisible(!deleteModalVisible);
                console.log(newItemModalVisible);
              }}
              styleButton={ButtonStyle.buttonDelete}
              styleText={ButtonStyle.text}
            />
            <MyButton
              title="Create a new item"
              onPress={() => { setNewItemModalVisible(!newItemModalVisible); }}
              styleButton={ButtonStyle.buttonNewItem}
              styleText={ButtonStyle.text}
            />
          </>
        )}
        ListFooterComponent={
          <View style={{ height: 280 }} />
        }
      />
      <Modal
        animationType="slide"
        transparent
        visible={disconnectModalVisible}
      >
        <View style={modalStyle.centerModal}>
          <View style={modalStyle.basicModal}>
            <MyButton
              title="X"
              onPress={() => {
                setDisconnectModalVisible(!disconnectModalVisible);
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
                  disconnect();
                }}
                styleButton={modalStyle.modalButton}
                styleText={ButtonStyle.text}
              />
              <MyButton
                title="No"
                onPress={() => {
                  setDisconnectModalVisible(!disconnectModalVisible);
                }}
                styleButton={modalStyle.modalButton}
                styleText={ButtonStyle.text}
              />
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent
        visible={deleteModalVisible}
      >
        <View style={modalStyle.centerModal}>
          <View style={modalStyle.basicModal}>
            <MyButton
              title="X"
              onPress={() => {
                setDeleteModalVisible(!deleteModalVisible);
              }}
              styleButton={ButtonStyle.buttonClose}
              styleText={ButtonStyle.text}
            />
            <Text style={textStyle.text}>
              Delete this list?
            </Text>
            <View style={modalStyle.modalContainer}>
              <MyButton
                title="Yes"
                onPress={() => {
                  deleteList();
                }}
                styleButton={modalStyle.modalButton}
                styleText={ButtonStyle.text}
              />
              <MyButton
                title="No"
                onPress={() => {
                  setDeleteModalVisible(!deleteModalVisible);
                }}
                styleButton={modalStyle.modalButton}
                styleText={ButtonStyle.text}
              />
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent
        visible={newItemModalVisible}
      >
        <View style={modalStyle.centerModal}>
          <View style={modalStyle.newItemModal}>
            <MyButton
              title="X"
              onPress={() => {
                setNewItemModalVisible(!newItemModalVisible);
              }}
              styleButton={ButtonStyle.buttonClose}
              styleText={ButtonStyle.text}
            />
            <Text style={textStyle.text}>
              Create new item
            </Text>
            <View style={modalStyle.doubleContainer}>
              <View style={{ flex: 1, alignItems: 'flex-end' }}>
                <Text style={textStyle.textInput}>
                  Item:
                </Text>
                <Text style={textStyle.textInput}>
                  Quantity:
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <MyTextInput
                  placeholder="item"
                  value={newItem}
                  onChangeText={handleNewItemChange}
                />
                <MyTextInput
                  placeholder="quantity"
                  value={newQuantity}
                  onChangeText={handleNewQuantityChange}
                />
              </View>
            </View>
            <View style={modalStyle.modalContainer}>
              <MyButton
                title="Add"
                onPress={() => {
                  data.push({
                    name: newItem,
                    quantity: isNaN(parseInt(newQuantity, 10)) ? 1 : parseInt(newQuantity, 10),
                    id: `${data.length}`,
                    done: false,
                  });
                  setData(data.slice());
                  saveNewData();
                  setNewItemModalVisible(!newItemModalVisible);
                  setNewQuantity('');
                  setNewItem('');
                }}
                styleButton={modalStyle.modalNewItemButton}
                styleText={ButtonStyle.text}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

listItemsScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
    setOptions: PropTypes.func.isRequired,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      name: PropTypes.string,
    }),
  }).isRequired,
};
