import React from 'react';
import {TextInput} from 'react-native-paper';
import {Text, StyleSheet} from 'react-native'

export default props => {
  const {
    isEdit,
    fieldName,
    editableValue,
    savedValue,
    placeholder,
    handleTextChange,
    customTextStyle
  } = props;
  return isEdit ? (
    <TextInput
      onChangeText={text => handleTextChange(fieldName, text)}
      value={editableValue}
    />
  ) : (
    <Text style={customTextStyle}>{savedValue || placeholder}</Text>
  );
};
