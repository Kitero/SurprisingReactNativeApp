import * as React from 'react';
import {
  View, FlatList, Modal, Text,
} from 'react-native';
import PropTypes from 'prop-types';
import MyButton from '../components/MyButton';
import { ButtonStyle, modalStyle, textStyle } from '../Style/StyleSheet';
import { listStyle } from '../Style/listStyle';
import { homeRoute, listItemsRoute, cameraRoute } from '../routes';
import MyDropDown from '../components/MyDropDown';
import { dropDownStyle } from '../Style/dropdownStyle';
import MyTextInput from '../components/MyTextInput';

export default function listScreen({ navigation }) {
  // example datalist, replace it with server data
  const baseData = [
    {
      name: 'course 1',
      id: '1',
    },
    {
      name: 'course 2',
      id: '2',
    },
    {
      name: 'course 3',
      id: '3',
    },
    {
      name: 'course 4',
      id: '4',
    },
    {
      name: 'course 5',
      id: '5',
    },
    {
      name: 'course 6',
      id: '6',
    },
    {
      name: 'course 7',
      id: '7',
    },
    {
      name: 'course 8',
      id: '8',
    },
    {
      name: 'course 9',
      id: '9',
    },
    {
      name: 'course 10',
      id: '10',
    },
    {
      name: 'course 11',
      id: '11',
    },
    {
      name: 'course 12',
      id: '12',
    },
    {
      name: 'course 13',
      id: '13',
    },
    {
      name: 'course 14',
      id: '14',
    },
    {
      name: 'course 15',
      id: '15',
    },
  ];

  const [dataLists, setDataLists] = React.useState(baseData);
  const [disconnectModalVisible, setDisconnectModalVisible] = React.useState(false);
  const [newItemModalVisible, setNewItemModalVisible] = React.useState(false);
  const [newItemName, setNewItemName] = React.useState('');

  const disconnect = () => {
    setDisconnectModalVisible(!disconnectModalVisible);
    navigation.reset({
      index: 0,
      routes: [{ name: homeRoute }],
    });
  }

  const setNewID = () => {
    if (dataLists.length == 0) {
      return '0';
    }
    return ('' + (parseInt(dataLists[dataLists.length - 1].id, 10) + 1));
  }

  const saveNewData = () => {
    console.log('Save new data');
  }

  const setPP = () => {
    console.log('set PP');
    navigation.navigate(cameraRoute);
  }

  const createNewList = () => {
    console.log("create new list");
  }

  const triggerModalNewList = () => {
    setNewItemModalVisible(!newItemModalVisible);
  }

  const dropdownData = [
    {
      title: 'Create new list',
      callBack: triggerModalNewList,
      id: '1',
    },
    {
      title: 'Set profil picture',
      callBack: setPP,
      id: '2',
    },
    {
      title: 'Disconnect',
      callBack: disconnect,
      id: '3',
    },
  ];

  // Set "Create new list" and "disconnect" buttons in the top bar
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

  function loadListDetail(name) {
    navigation.navigate(listItemsRoute, {
      name,
    });
  }

  const renderItemList = ({ item }) => (
    <>
      <MyButton
        title={item.name}
        styleButton={listStyle.elementStyle}
        styleText={listStyle.nameStyle}
        onPress={() => loadListDetail(item.name)}
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
        keyExtractor={({ id }) => id}
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
        visible={newItemModalVisible}
      >
        <View style={modalStyle.centerModal}>
          <View style={modalStyle.basicModalNewList}>
            <MyButton
              title="X"
              onPress={() => {
                setNewItemModalVisible(!newItemModalVisible);
              }}
              styleButton={ButtonStyle.buttonClose}
              styleText={ButtonStyle.text}
            />
            <Text style={textStyle.text}>
              Create new list
            </Text>
            <View style={modalStyle.modalContainerColumn}>
              <MyTextInput
                placeholder={"name"}
                value={newItemName}
                onChangeText={(text) => {
                  setNewItemName(text)
                }}>
              </MyTextInput>
              <MyButton
                title="Create"
                onPress={() => {
                  dataLists
                  dataLists.push({
                    name: newItemName,
                    id: setNewID()
                  });
                  setDataLists((dataLists.slice()));
                  setNewItemName('');
                  saveNewData();
                  setNewItemModalVisible(!newItemModalVisible);
                }}
                styleButton={modalStyle.modalButton}
                styleText={ButtonStyle.text}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

listScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
    setOptions: PropTypes.func.isRequired,
  }).isRequired,
};
