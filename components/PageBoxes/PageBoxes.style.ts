import {StyleSheet} from 'react-native';
import {UIColors} from '../../theme/colors';

export const styles = StyleSheet.create({
  box: {
    height: 30,
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
});
