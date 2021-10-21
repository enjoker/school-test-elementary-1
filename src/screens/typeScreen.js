import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import styles from '../styles/style';
import {Image, Icon, Avatar, normalize, Card} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';

const typeScreen = ({navigation, route}) => {
  const ContainerContent = () => {
    const SubGradeDetail = useSelector(state => state.subGrade.showSubGrade);
    const {couresName} = route.params;
    const [colorBox, setcolorBox] = useState([
      '#028c6a',
      '#1FA246',
      '#FFA73F',
      '#2E59F1',
      '#FF4E4E',
      '#EF2A80',
      '#B13AFA',
    ]);

    return (
      <View>
        <Text
          style={[
            styles.textMedium34,
            {textAlign: 'center', color: '#333333'},
          ]}>
          {couresName}
        </Text>
        <ScrollView>
          <View style={{flex: 1, alignItems: 'center'}}>
            {SubGradeDetail !== null
              ? SubGradeDetail.map((item, index) => {
                  return (
                    <TouchableOpacity
                      key={item.csg_id}
                      style={{marginVertical: 10, height: 70}}
                      onPress={() =>
                        navigation.navigate('optionTest', {
                          subid: item.csg_id,
                          gradeid: item.cgd_id,
                          csgName: item.csg_name,
                          couresName: couresName,
                        })
                      }>
                      <ImageBackground
                        style={{flex: 1.5, justifyContent: 'center'}}
                        source={require('../assets/images/bg-Artboard.png')}
                        resizeMode="stretch">
                        <Text
                          style={[
                            styles.textBold18,
                            {
                              width: wp('80%'),
                              textAlign: 'center',
                              textAlignVertical: 'center',
                              padding: 10,
                              borderRadius: 8,
                              color: '#fff',
                            },
                          ]}>
                          {item.csg_name}
                        </Text>
                      </ImageBackground>
                    </TouchableOpacity>
                  );
                })
              : null}
          </View>
        </ScrollView>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground
        style={{flex: 1}}
        source={require('../assets/images/Background-Class.png')}>
        <View
          style={{
            padding: 15,
            paddingBottom: 0,
            marginBottom: 10,
            flex: 1,
          }}>
          <ScrollView style={{flex: 1}}>
            <ContainerContent />
          </ScrollView>
          <TouchableOpacity style={{alignItems: 'center'}}>
            <Text
              style={[
                styles.textLight20,
                {
                  padding: 10,
                  borderRadius: 8,
                  backgroundColor: '#FAFE2F',
                  color: '#6E7015',
                },
              ]}>
              ดาวน์โหลดวิชาอื่น ๆ กดตรงนี้
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <View
        style={{
          backgroundColor: '#EEEEEE',
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>Ads Area</Text>
      </View>
    </SafeAreaView>
  );
};

export default typeScreen;
