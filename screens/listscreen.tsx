import * as React from 'react';
import {
  View, FlatList, Image,
} from 'react-native';
import PropTypes from 'prop-types';
import MyButton from '../components/MyButton';
import { listStyle } from '../Style/listStyle';
import { homeRoute, listItemsRoute, cameraRoute } from '../routes';
import MyDropDown from '../components/MyDropDown';
import dropDownStyle from '../Style/dropdownStyle';
import { createShoppingList, getShoppingList } from '../apiCaller';
import SingleFieldModal from '../modals/singleFieldModal';
import YesNoModal from '../modals/yesNoModal';
import { UserContext } from '../contexts/userContext';
import { INavigation } from '../interfaces/navigation';
import { IList } from '../interfaces/api';

interface IItemProps {
  item: IList;
}

const getRenderItemList = (navigation: INavigation) => {
  const renderItemList = ({ item }: IItemProps) => {
    function loadListDetail(name: string, listId: string) {
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

interface IScreenProps {
  navigation: INavigation;
}

interface IProps extends IScreenProps {
  token: string;
  setToken: Function;
}

function ListScreenComponent({ navigation, token, setToken }: IProps) {
  const [dataLists, setDataLists] = React.useState<IList[]>([]);
  const [disconnectModalVisible, setDisconnectModalVisible] = React.useState(false);
  const [newItemModalVisible, setNewItemModalVisible] = React.useState(false);

  const [ProfilPicture, setProfilePicture] = React.useState({ uri: 'https://t4.ftcdn.net/jpg/03/46/93/61/360_F_346936114_RaxE6OQogebgAWTalE1myseY1Hbb5qPM.jpg' });

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
    navigation.navigate(cameraRoute);
  };

  const OpenModalNewList = () => {
    setNewItemModalVisible(true);
  };

  const OpenDisconnectModal = () => {
    setDisconnectModalVisible(true);
  };

  function handleCreateShoppingList(listName: string, setErrors: Function) {
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
                uri: ProfilPicture.uri,
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
  setToken: PropTypes.func.isRequired,
};

export default function ListScreen({ navigation }: IScreenProps) {
  return (
    <UserContext.Consumer>
      {
        (value) => (
          <ListScreenComponent
            navigation={navigation}
            token={value.token}
            setToken={value.setToken}
          />
        )
      }
    </UserContext.Consumer>
  );
}

ListScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
    setOptions: PropTypes.func.isRequired,
    addListener: PropTypes.func.isRequired,
  }).isRequired,
};
