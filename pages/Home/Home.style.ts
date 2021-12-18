import {StyleSheet} from 'react-native';
import {screenWidth} from '../../utils/constants';

export const styles = StyleSheet.create({
  img: {
    width: screenWidth / 3,
    height: 40,
  },
  dropDown: {
    position: 'absolute',
    top: 80,
    right: 5,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    zIndex: 99,
    padding: 10,
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
});
