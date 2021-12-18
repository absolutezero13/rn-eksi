import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  dropDown: {
    position: 'absolute',
    top: 30,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    zIndex: 99,
    padding: 10,
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },

  br: autoCompleteResults => ({
    borderRadius: 10,
    borderBottomEndRadius: autoCompleteResults?.length > 0 ? 0 : 10,
    borderBottomStartRadius: autoCompleteResults?.length > 0 ? 0 : 10,
    borderBottomLeftRadius: autoCompleteResults?.length > 0 ? 0 : 10,
    borderBottomRightRadius: autoCompleteResults?.length > 0 ? 0 : 10,
  }),
});
