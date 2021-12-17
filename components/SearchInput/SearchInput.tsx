import React from 'react';
import {FlatList, TextInput} from 'react-native-gesture-handler';
import {Text, View} from 'react-native-ui-lib';
import {autoComplete} from '../../services/services';
import {UIColors} from '../../theme/colors';
import {screenWidth} from '../../utils/constants';
import PressableOpacity from '../PressableOpacityComponent/PressableOpacity';

const SearchInput = ({value, setValue}) => {
  const [autoCompleteResults, setAutoCompleteResults] = React.useState<
    string[] | undefined
  >([]);

  const DropDown = () => {
    return (
      <View
        width={screenWidth / 2}
        style={{
          position: 'absolute',
          top: 30,
          backgroundColor: 'white',
          borderBottomWidth: 1,
          zIndex: 1,
          padding: 10,
          flex: 1,
        }}>
        <FlatList
          data={autoCompleteResults}
          style={{height: autoCompleteResults?.length * 40}}
          renderItem={({item}) => (
            <PressableOpacity>
              <Text>{item} </Text>
            </PressableOpacity>
          )}
        />
      </View>
    );
  };

  return (
    <View>
      <View
        marginL-5
        br30
        padding-6
        width={screenWidth / 2}
        backgroundColor="white">
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="başlık, entry, yazar"
          placeholderTextColor={UIColors.darkerTextColor}
          style={{
            fontFamily: 'SourceSansPro-Regular',
          }}
          onChangeText={text => {
            if (text) {
              setValue(text);
              autoComplete(text).then(res =>
                setAutoCompleteResults(res?.Titles),
              );
            }
          }}
        />
      </View>
      {autoCompleteResults && autoCompleteResults.length ? <DropDown /> : null}
    </View>
  );
};

export default SearchInput;
