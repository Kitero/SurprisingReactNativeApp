import * as React from 'react';
import {
  View,
  Text,
  FlatList,
  Modal
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
  checkShippingListItem, createItem, getItems, getShoppingListItems, putItemInShoppingList
} from '../apiCaller';
import DisconnectModal from '../modals/disconnectModal';
import CreateListModal from '../modals/createListModal';
import SelectModal from '../modals/selectModal';

export default function listItemsScreen({ route, navigation, token }) {
  const { name } = route.params;

  const [data, setData] = React.useState([]);
  const [items, setItems] = React.useState([]);
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);
  const [disconnectModalVisible, setDisconnectModalVisible] = React.useState(false);
  const [newItemModalVisible, setNewItemModalVisible] = React.useState(false);
  const [createItemModalVisible, setCreateItemModalVisible] = React.useState(false);
  const [newItem, setNewItem] = React.useState('');
  const [selectedItem, setSelectedItem] = React.useState('');

  React.useEffect(() => {
    getItems(token)
      .then((json) => {
        setItems(json);
      });
    getShoppingListItems(route.params.listId, token)
      .then((json) => {
        setData(json);
      });
  }, [token, route]);

  function disconnect() {
    // add disconnect feature
  }

  const deleteList = () => {
    setDeleteModalVisible(true);
    // add request to delete the list
  };

  const saveNewData = () => {
    // to do
    console.log('Save new data');
  };

  const handleGetItems = () => getItems(token);

  const handleCreateNewItem = (itemName, setErrors) => {
    createItem(newItem, token)
      .then((json) => {
        setCreateItemModalVisible(false);
        items.push(json);
        setItems(items.slice());
      }, (errors) => {
        setErrors(errors);
      });
  };

  const handlePutItemInList = (listId, selectedItem) => {
    putItemInShoppingList(listId, selectedItem, token)
      .then((json) => {
        setData([...data, json]);
      }, () => {

      });
  };

  const openCreateNewItemModal = () => {
    setCreateItemModalVisible(true);
  };

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
              setDisconnectModalVisible(true);
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
            value={`${1}`}
            keyboardType="number-pad"
            onChangeText={(value) => {
              data[index].quantity = parseInt(value, 10);
              setData(data.slice());
              saveNewData();
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
            tintColors={{ true: "white", false: "white" }}
            style={itemsStyle.checkbox}
          />
        </View>
      </View>
    </View>
  );

  return (
    <View>
      <FlatList
        data={data}
        renderItem={renderItemList}
        keyExtractor={(item) => String(item.id)}
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
              title="Add item"
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
      <DisconnectModal
        visible={disconnectModalVisible}
        setVisible={setDisconnectModalVisible}
        onValidate={disconnect}
      />
      <DisconnectModal
        visible={deleteModalVisible}
        setVisible={setDeleteModalVisible}
        onValidate={deleteList}
      />
      <SelectModal
        route={route}
        visible={newItemModalVisible}
        setVisible={setNewItemModalVisible}
        title="Add item"
        fieldName="Item"
        getElems={handleGetItems}
        onValidate={handlePutItemInList}
        onCreateNew={openCreateNewItemModal}
      />
      <CreateListModal
        visible={createItemModalVisible}
        setVisible={setCreateItemModalVisible}
        onValidate={handleCreateNewItem}
      />
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
  token: PropTypes.string.isRequired,
};
