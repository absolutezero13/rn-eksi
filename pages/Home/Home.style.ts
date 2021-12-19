import {Platform, StyleSheet} from 'react-native';
import {UIColors} from '../../theme/colors';
import {screenWidth} from '../../utils/constants';

export const styles = StyleSheet.create({
  img: {
    width: screenWidth / 3,
    height: 40,
  },
  dropDown: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 75 : 50,
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

export const topicLinkStyles = (selectedTopicFilter: string, value: string) =>
  StyleSheet.create({
    container: {
      borderBottomColor:
        selectedTopicFilter === value ? UIColors.eksiGreen : UIColors.disabled,
      borderBottomWidth: 5,
      marginHorizontal: 12,
      width: 70,
    },
    text: {
      color:
        selectedTopicFilter === value ? UIColors.eksiGreen : UIColors.disabled,
    },
  });
