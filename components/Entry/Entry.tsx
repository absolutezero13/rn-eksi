import React, {useState} from 'react';
import {Image, Text, View} from 'react-native-ui-lib';
import {IEntry} from '../../services/interfaces';
import {UIColors} from '../../theme/colors';
import HTML from 'react-native-render-html';
import whiteDrop from '../../imgs/white-drop.png';
import {screenWidth} from '../../utils/constants';
import {useNavigation} from '@react-navigation/native';

const tagStyles = {
  p: {
    color: UIColors.textColor,
    fontWeight: 'normal',
    fontFamily: 'SourceSansPro-SemiBold',
  },
  body: {
    color: UIColors.textColor,
    fontSize: 16,
    fontFamily: 'SourceSansPro-SemiBold',
  },
  span: {
    color: UIColors.eksiGreen,
  },
};

const Entry = ({entry}: {entry: IEntry}) => {
  const navigation = useNavigation();
  const [showFullEntry, setShowFullEntry] = useState(false);

  const handleShowFullEntry = () => {
    setShowFullEntry(true);
  };

  return (
    <View paddingH-16>
      <View marginB-6>
        <HTML
          source={{
            html:
              entry.body.length > 400 && !showFullEntry
                ? entry.body.slice(0, 400) + '...'
                : entry.body,
          }}
          contentWidth={screenWidth}
          tagsStyles={tagStyles}
        />
        {entry.body.length > 400 && !showFullEntry && (
          <Text onPress={handleShowFullEntry} eksiGreen regularText>
            ...devamını okuyayım
          </Text>
        )}
      </View>
      <View marginB-3 style={{alignSelf: 'flex-end'}} centerV row>
        <Image source={whiteDrop} width={14} height={14} />
        <Text marginL-6 textColor regularText>
          {entry.fav_count}{' '}
        </Text>
      </View>
      <View style={{justifyContent: 'flex-end', alignSelf: 'flex-end'}}>
        <Text marginB-3 textColor smallText>
          {entry.created_at} {entry.updated_at ? '~ ' + entry.updated_at : ''}
        </Text>
        <Text
          onPress={() => navigation.navigate('UserPage', {nick: entry.author})}
          style={{textAlign: 'right'}}
          eksiGreen
          smallText>
          {entry.author}{' '}
        </Text>
      </View>
    </View>
  );
};

export default Entry;
