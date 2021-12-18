import {Alert} from 'react-native';
import {navRef} from '../App';

export const handleError = (error: any) => {
  console.log(error);
  Alert.alert(
    'Hata',
    'Bir hata oluştu. Lütfen tekrar deneyin.',
    [
      {
        text: 'Tamam',
        onPress: () => navRef.goBack(),
      },
    ],
    {cancelable: false},
  );
};
