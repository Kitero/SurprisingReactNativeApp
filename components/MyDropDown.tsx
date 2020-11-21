import * as React from 'react';
import {
  Text,
  View,
  FlatList,
  Modal,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import { dropDownStyle } from '../Style/dropdownStyle';
import MyButton from './MyButton';

export default function MyDropDown({
  styleList, styleElements, data, title,
}) {
  const [isVisible, setIsVisible] = React.useState(false);

  const renderItemList = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        setIsVisible(!isVisible);
        item.callBack();
      }}
      style={styleElements}
    >
      <Text style={{textAlign: 'center'}}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <>
      <MyButton
        title={title}
        onPress={() => {
          setIsVisible(!isVisible);
        }}
        styleButton={dropDownStyle.triggerButton}
        styleText={dropDownStyle.triggerButtonText}
      />
      <Modal
        animationType="fade"
        transparent
        visible={isVisible}
      >
        <TouchableOpacity
          onPress={() => {
            setIsVisible(!isVisible);
          }}
          style={{flex: 1, width: 'auto'}}>
        </TouchableOpacity>
        <View style={dropDownStyle.list}>
          <FlatList
            data={data}
            renderItem={renderItemList}
            keyExtractor={(item) => item.id}
          />
        </View>
      </Modal>
    </>
  );
}

MyDropDown.propTypes = {
  styleList: PropTypes.shape({
    position: PropTypes.string,
    paddingTop: PropTypes.number,
    paddingBottom: PropTypes.number,
    paddingLeft: PropTypes.number,
    paddingRight: PropTypes.number,
    marginTop: PropTypes.number,
    marginBottom: PropTypes.number,
    marginLeft: PropTypes.number,
    marginRight: PropTypes.number,
    backgroundColor: PropTypes.string,
    borderRadius: PropTypes.number,
    borderColor: PropTypes.string,
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  styleElements: PropTypes.shape({
    color: PropTypes.string,
    textAlign: PropTypes.string,
    fontSize: PropTypes.number,
    backgroundColor: PropTypes.string,
  }),
  title: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    callBack: PropTypes.func,
  })),
};

MyDropDown.defaultProps = {
  title: 'Menu',
  styleList: dropDownStyle.list,
  styleElements: dropDownStyle.element,
  data: [],
};
