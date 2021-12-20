import React, {useState} from 'react';
import {Image, Text, View} from 'react-native-ui-lib';
import {IEntry} from '../../services/interfaces';
import {UIColors} from '../../theme/colors';
import {RenderHTML} from 'react-native-render-html';
import whiteDrop from '../../imgs/white-drop.png';
import {screenWidth} from '../../utils/constants';
import {StackActions, useNavigation} from '@react-navigation/native';
import PressableOpacity from '../PressableOpacityComponent/PressableOpacity';
import {Linking} from 'react-native';
import {getSearchResults} from '../../services/services';
import slugify from 'slugify';

const systemFonts = ['SourceSansPro-SemiBold'];

export const tagStyles = {
  body: {
    color: UIColors.textColor,
    fontSize: 16,
    fontFamily: 'SourceSansPro-SemiBold',
    fontWeight: 'normal',
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

  const RendererProps = {
    a: {
      onPress: (e, href: string) => {
        if (href.startsWith('about:///')) {
          const text =
            e.target._internalFiberInstanceHandleDEV._debugOwner.memoizedProps
              .children;

          getSearchResults(slugify(text)).then(res => {
            console.log('SEARCH RESULTS', res);

            const thread: any = res.threads.find(thread => {
              console.log('COMPARING', thread.title, text);
              return thread.title === text;
            });
            navigation.dispatch(
              StackActions.push('Entries', {
                slug: thread
                  ? thread.slug.replace('https://eksisozluk.com', '')
                  : res.threads[0].slug.replace('https://eksisozluk.com', ''),
                title: thread ? thread.title : res.threads[0].title,
                isSearch: true,
              }),
            );
          });
        } else {
          Linking.openURL(href);
        }
      },
    },
  };

  return (
    <View paddingH-16>
      <View marginB-6>
        <RenderHTML
          htmlParserOptions={{
            decodeEntities: true,
          }}
          source={{
            html:
              entry.body.length > 400 && !showFullEntry
                ? entry.body.slice(0, 400) + '...'
                : entry.body,
          }}
          contentWidth={screenWidth}
          renderersProps={RendererProps}
          tagsStyles={tagStyles}
          systemFonts={systemFonts}
        />
        {entry.body.length > 400 && !showFullEntry && (
          <PressableOpacity onPress={handleShowFullEntry}>
            <Text eksiGreen regularText>
              ...devamını okuyayım
            </Text>
          </PressableOpacity>
        )}
      </View>
      <View marginB-3 right centerV row>
        <Image source={whiteDrop} width={14} height={14} />
        <Text marginL-6 textColor regularText>
          {entry.fav_count}{' '}
        </Text>
      </View>
      <View right>
        <Text marginB-3 textColor smallText>
          {entry.created_at} {entry.updated_at ? '~ ' + entry.updated_at : ''}
        </Text>
        <PressableOpacity
          onPress={() => navigation.navigate('UserPage', {nick: entry.author})}>
          <Text style={{textAlign: 'right'}} eksiGreen smallText>
            {entry.author}{' '}
          </Text>
        </PressableOpacity>
      </View>
    </View>
  );
};

export default Entry;
