import * as React from 'react';
import {
  View, FlatList, Modal,
} from 'react-native';
import PropTypes from 'prop-types';
import MyButton from '../components/MyButton';
import { ButtonStyle } from '../Style/StyleSheet';
import { listStyle } from '../Style/listStyle';
import { homeRoute, disconnectRoute, listItemsRoute } from '../routes';

function disconnect() {

}

export default function listScreen({ navigation }) {
  // example datalist, replace it with server data
  const dataLists = [
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
          <MyButton
            title="Create a new list"
            onPress={() => navigation.reset({
              index: 0,
              routes: [{ name: homeRoute }],
            })}
            styleButton={ButtonStyle.buttonTopBar}
            styleText={ButtonStyle.text}
          />
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

  return (
    <View style={listStyle.listContainer}>
      <FlatList
        data={dataLists}
        renderItem={renderItemList}
        keyExtractor={(item) => item.id}
      />
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
