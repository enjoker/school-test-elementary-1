import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  ScrollView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import styles from '../styles/style';
import {Input} from 'react-native-elements';
import {FlatGrid} from 'react-native-super-grid';
import {getCoures} from '../functions/functions';

// import รูปบ้าน
import HomeIcon from '../assets/images/icons/HomeIcon.svg';
import * as couresActions from '../store/actions/coures';
import * as subGradeActions from '../store/actions/subGrade';

const homeScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [couresData, setcouresData] = useState([]);
  // const couresData = useSelector((state: any) => state.coures.showcoures);
  console.log(couresData);
  //const couresData = useSelector(state => state.coures.showcoures);
  //console.log(couresData);
  //const getCouresData = useCallback(() => {
  //  dispatch(couresActions.GETCouresData());
  //}, []);
  //useEffect(() => {
  //  getCouresData();
  //}, []);

  const GetCouresData = async () => {
    const res = await fetch(getCoures(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    res.json().then(res => setcouresData(res));

    // const resData = await res.json();
    // await setNewsData(resData)
  };
  useEffect(() => {
    GetCouresData();
  }, []);
  const ContainerContent = () => {
    const gradeHandler = async (couresSelected, couresName) => {
      let action;
      if (couresSelected !== 0) {
        action = subGradeActions.getSub(couresSelected, 1);
        try {
          await dispatch(action);
          navigation.navigate('type', {couresName: couresName});
        } catch (e) {
          Alert.alert('แจ้งเตือน', e.message);
        }
      } else {
        console.log(couresSelected);
      }
    };
    return (
      <View style={{flex: 1, justifyContent: 'flex-start'}}>
        <Text
          style={[
            styles.textMedium34,
            {textAlign: 'center', color: '#333333'},
          ]}>
          ประถมศึกษาปีที่ 1
        </Text>
        <View
          style={{
            margin: 5,
            flex: 2,
          }}>
          {/* 
          <ScrollView>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() => gradeHandler(1)}
                style={{
                  flex: 1,
                  borderRadius: 8,
                  margin: 5,
                }}>
                <ImageBackground
                  style={{flex: 1, justifyContent: 'center'}}
                  source={require('../assets/images/bg-coures.png')}
                  resizeMode="stretch">
                  <Text
                    style={[
                      styles.textBold22,
                      {
                        textAlign: 'center',
                        textAlignVertical: 'center',
                        color: '#fff',
                        fontWeight: '600',
                      },
                    ]}>yoyo</Text>
                </ImageBackground>
              </TouchableOpacity>
            </View>
          </ScrollView>
            */}

          <FlatGrid
            itemDimension={120}
            maxDimension={320}
            data={couresData}
            style={{marginTop: 5, flex: 1}}
            spacing={10}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => gradeHandler(item.csubId, item.csubName)}
                style={{
                  flex: 1,
                  borderRadius: 8,
                  margin: 5,
                }}>
                <ImageBackground
                  style={{flex: 1, justifyContent: 'center'}}
                  source={require('../assets/images/bg-coures.png')}
                  resizeMode="stretch">
                  <Text
                    style={[
                      styles.textBold22,
                      {
                        textAlign: 'center',
                        textAlignVertical: 'center',
                        color: '#fff',
                        fontWeight: '600',
                        borderRadius: 8,
                        padding: 10,
                        height: 120,
                      },
                    ]}>
                    {item.csubName}
                  </Text>
                </ImageBackground>
              </TouchableOpacity>
            )}
          />
        </View>
        <Text
          style={[
            styles.textBold18,
            {flex: 0.4, textAlign: 'center', color: '#333333'},
          ]}>
          กลับมาหน้าหลักนี้โดยการกดรูปบ้าน {'\n'}
          <HomeIcon width={26} height={26} /> ด้านบนขวาของแต่ละหน้า
        </Text>
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
          <View style={{flex: 1}}>
            <ContainerContent />
          </View>
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

export default homeScreen;
