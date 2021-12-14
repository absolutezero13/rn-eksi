import React from 'react';
import {Text, View} from 'react-native-ui-lib';
import {IEntry} from '../../services/interfaces';
import {UIColors} from '../../theme/colors';
import HTML from 'react-native-render-html';
// import Icon from 'react-native-vector-icons/FontAwesome';

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
      <Text style={{textAlign: 'right'}} marginR-8 textColor smallText>
        {entry.fav_count}{' '}
      </Text>
      <View style={{justifyContent: 'flex-end'}} row>
        <Text marginR-8 textColor smallText>
          {entry.created_at} {entry.updated_at ? '~ ' + entry.updated_at : ''}
        </Text>
        <Text eksiGreen smallText>
          {entry.author}{' '}
        </Text>
      </View>
    </View>
  );
};

export default Entry;
