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
import { Picker } from '@react-native-community/picker';
import MyButton from '../components/MyButton';
import { ButtonStyle, modalStyle, textStyle } from '../Style/StyleSheet';
import { itemsStyle } from '../Style/listStyle';
import MyTextInput from '../components/MyTextInput';
import {
  checkShippingListItem, createItem, getItems, getShoppingListItems, putItemInShoppingList,
} from '../apiCaller';
import { dropDownStyle } from '../Style/dropdownStyle';
import MyDropDown from '../components/MyDropDown';
import { cameraRoute, homeRoute } from '../routes';

export default function ListItemsScreen({ route, navigation, token }) {
  const { name } = route.params;
  const [data, setData] = React.useState([]);
  const [items, setItems] = React.useState([]);
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);
  const [disconnectModalVisible, setDisconnectModalVisible] = React.useState(false);
  const [newItemModalVisible, setNewItemModalVisible] = React.useState(false);
  const [createItemModalVisible, setCreateItemModalVisible] = React.useState(false);
  const [newQuantity, setNewQuantity] = React.useState('');
  const [newItem, setNewItem] = React.useState('');
  const [checkBox, setCheckBox] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState('');

  React.useEffect(() => {
    getItems(token)
      .then((json) => {
        setItems(json);
      });
    getShoppingListItems(route.params.listId, token)
      .then((json) => {
        console.log(json);
        setData(json);
      });
  }, [token, route]);

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

  const setPP = () => {
    console.log('set PP');
    navigation.navigate(cameraRoute);
  };

  const dropdownData = [
    {
      title: 'Create new item',
      callBack: () => {
        setNewItemModalVisible(!newItemModalVisible);
      },
      id: '1',
    },
    {
      title: 'Set profil picture',
      callBack: setPP,
      id: '2',
    },
    {
      title: 'Delete this list',
      callBack: () => {
        setDeleteModalVisible(!deleteModalVisible);
        console.log(newItemModalVisible);
      },
      id: '3',
    },
    {
      title: 'Disconnect',
      callBack: disconnect,
      id: '4',
    },
  ];

  // Set Menu button in the top bar
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
          <MyDropDown
            title="Menu"
            data={dropdownData}
            styleList={dropDownStyle.list}
            styleElements={dropDownStyle.element}
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
            value={`${1}`}
            keyboardType="number-pad"
            onChangeText={(value) => {
              data[index].quantity = parseInt(value, 10);
              setData(data.slice());
              saveNewData();
            }}
            onEndEditing={() => {

            }}
          />
        </View>
        <View style={{ flexGrow: 2 }}>
          <ScrollView
            horizontal
          >
            <Text
              style={itemsStyle.itemText}
            >
              {item.item}
            </Text>
          </ScrollView>
        </View>
        <View style={{ flexGrow: 1 }}>
          <CheckBox
            value={data[index].checked}
            onValueChange={(value) => {
              checkShippingListItem(item.id, token)
                .then((json) => {
                  data[index].checked = json.checked;
                });
            }}
            tintColors={{ true: 'white', false: 'white' }}
            style={itemsStyle.checkbox}
          />
        </View>
      </View>
    </View>
  );

  const handleNewItemChange = (item) => {
    setNewItem(item);
  };

  return (
    <View>
      <FlatList
        data={data}
        renderItem={renderItemList}
        keyExtractor={(item) => item.id}
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
                  // disconnect user
                  navigation.reset({
                    index: 0,
                    routes: [{ name: homeRoute }],
                  });
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
              Add item
            </Text>
            <View style={modalStyle.doubleContainer}>
              <View style={{ flex: 1, alignItems: 'flex-end' }}>
                <Text style={textStyle.textInput}>
                  Item:
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Picker
                  selectedValue={selectedItem}
                  onValueChange={(itemValue, itemIndex) => {
                    if (itemValue == '-1') {
                      console.log('Create new');
                      setCreateItemModalVisible(true);
                    } else {
                      setSelectedItem(itemValue);
                    }
                  }}
                >
                  {items.map((value) => <Picker.Item key={value.name} label={value.name} value={value.id} />)}
                  <Picker.Item key="Create new" value="-1" label="Create new..." />
                </Picker>
              </View>
            </View>
            <View style={modalStyle.modalContainer}>
              <MyButton
                title="Add"
                onPress={() => {
                  putItemInShoppingList(route.params.listId, selectedItem, token)
                    .then((json) => {
                      data.push(json);
                      setData(data.slice());
                      setNewItemModalVisible(false);
                    });
                }}
                styleButton={modalStyle.modalNewItemButton}
                styleText={ButtonStyle.text}
              />
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        transparent
        animationType="slide"
        visible={createItemModalVisible}
      >
        <View style={modalStyle.centerModal}>
          <View style={modalStyle.newItemModal}>
            <MyButton
              title="X"
              onPress={() => {
                setCreateItemModalVisible(false);
              }}
              styleButton={ButtonStyle.buttonClose}
              styleText={ButtonStyle.text}
            />
            <Text style={textStyle.text}>
              Create new item
            </Text>
            <View style={{ ...modalStyle.modalContainerColumn, justifyContent: 'space-around', height: '50%' }}>
              <MyTextInput
                placeholder="Item name..."
                value={newItem}
                onChangeText={handleNewItemChange}
              />
              <MyButton
                title="Create"
                onPress={() => {
                  createItem(newItem, token)
                    .then((json) => {
                      setNewItem('');
                      setCreateItemModalVisible(false);
                      items.push(json);
                      setItems(items.slice());
                    });
                }}
                styleText={ButtonStyle.text}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

ListItemsScreen.propTypes = {
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
