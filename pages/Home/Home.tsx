import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View, Text} from 'react-native-ui-lib';

const Home = () => {
  return (
    <View>
      <SafeAreaView edges={['bottom']} />
      <Text>home</Text>
    </View>
  );
};

export default Home;
