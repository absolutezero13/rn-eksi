import React from 'react';
import {Image, Text, View} from 'react-native-ui-lib';
import PressableOpacity from '../components/PressableOpacityComponent/PressableOpacity';
import {UIColors} from '../theme/colors';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationOptions} from '@react-navigation/native-stack';

export const HeaderWithBackTitle = ({title}: {title: string}) => {
  const navigation = useNavigation();
  const HeaderOptions: NativeStackNavigationOptions = {
    headerStyle: {
      backgroundColor: UIColors.darkMode,
    },
    title: '',
    headerLeft: () => (
      <View
        style={{alignItems: 'center'}}
        row
        backgroundColor={UIColors.darkMode}>
        <PressableOpacity marginL-12 onPress={() => navigation.goBack()}>
          <Image
            style={{width: 30, height: 30}}
            source={require('../imgs/backIcon.png')}
          />
        </PressableOpacity>
        <View style={{maxWidth: '85%'}} marginL-30>
          <Text textColor darkGreyBlue regularText>
            {title}
          </Text>
        </View>
      </View>
    ),
  };
  return HeaderOptions;
};
