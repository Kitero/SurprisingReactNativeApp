import { StyleSheet } from 'react-native';

const listStyle = StyleSheet.create({
  elementStyle: {
    paddingTop: 8,
    paddingLeft: 7,
    paddingRight: 7,
    margin: 10,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: '#00b70e',
    borderRadius: 5,
    borderColor: '#00b70e',
    height: 80,
    justifyContent: 'center',
  },
  listContainer: {
    alignItems: 'stretch',
  },
  nameStyle: {
    fontSize: 30,
    paddingLeft: 20,
    paddingRight: 20,
    color: '#ffffff',
    textAlign: 'center',
  },
  itemStyle: {

  },
});

const itemsStyle = StyleSheet.create({
  number: {
    backgroundColor: '#2465ff',
    borderRadius: 18,
    borderWidth: 0.5,
    borderColor: '#2465ff',
    height: 36,
    width: 36,
    marginLeft: 5,
    marginTop: 10,
    marginBottom: 5,
    paddingTop: 1,
  },
  numberText: {
    fontSize: 22,
    textAlign: 'center',
    color: '#fff',
  },
  item: {
    backgroundColor: '#5084ff',
    borderWidth: 0.5,
    borderColor: '#5084ff',
    borderRadius: 5,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 5,
    flexDirection: 'row',
    alignContent: 'stretch',
  },
  itemText: {
    marginTop: 10,
    marginLeft: 10,
    fontSize: 22,
    backgroundColor: 'rgba(0,0,0,0)',
    width: 'auto',
    color: '#fff'
  },
});

const keyboardAvoider = StyleSheet.create({
  avoiderStyle: {
    paddingBottom: 40,
  }
});

export {
  listStyle,
  itemsStyle,
  keyboardAvoider,
};
