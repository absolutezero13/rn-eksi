import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../pages/Home/Home';
import Entries from '../pages/Entries/Entries';
import {Text} from 'react-native-ui-lib';
import {UIColors} from '../theme/colors';
import UserPage from '../pages/UserPage/UserPage';
import {HeaderWithBackTitle} from './headers';
const Stack = createNativeStackNavigator();

export const RootNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Entries"
        component={Entries}
        options={({route}) => HeaderWithBackTitle({title: route.params.title})}
      />
      <Stack.Screen
        name="UserPage"
        component={UserPage}
        options={({route}) => ({
          headerBackTitle: 'Geri',
          headerTitle: () => (
            <Text textColor regularText>
              {route.params.nick.length > 30
                ? `${route.params.nick.substr(0, 20)}...`
                : route.params.nick}
            </Text>
          ),
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: UIColors.darkMode,
          },
        })}
      />
    </Stack.Navigator>
  );
};
