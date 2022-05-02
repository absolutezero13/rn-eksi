import {
  RouteProp,
  StackActions,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import HTML from 'react-native-render-html';
import {Image, Text, View} from 'react-native-ui-lib';
import slugify from 'slugify';
import {tagStyles} from '../../components/Entry/Entry';
import Loading from '../../components/Loading/Loading';
import PressableOpacity from '../../components/PressableOpacityComponent/PressableOpacity';
import {IUser} from '../../services/interfaces';
import {getSearchResults, getUser} from '../../services/services';
import {UIColors} from '../../theme/colors';
import {screenWidth} from '../../utils/constants';

type RouteProps = {
  params: {
    nick: string;
  };
};

const UserPage = () => {
  const [user, setUser] = useState<IUser>();
  const route = useRoute<RouteProp<RouteProps, 'params'>>();
  const navigation = useNavigation();

  useEffect(() => {
    getUser(route.params?.nick).then(res => {
      setUser(res);
    });
  }, []);

  const goToNickEntries = () =>
    getSearchResults(slugify(route.params.nick)).then(res => {
      console.log('SEARCH RESULTS', res);

      const thread: any = res.threads.find(thread => {
        console.log('COMPARING', thread.title, route.params.nick);
        return thread.title === route.params.nick;
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

  return (
    <View paddingH-16 backgroundColor={UIColors.darkMode} flex-1>
      {user ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 40}}
          marginT-12>
          <View marginT-12>
            <View style={{opacity: 0.5}}>
              <Image source={require('../../imgs/quoteLeft.png')} />
            </View>
            <Text marginB-24 h3 textColor>
              {user.quote_entry_title}
            </Text>
            <HTML
              source={{
                html: user.quote_entry_body,
              }}
              contentWidth={screenWidth}
              tagsStyles={tagStyles}
            />
            <Text
              marginT-6
              style={{textAlign: 'right'}}
              marginB-3
              textColor
              smallText>
              {user.quote_entry_date}
            </Text>
            <View right style={{opacity: 0.5}}>
              <Image source={require('../../imgs/quoteRight.png')} />
            </View>
          </View>
          <Text textColor regularText>
            son entry giriş: <Text eksiGreen> {user?.last_entry_time} </Text>
          </Text>
          <Text textColor regularText>
            toplam entry:
            <Text eksiGreen> {user?.entry_count_total}</Text>
          </Text>
          <PressableOpacity
            onPress={goToNickEntries}
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 12}}>
            <Text smallerText textColor>
              Nick altına git
            </Text>
            <Image
              style={{width: 20, height: 20}}
              source={require('../../imgs/nextIcon.png')}
            />
          </PressableOpacity>
        </ScrollView>
      ) : (
        <Loading />
      )}
    </View>
  );
};

export default UserPage;
