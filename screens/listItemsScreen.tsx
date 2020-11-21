import * as React from 'react';
import {
  View,
  Text,
  FlatList,
} from 'react-native';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MyButton from '../components/MyButton';
import { ButtonStyle } from '../Style/StyleSheet';
import { itemsStyle } from '../Style/listStyle';
import {
  checkShippingListItem, createItem, deleteShoppingList, getItems,
  getShoppingListItems, putItemInShoppingList,
} from '../apiCaller';
import YesNoModal from '../modals/yesNoModal';
import SingleFieldModal from '../modals/singleFieldModal';
import SelectModal from '../modals/selectModal';
import { homeRoute } from '../routes';
import { UserContext } from '../contexts/userContext';

function ListItemsScreenComponent({ route, navigation, token, setToken }) {
  const [data, setData] = React.useState([]);
  const [items, setItems] = React.useState([]);
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);
  const [disconnectModalVisible, setDisconnectModalVisible] = React.useState(false);
  const [newItemModalVisible, setNewItemModalVisible] = React.useState(false);
  const [createItemModalVisible, setCreateItemModalVisible] = React.useState(false);
  const { listId } = route.params;

  const compareItems = (
    item1: { checked: boolean; name: string; }, item2: { checked: boolean; name: string; },
  ) => ((
    (item1.checked && (!item2.checked || item1.name > item2.name))
    || (!item1.checked && !item2.checked && item1.name > item2.name)) ? 1 : -1);

  const sortData = (arr = data) => arr.sort(compareItems);

  React.useEffect(() => {
    getShoppingListItems(listId, token)
      .then((json) => {
        setData(sortData(json));
      }, () => { });
  }, [token, route]);

  function disconnect() {
    setToken('');
    navigation.reset({
      index: 0,
      routes: [{ name: homeRoute }],
    });
  }

  const deleteList = () => {
    deleteShoppingList(listId, token)
      .then(() => {
        navigation.goBack();
      }, () => { });
  };

  const handleGetItems = () => getItems(token);

  const handleCreateNewItem = (itemName: any, setErrors: (arg0: any) => void) => {
    createItem(itemName, token)
      .then((json) => {
        setCreateItemModalVisible(false);
        items.push(json);
        setItems(items.slice());
      }, (errors) => {
        setErrors(errors);
      });
  };

  const handlePutItemInList = (listId: any, selectedItem: any) => {
    putItemInShoppingList(listId, selectedItem, token)
      .then((json) => {
        setData(sortData([json, ...data]));
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
    <TouchableOpacity onPress={() => {
      checkShippingListItem(item.id, token)
        .then((json) => {
          data[index].checked = json.checked;
          setData(sortData().slice());
        }, () => { });
    }}
    >
      <View style={data[index].checked ? itemsStyle.itemChecked : itemsStyle.item}>
        <Text
          style={itemsStyle.itemText}
        >
          {item.item}
        </Text>
      </View>
    </TouchableOpacity>
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
                setDeleteModalVisible(true);
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
      <YesNoModal
        visible={disconnectModalVisible}
        setVisible={setDisconnectModalVisible}
        onValidate={disconnect}
        title="Disconnect ?"
      />
      <YesNoModal
        visible={deleteModalVisible}
        setVisible={setDeleteModalVisible}
        onValidate={deleteList}
        title="Delete list ?"
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
      <SingleFieldModal
        visible={createItemModalVisible}
        setVisible={setCreateItemModalVisible}
        onValidate={handleCreateNewItem}
        placeholder="New item"
      />
    </View>
  );
}

ListItemsScreenComponent.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
    setOptions: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      name: PropTypes.string,
      listId: PropTypes.number,
    }),
  }).isRequired,
  token: PropTypes.string.isRequired,
  setToken: PropTypes.func.isRequired,
};

export default function ListItemsScreen(props) {
  return (
    <UserContext.Consumer>
      {
        (value) => (<ListItemsScreenComponent {...props} {...value} />)
      }
    </UserContext.Consumer>
  );
}
