import React from 'react';
import 'react-native-gesture-handler';
import './theme/UIConfig';
import ExampleComponent from './components/ExampleComponent';
import {Typography, Colors, Spacings} from 'react-native-ui-lib';
import {RootNavigation} from './navigation/RootNavigation';
import {NavigationContainer} from '@react-navigation/native';

const App = () => {
  return (
    <NavigationContainer>
      <RootNavigation />
    </NavigationContainer>
  );
};
export default App;
