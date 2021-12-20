import React, {useEffect} from 'react';
import {TextInput} from 'react-native-gesture-handler';
import {View} from 'react-native-ui-lib';
import {borderStyles, styles} from './SearchInput.style';
import {autoComplete} from '../../services/services';
import {UIColors} from '../../theme/colors';
import {screenWidth} from '../../utils/constants';
import {Keyboard} from 'react-native';
import {useDebouncedCallback} from 'use-debounce/lib';

interface Props {
  value: string;
  setValue: (value: string) => void;
  autoCompleteResults: any;
  setAutoCompleteResults: (value: any) => void;
  inputRef: TextInput;
}

const SearchInput = ({
  value,
  setValue,
  autoCompleteResults,
  setAutoCompleteResults,
  inputRef,
}: Props) => {
  const [keyboardShow, setKeyboardShow] = React.useState(false);
  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardShow(true);
    });

    Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardShow(false);
    });
  }, []);

  const searchAutoCompleteResults = useDebouncedCallback(
    async (val: string) => {
      if (val.length > 1) {
        const res = await autoComplete(val);

        if (val) {
          setAutoCompleteResults([
            ...res?.Titles,
            ...res?.Nicks.map(nick => '@' + nick),
          ]);
        }
      } else {
        setAutoCompleteResults([]);
      }
    },
    500,
  );

  const onFocus = () => searchAutoCompleteResults(value);

  const onBlur = () => {
    if (!keyboardShow) {
      setAutoCompleteResults(undefined);
    }
  };

  return (
    <View
      marginL-5
      style={borderStyles(autoCompleteResults).br}
      width={screenWidth / 2}
      backgroundColor="white">
      <TextInput
        ref={inputRef}
        autoCapitalize="none"
        value={value}
        autoCorrect={false}
        // onFocus={onFocus}
        onBlur={onBlur}
        placeholder="başlık, entry, yazar"
        placeholderTextColor={UIColors.disabled}
        style={styles.input}
        onChangeText={val => {
          setValue(val);
          searchAutoCompleteResults(val);
        }}
      />
    </View>
  );
};

export default SearchInput;
