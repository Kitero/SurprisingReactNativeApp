import * as React from 'react';
import {
  Text,
  View,
  FlatList,
  Modal,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import dropDownStyle from '../Style/dropdownStyle';
import MyButton from './MyButton';

export default function MyDropDown({
  styleElements, data, title,
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
      <Text style={{ textAlign: 'center' }}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  renderItemList.propTypes = {
    item: PropTypes.shape({
      title: PropTypes.string,
      callBack: PropTypes.func,
      id: PropTypes.string,
    }).isRequired,
  };

  return (
    <>
      <MyButton
        title={title}
        onPress={() => {
          setIsVisible(!isVisible);
        }}
        styleButton={dropDownStyle.dropDownStyle.triggerButton}
        styleText={dropDownStyle.dropDownStyle.triggerButtonText}
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
          style={{ flex: 1, width: 'auto' }}
        />
        <View style={dropDownStyle.dropDownStyle.list}>
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
  styleElements: PropTypes.shape({
    color: PropTypes.string,
    textAlign: PropTypes.string,
    fontSize: PropTypes.number,
    backgroundColor: PropTypes.string,
    paddingTop: PropTypes.number,
    paddingLeft: PropTypes.number,
    paddingRight: PropTypes.number,
    paddingBottom: PropTypes.number,
    marginTop: PropTypes.number,
    marginBottom: PropTypes.number,
    justifyContent: PropTypes.string,
  }),
  title: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    callBack: PropTypes.func,
  })).isRequired,
};

MyDropDown.defaultProps = {
  styleElements: dropDownStyle.dropDownStyle.element,
};
