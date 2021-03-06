import {StyleSheet} from 'react-native';
import {UIColors} from '../../theme/colors';

export const styles = StyleSheet.create({
  box: {
    height: 30,
    width: 40,
    backgroundColor: UIColors.darkMode,
    borderWidth: 1,
    borderColor: UIColors.textColor,
    padding: 4,
    overflow: 'visible',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    marginHorizontal: 3,
  },
  flat: {
    height: 100,
    width: 32,
    borderWidth: 1,
    borderColor: UIColors.textColor,
    borderRadius: 4,
    backgroundColor: UIColors.darkMode,
  },
  flatContainer: {
    paddingHorizontal: 6,
  },
});
