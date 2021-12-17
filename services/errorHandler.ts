import {Alert} from 'react-native';

export const handleError = (error: any) => {
  Alert.alert(
    'Hata',
    error.message,
    [
      {
        text: 'Tamam',
        onPress: () => console.log('OK Pressed'),
      },
    ],
    {cancelable: false},
  );
};
