import React from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {View} from 'react-native-ui-lib';
import {UIColors} from '../../theme/colors';

const Loading = () => {
  return (
    <View
      style={StyleSheet.absoluteFillObject}
      centerV
      centerH
      flex-1
      backgroundColor={UIColors.darkMode}>
      <ActivityIndicator size="large" color={UIColors.eksiGreen} />
    </View>
  );
};

export default Loading;
