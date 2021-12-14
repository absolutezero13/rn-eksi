import React from 'react';
import {Image, Text, View} from 'react-native-ui-lib';
import {IEntry} from '../../services/interfaces';
import {UIColors} from '../../theme/colors';
import HTML from 'react-native-render-html';
import whiteDrop from '../../imgs/white-drop.png';

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
};

const Entry = ({entry}: {entry: IEntry}) => {
  return (
    <View>
      <View marginB-6>
        <HTML
          source={{html: entry.body}}
          contentWidth={300}
          tagsStyles={tagStyles}
        />
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
        <Text style={{textAlign: 'right'}} eksiGreen smallText>
          {entry.author}{' '}
        </Text>
      </View>
    </View>
  );
};

export default Entry;
