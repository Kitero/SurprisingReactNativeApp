import * as React from 'react';
import {
  View, FlatList,
} from 'react-native';
import PropTypes from 'prop-types';
import MyButton from '../components/MyButton';
import { listStyle } from '../Style/listStyle';
import { homeRoute, listItemsRoute } from '../routes';
import MyDropDown from '../components/MyDropDown';
import { dropDownStyle } from '../Style/dropdownStyle';
import { createShoppingList, getShoppingList } from '../apiCaller';
import SingleFieldModal from '../modals/singleFieldModal';
import YesNoModal from '../modals/yesNoModal';
import { UserContext } from '../contexts/userContext';

const getRenderItemList = (navigation) => {
  const renderItemList = ({ item }) => {
    function loadListDetail(name, listId) {
      navigation.navigate(listItemsRoute, {
        name, listId,
      });
    }

    return (
      <>
        <MyButton
          title={item.name}
          styleButton={listStyle.elementStyle}
          styleText={listStyle.nameStyle}
          onPress={() => loadListDetail(item.name, item.id)}
        />
      </>
    );
  };

  renderItemList.propTypes = {
    item: PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.string,
    }),
  };

  renderItemList.defaultProps = {
    item: {
      name: '',
      id: '0',
    },
  };
  return renderItemList;
};

function ListScreenComponent({ navigation, token, setToken }) {
  const [dataLists, setDataLists] = React.useState([]);
  const [disconnectModalVisible, setDisconnectModalVisible] = React.useState(false);
  const [newItemModalVisible, setNewItemModalVisible] = React.useState(false);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getShoppingList(token)
        .then((json) => {
          setDataLists(json);
        }, () => { });
    });
    return unsubscribe;
  }, [navigation]);

  const setPP = () => {
    console.log('set PP');
  };

  const OpenModalNewList = () => {
    setNewItemModalVisible(true);
  };

  const OpenDisconnectModal = () => {
    setDisconnectModalVisible(true);
  };

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
      routes: [{ name: homeRoute }],
    });
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

  return (
    <View style={listStyle.listContainer}>
      <FlatList
        data={dataLists}
        renderItem={getRenderItemList(navigation)}
        keyExtractor={({ id }) => String(id)}

      />
      <YesNoModal
        visible={disconnectModalVisible}
        setVisible={setDisconnectModalVisible}
        onValidate={disconnect}
        title="Disconnect ?"
      />
      <SingleFieldModal
        visible={newItemModalVisible}
        setVisible={setNewItemModalVisible}
        onValidate={handleCreateShoppingList}
        placeholder="New list"
      />
    </View>
  );
}

ListScreenComponent.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
    setOptions: PropTypes.func.isRequired,
    addListener: PropTypes.func.isRequired,
  }).isRequired,
  token: PropTypes.string.isRequired,
};

export default function ListScreen(props) {
  return (
    <UserContext.Consumer>
      {
        (value) => (
          <ListScreenComponent
            navigation={props.navigation}
            token={value.token}
            setToken={value.setToken}
          />
        )
      }
    </UserContext.Consumer>
  );
}
