import * as React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
} from 'react-native';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { itemsStyle } from '../Style/listStyle';
import {
  checkShippingListItem, createItem, deleteShoppingList, getItems,
  getShoppingListItems, putItemInShoppingList,
} from '../apiCaller';
import YesNoModal from '../modals/yesNoModal';
import SingleFieldModal from '../modals/singleFieldModal';
import SelectModal from '../modals/selectModal';
import { UserContext } from '../contexts/userContext';
import dropDownStyle from '../Style/dropdownStyle';
import MyDropDown from '../components/MyDropDown';
import { cameraRoute, homeRoute } from '../routes';
import { IListItem, IItem } from '../interfaces/api';
import { INavigation, IRoute } from '../interfaces/navigation';

interface IScreenProps {
  route: IRoute;
  navigation: INavigation;
}

interface IProps extends IScreenProps {
  token: string;
  setToken: Function;
  profileImageUrl: string;
}

interface IItemProps {
  item: IListItem;
  index: number;
}

function ListItemsScreenComponent({
  route, navigation, token, setToken, profileImageUrl,
}: IProps) {
  const [data, setData] = React.useState<IListItem[]>([]);
  const [items, setItems] = React.useState<IItem[]>([]);
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);
  const [disconnectModalVisible, setDisconnectModalVisible] = React.useState(false);
  const [newItemModalVisible, setNewItemModalVisible] = React.useState(false);
  const [createItemModalVisible, setCreateItemModalVisible] = React.useState(false);
  const { listId } = route.params;

  const compareItems = (
    item1: { checked: boolean; name: string }, item2: IListItem,
  ) => ((
    (item1.checked && (!item2.checked || item1.name > item2.name))
    || (!item1.checked && !item2.checked && item1.name > item2.name)) ? 1 : -1);

  const sortData = (arr: Array<IListItem> = data) => arr.sort(compareItems);

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

  const handlePutItemInList = (selectedItem: string) => {
    putItemInShoppingList(listId, selectedItem, token)
      .then((json) => {
        setData(sortData([json, ...data]));
      }, () => {

      });
  };

  const openCreateNewItemModal = () => {
    setCreateItemModalVisible(true);
  };

  const setPP = () => {
    navigation.navigate(cameraRoute);
  };

  const dropdownData = [
    {
      title: 'Create new item',
      callBack: () => {
        setNewItemModalVisible(true);
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
        setDeleteModalVisible(true);
      },
      id: '3',
    },
    {
      title: 'Disconnect',
      callBack: () => {
        setDisconnectModalVisible(true);
      },
      id: '4',
    },
  ];

  // Set Menu button in the top bar
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View
            style={{
              alignSelf: 'center',
            }}
          >
            <Image
              style={{
                width: 30,
                height: 30,
              }}
              source={{
                uri: profileImageUrl,
              }}
            />
          </View>
          <View
            style={{
              alignSelf: 'flex-end',
            }}
          >
            <MyDropDown
              title="Menu"
              data={dropdownData}
              styleElements={dropDownStyle.dropDownStyle.element}
            />
          </View>
        </View>
      ),
    });
  }, [navigation]);

  const renderItemList = ({ item, index }: IItemProps) => (
    <TouchableOpacity onPress={() => {
      checkShippingListItem(String(item.id), token)
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

  renderItemList.propTypes = {
    item: PropTypes.shape({
      item: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    }).isRequired,
    index: PropTypes.number.isRequired,
  };

  return (
    <View>
      <FlatList
        data={data}
        renderItem={renderItemList}
        keyExtractor={({ id }) => String(id)}
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

export default function ListItemsScreen({ navigation, route }: IScreenProps) {
  return (
    <UserContext.Consumer>
      {
        ({ token, setToken, profileImageUrl }) => (
          <ListItemsScreenComponent
            navigation={navigation}
            route={route}
            token={token}
            setToken={setToken}
            profileImageUrl={profileImageUrl}
          />
        )
      }
    </UserContext.Consumer>
  );
}
