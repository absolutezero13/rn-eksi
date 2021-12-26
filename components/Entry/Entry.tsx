import React, {useContext, useState} from 'react';
import {Image, Text, View} from 'react-native-ui-lib';
import {IEntry} from '../../services/interfaces';
import {UIColors} from '../../theme/colors';
import {RenderHTML} from 'react-native-render-html';
import whiteDrop from '../../imgs/white-drop.png';
import {screenWidth} from '../../utils/constants';
import {StackActions, useNavigation} from '@react-navigation/native';
import PressableOpacity from '../PressableOpacityComponent/PressableOpacity';
import {Alert, Linking} from 'react-native';
import {getSearchResults} from '../../services/services';
import slugify from 'slugify';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Context} from '../../pages/context/context';

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

const RendererProps = nav => ({
  a: {
    onPress: (e, href: string) => {
      if (href.startsWith('about:///')) {
        console.log('event', e.target);
        const text =
          e.target._internalFiberInstanceHandleDEV._debugOwner.memoizedProps
            .children;

        getSearchResults(slugify(text)).then(res => {
          console.log('SEARCH RESULTS', res);

          const thread: any = res.threads.find(thread => {
            return thread.title === text;
          });
          nav.dispatch(
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
});

const Entry = React.memo(function Entry({
  entry,
  isFav,
  title,
}: {
  entry: IEntry;
  isFav: boolean;
  title: string;
}) {
  const navigation = useNavigation();
  const [showFullEntry, setShowFullEntry] = useState(false);
  const {favoriteEntries, setFavoriteEntries} = useContext(Context);

  const handleShowFullEntry = () => {
    setShowFullEntry(true);
  };

  const isFavorite = favoriteEntries.find(e => {
    return e.id === entry.id;
  });

  const onFavoritePress = async () => {
    if (favoriteEntries.length > 0) {
      if (isFavorite) {
        Alert.alert(
          'favorilerden çıkarılsın mı?',
          '',
          [
            {
              text: 'Çıkart',
              onPress: async () => {
                const newFavoriteEntries = favoriteEntries.filter(e => {
                  return e.id !== entry.id;
                });
                await AsyncStorage.setItem(
                  'favoriteEntries',
                  JSON.stringify(newFavoriteEntries),
                );
                setFavoriteEntries(newFavoriteEntries);
              },
            },
            {
              text: 'Vazgeç',
              onPress: () => {
                console.log('Cancel Pressed');
              },
              style: 'cancel',
            },
          ],
          {cancelable: false},
        );

        // const newFavs = JSON.stringify(
        //   favoriteEntries.filter(e => e.id !== entry.id),
        // );
        // AsyncStorage.setItem('favorites', JSON.stringify(newFavs));
        // setFavoriteEntries(JSON.parse(newFavs));
      } else {
        const newFavs = JSON.stringify([...favoriteEntries, {...entry, title}]);
        AsyncStorage.setItem('favorites', JSON.stringify(JSON.parse(newFavs)));
        setFavoriteEntries(JSON.parse(newFavs));
      }
    } else {
      AsyncStorage.setItem('favorites', JSON.stringify([{...entry, title}]));
      setFavoriteEntries([{...entry, title}]);
    }
  };

  return (
    <View paddingH-16>
      <View marginB-6>
        {isFav && (
          <Text marginB-24 marginT-24 h3 textColor>
            {entry.title}
          </Text>
        )}
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
          renderersProps={RendererProps(navigation)}
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
      <PressableOpacity onPress={onFavoritePress}>
        <View marginB-3 right centerV row>
          <Image source={whiteDrop} width={14} height={14} />
          <Text
            marginL-6
            color={isFavorite ? UIColors.eksiGreen : UIColors.textColor}
            regularText>
            {entry.fav_count}{' '}
          </Text>
        </View>
      </PressableOpacity>
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
});

export default Entry;
