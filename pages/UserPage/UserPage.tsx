import {RouteProp, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import HTML from 'react-native-render-html';
import {Image, Text, View} from 'react-native-ui-lib';
import {tagStyles} from '../../components/Entry/Entry';
import Loading from '../../components/Loading/Loading';
import {IUser} from '../../services/interfaces';
import {getUser} from '../../services/services';
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
  useEffect(() => {
    getUser(route.params?.nick).then(res => {
      setUser(res);
    });
  }, []);

  return (
    <View paddingH-16 backgroundColor={UIColors.darkMode} flex-1>
      {user ? (
        <View marginT-12>
          <View marginT-12>
            <View style={{opacity: 0.5}}>
              <Image source={require('../../imgs/quoteLeft.png')} />
            </View>
            <HTML
              source={{
                html: user.quote_entry_body,
              }}
              contentWidth={screenWidth}
              tagsStyles={tagStyles}
            />
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
        </View>
      ) : (
        <Loading />
      )}
    </View>
  );
};

export default UserPage;
