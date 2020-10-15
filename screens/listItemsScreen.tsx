import * as React from 'react';
import {
  View,
  Text,
  FlatList,
  Modal,
  TextInput,
} from 'react-native';
import PropTypes from 'prop-types';
import MyButton from '../components/MyButton';
import { ButtonStyle, modalStyle, textStyle } from '../Style/StyleSheet';
import { itemsStyle } from '../Style/listStyle';
import { homeRoute, disconnectRoute } from '../routes';
import { ScrollView } from 'react-native-gesture-handler';

export default function listItemsScreen({ route, navigation }) {
  const { name } = route.params;
  var testname = 'test'
  var disconnectModalVisible = false;
  var deleteModalVisible = true;

  const setDisconnectModalVisible = (status) => {
    disconnectModalVisible = status;
    console.log(disconnectModalVisible)
  }
  const setDeleteModalVisible = (status) => {
    deleteModalVisible = status;
    console.log(deleteModalVisible)
  }

  function disconnect() {
    setDisconnectModalVisible(false)
    //add disconnect feature
  }
  
  const deleteList = () => {
    setDeleteModalVisible(true);
    //add request to delete the list
  };

  // Use name to request data to the server
  console.log(name)
  var data = [
    {
      name: 'choucroutte',
      quantity: 1,
      id: '1',
    },
    {
      name: 'poires',
      quantity: 4,
      id: '2',
    },
    {
      name: 'steak',
      quantity: 3,
      id: '3',
    },
    {
      name: 'sel',
      quantity: 1,
      id: '4',
    },
    {
      name: 'pommes',
      quantity: 5,
      id: '5',
    },
    {
      name: 'patates',
      quantity: 5,
      id: '6',
    },
    {
      name: 'farine',
      quantity: 1,
      id: '7',
    },
    {
      name: 'poussière d\'étoile',
      quantity: 2,
      id: '8',
    },
  ];

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
              disconnect();
              navigation.navigate(disconnectRoute);
            }}
            styleButton={ButtonStyle.buttonDisconnect}
            styleText={ButtonStyle.text}
          />
        </View>
      ),
    });
  }, [navigation]);

  // Supposed to be a callback to update the item name but doesn't work
  const updateValue = (value, item, index) => {
    console.log("CL loaded")
    console.log("END EDITING")
    console.log(item.name)
  }

  const renderItemList = ({ item, index }) => {
    var nameItem = '' + item.name;
    return (
      <View style={itemsStyle.itemsContainer}>
        <View style={itemsStyle.item}>
          <View style={itemsStyle.number}>
            <TextInput
              style={itemsStyle.numberText}
              value={'' + item.quantity}
              keyboardType={'number-pad'}>
            </TextInput>
          </View>
          <ScrollView
          horizontal={true}>
            <TextInput
              style={itemsStyle.itemText}
              value={testname} //This name stay the same value and erase the new one
              onChangeText={(value) => {
                testname = value;
                console.log(value)
                console.log(testname)
                console.log('Suppose to call a callback here and update the new value')
              }}>
            </TextInput>
          </ScrollView>
        </View>
      </View>
    );
  }

  return (
    <View>
        <FlatList
          data={data}
          renderItem={renderItemList}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={
            <>
              <MyButton
              title="Delete list"
              onPress={setDeleteModalVisible}
              styleButton={ButtonStyle.buttonDelete}
              styleText={ButtonStyle.text}
              />
              <MyButton
                title="Create a new item"
                onPress={() => navigation.reset({
                  index: 0,
                  routes: [{ name: homeRoute }],
                })}
                styleButton={ButtonStyle.buttonTopBar}
                styleText={ButtonStyle.text}
              />
            </>
          }
          ListFooterComponent={
            <View style={{height:280}}/>
          }
        />
        <Modal
          animationType="slide"
          transparent={true}
          visible={disconnectModalVisible}
          onRequestClose={() => {
            console.log("Modal has been closed.");
          }}
        >
          <View style={modalStyle.centerModal}>
            <View style={modalStyle.basicModal}>
              <MyButton
                  title="X"
                  onPress={() => {
                    setDisconnectModalVisible(false);
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
                      setDisconnectModalVisible(false);
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
          transparent={true}
          visible={disconnectModalVisible}
          onRequestClose={() => {
            console.log("Modal has been closed.");
          }}
        >
          <View style={modalStyle.centerModal}>
            <View style={modalStyle.basicModal}>
              <MyButton
                  title="X"
                  onPress={() => {
                    setDisconnectModalVisible(false);
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
                      setDeleteModalVisible(false);
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

listItemsScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
    setOptions: PropTypes.func.isRequired,
  }).isRequired,
};
