import * as React from 'react';
import {
  View, FlatList, Modal, Text,
} from 'react-native';
import PropTypes, { string } from 'prop-types';
import MyButton from '../components/MyButton';
import { ButtonStyle, modalStyle, textStyle } from '../Style/StyleSheet';
import { listStyle } from '../Style/listStyle';
import { homeRoute, listItemsRoute } from '../routes';
import MyDropDown from '../components/MyDropDown';
import { dropDownStyle } from '../Style/dropdownStyle';
import MyTextInput from '../components/MyTextInput';
import { createShoppingList, getShoppingList } from '../apiCaller';
import MyErrorPrinter from '../components/MyErrorPrinter';
import CreateListModal from '../modals/createListModal';
import DisconnectModal from '../modals/disconnectModal';
import { UserContext } from '../contexts/userContext';
import { setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar';

function ListScreenComponent({ navigation, token, setToken }) {
  const [dataLists, setDataLists] = React.useState([]);
  const [disconnectModalVisible, setDisconnectModalVisible] = React.useState(false);
  const [newItemModalVisible, setNewItemModalVisible] = React.useState(false);

  React.useEffect(() => {
    getShoppingList(token)
      .then((json) => {
        setDataLists(json);
      }, (errors) => { });
  }, []);

  const setPP = () => {
    console.log('set PP');
  }

  const OpenModalNewList = () => {
    setNewItemModalVisible(true);
  }

  const OpenDisconnectModal = () => {
    setDisconnectModalVisible(true);
  }

  const dropdownData = [
    {
      title: 'Create new list',
      callBack: OpenModalNewList,
      id: '1',
    },
    {
      title: 'Set profil picture',
      callBack: setPP,
      id: '2',
    },
    {
      title: 'Disconnect',
      callBack: OpenDisconnectModal,
      id: '3',
    },
  ];

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

  function loadListDetail(name, listId) {
    navigation.navigate(listItemsRoute, {
      name, listId
    });
  }

  function handleCreateShoppingList(listName, setErrors) {
    createShoppingList(listName, token)
      .then((json) => {
        dataLists.push(json);
        setDataLists(dataLists.slice());
      }, (errors) => {
        setErrors(errors);
      });
  }

  function disconnect() {
    setToken('');
    navigation.reset({
      index: 0,
      routes: [{ name: homeRoute }]
    });
  }

  const renderItemList = ({ item }) => (
    <>
      <MyButton
        title={item.name}
        styleButton={listStyle.elementStyle}
        styleText={listStyle.nameStyle}
        onPress={() => loadListDetail(item.name, item.id)}
      />
    </>
  );

  renderItemList.propTypes = {
    item: PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.number,
    }),
  };
  renderItemList.defaultProp = {
    item: {
      name: '',
      id: '0',
    },
  };

  return (
    <View style={listStyle.listContainer}>
      <FlatList
        data={dataLists}
        renderItem={renderItemList}
        keyExtractor={({ id }) => String(id)}
      />
      <DisconnectModal
        visible={disconnectModalVisible}
        setVisible={setDisconnectModalVisible}
        onValidate={disconnect}
      />
      <CreateListModal
        visible={newItemModalVisible}
        setVisible={setNewItemModalVisible}
        onValidate={handleCreateShoppingList}
      />
    </View>
  );
}

ListScreenComponent.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
    setOptions: PropTypes.func.isRequired,
  }).isRequired,
  token: PropTypes.string.isRequired
};

export default function ListScreen(props) {
  return (
    <UserContext.Consumer>
      {
        (value) => (<ListScreenComponent {...props} {...value} />)
      }
    </UserContext.Consumer>
  )
}