import React from 'react';
import {TextInput} from 'react-native-gesture-handler';
import {View} from 'react-native-ui-lib';
import {styles} from './SearchInput.style';
import {autoComplete} from '../../services/services';
import {UIColors} from '../../theme/colors';
import {screenWidth} from '../../utils/constants';

interface Props {
  value: string;
  setValue: (value: string) => void;
  autoCompleteResults: any;
  setAutoCompleteResults: (value: any) => void;
}

const SearchInput = ({
  value,
  setValue,
  autoCompleteResults,
  setAutoCompleteResults,
}: Props) => {
  return (
    <View
      marginL-5
      style={styles.br(autoCompleteResults)}
      padding-6
      width={screenWidth / 2}
      backgroundColor="white">
      <TextInput
        autoCapitalize="none"
        value={value}
        autoCorrect={false}
        onBlur={() => setAutoCompleteResults(undefined)}
        placeholder="başlık, entry, yazar"
        placeholderTextColor={UIColors.darkerTextColor}
        style={{
          fontFamily: 'SourceSansPro-SemiBold',
        }}
        onChangeText={text => {
          setValue(text);
          if (text) {
            autoComplete(text).then(res =>
              setAutoCompleteResults([
                ...res?.Titles,
                ...res?.Nicks.map(nick => '@' + nick),
              ]),
            );
          } else {
            setAutoCompleteResults([]);
          }
        }}
      />
    </View>
  );
};

export default SearchInput;
