import {StyleSheet} from 'react-native';
import {UIColors} from '../../theme/colors';

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

  input: {
    fontFamily: 'SourceSansPro-SemiBold',
    color: UIColors.darkerTextColor,
    padding: 12,
  },
});

export const borderStyles = (autoCompleteResults: string[]) => ({
  br: {
    borderRadius: 10,
    borderBottomEndRadius: autoCompleteResults?.length > 0 ? 0 : 10,
    borderBottomStartRadius: autoCompleteResults?.length > 0 ? 0 : 10,
    borderBottomLeftRadius: autoCompleteResults?.length > 0 ? 0 : 10,
    borderBottomRightRadius: autoCompleteResults?.length > 0 ? 0 : 10,
  },
});
