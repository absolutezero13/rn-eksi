import React from 'react';
import {Pressable} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {Text, View} from 'react-native-ui-lib';
import {UIColors} from '../../theme/colors';
import {styles} from './PageBoxes.style';

interface IProps {
  totalPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const PageBoxes = ({totalPages, currentPage, setCurrentPage}: IProps) => {
  const [dropDownVisible, setDropDownVisible] = React.useState(false);

  const DropDown = () => {
    return (
      <View
        style={{
          position: 'absolute',
          top: -100,
        }}>
        <FlatList
          data={Array(totalPages).fill(0)}
          style={{height: 100, width: totalPages.toString().length * 16}}
          contentContainerStyle={{
            paddingHorizontal: 6,
            borderWidth: 1,
            borderColor: UIColors.textColor,
            borderRadius: 4,
          }}
          renderItem={({item, index}) => (
            <Text
              regularText
              color={currentPage === index + 1 ? 'white' : 'gray'}
              onPress={() => {
                setCurrentPage(index + 1);
                setDropDownVisible(false);
              }}>
              {index + 1}
            </Text>
          )}
        />
      </View>
    );
  };

  return (
    <View height={30} centerH marginT-24 row>
      {currentPage !== 1 && (
        <View style={styles.box}>
          <Text
            regularText
            textColor
            onPress={() => {
              if (currentPage !== 1) {
                setCurrentPage(prev => prev - 1);
              }
            }}>
            {'<<<'}
          </Text>
        </View>
      )}
      <View>
        {dropDownVisible && <DropDown />}
        <View style={styles.box}>
          <Text
            regularText
            textColor
            onPress={() => setDropDownVisible(!dropDownVisible)}>
            {currentPage}{' '}
          </Text>
        </View>
      </View>

      <View centerV>
        <Text regularText textColor marginH-3>
          /
        </Text>
      </View>
      <View style={styles.box}>
        <Text regularText onPress={() => setCurrentPage(totalPages)} textColor>
          {totalPages}
        </Text>
      </View>
      {currentPage < totalPages && (
        <View style={styles.box}>
          <Text
            regularText
            textColor
            onPress={() => {
              if (currentPage < totalPages) {
                setCurrentPage(prev => prev + 1);
              }
            }}>
            {'>>>'}
          </Text>
        </View>
      )}
    </View>
  );
};

export default PageBoxes;
