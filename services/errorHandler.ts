import {Alert} from 'react-native';
import {navRef} from '../App';

export const handleError = (error: any) => {
  Alert.alert(
    'Hata',
    error.message,
    [
      {
        text: 'Tamam',
        onPress: () => navRef.goBack(),
      },
    ],
    {cancelable: false},
  );
};
