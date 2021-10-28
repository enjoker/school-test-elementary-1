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
  const [newcouresData, setnewcouresData] = useState([]);
  console.log(newcouresData.length);

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
  useEffect(() => {
    let test = [];
    let dontUse = [];
    let dataLength = couresData.length;
    for (let k = 0; k < dataLength; k++) {      
      let value = couresData.splice(0, 1);
      if (value != '') {
        if (
          value[0].csubName == 'test' ||
          value[0].csubName == 'test1' ||
          value[0].csubName == 'test2' ||
          value[0].csubName == 'test3' ||
          value[0].csubName == 'Test' ||
          value[0].csubName == 'Test1' ||
          value[0].csubName == 'Test2' ||
          value[0].csubName == 'Test3'
        ) {
          dontUse.push(value[0]);
        } else {
          test.push(value[0]);
        }
      }
    }for (let k = 0; k < test.length; k++) {
      console.log('for test');
      couresData.push(test[k]);
    }
    for (let k = 0; k < dontUse.length; k++) {
      console.log('for dontUse');
      couresData.push(dontUse[k]);
    }
    console.log(dataLength + test);
    setnewcouresData(test);
  }, [couresData]);

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
          <ScrollView>
            <View style={{flex: 1}}>
              {newcouresData.map(item => {
                return (
                  <TouchableOpacity
                    key={item.csubId}
                    onPress={() => gradeHandler(item.csubId, item.csubName)}
                    style={{
                      flex: 1,
                      borderRadius: 8,
                      margin: 5,
                      height: 70,
                    }}>
                    <ImageBackground
                      style={{flex: 1.5, justifyContent: 'center'}}
                      source={require('../assets/images/bg-Artboard.png')}
                      resizeMode="stretch">
                      <Text
                        style={[
                          styles.textBold18,
                          {
                            textAlign: 'center',
                            textAlignVertical: 'center',
                            color: '#fff',
                            fontWeight: '600',
                          },
                        ]}>
                        {item.csubName}
                      </Text>
                    </ImageBackground>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>

          {/*
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
          */}
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
