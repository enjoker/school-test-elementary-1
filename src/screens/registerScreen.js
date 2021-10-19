import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import styles from '../styles/style';
import {
  Image,
  Icon,
  Avatar,
  normalize,
  Card,
  Input,
} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as userActions from '../store/actions/user';
import { useDispatch, useSelector } from 'react-redux';

// import รูปบ้าน
import HomeIcon from '../assets/images/icons/HomeIcon.svg';

const registerScreen = ({ navigation }) => {
  const { width } = Dimensions.get('window');

  const ContainerContent = () => {
    const [name, setname] = useState();
    const dispatch = useDispatch();
    useEffect(() => { }, [name]);
    const register = async () => {
      try {
        dispatch(userActions.addUser(name));
      } catch (error) {
        console.log(error);
      }
    };
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image
          source={require('../assets/images/SchooltestLogo.png')}
          style={{ width: 120, height: 80 }}
        />
        <Text
          style={[styles.textMedium30, { textAlign: 'center', marginTop: 10 }]}>
          School test Lite
        </Text>
        <Text
          style={[styles.textMedium16, { textAlign: 'center', marginTop: 20 }]}>
          ใส่ชื่อผู้ใช้งาน
        </Text>
        <View style={{ width: wp('65%'), height: hp('10%') }}>
          <Input
            inputStyle={[
              styles.textLight16,
              {
                borderWidth: 1,
                borderRadius: 8,
                paddingHorizontal: 10,
                textAlignVertical: 'center',
                textAlign: 'center',
                marginTop: 10,
              },
            ]}
            inputContainerStyle={{ borderBottomWidth: 0 }}
            placeholder="ชื่อผู้ใช้งาน"
            onChangeText={value => setname(value)}
          />
        </View>
        <Text
          style={[
            styles.textLight18,
            {
              textAlign: 'center',
              textAlignVertical: 'center',
              padding: 10,
              marginTop: 10,
              borderRadius: 20,
              backgroundColor: '#FF4EB8',
              color: '#fff',
              width: 100,
            },
          ]}
          onPress={register}>
          ตกลง
        </Text>
      </View>
    );
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          padding: 15,
          paddingBottom: 0,
          marginBottom: 10,
          flex: 1,
        }}>
        <View style={{ flex: 1 }}>
          <ContainerContent />
        </View>
      </View>
      <View style={{ backgroundColor: '#EEEEEE', height: 50, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Ads Area</Text>
      </View>
    </SafeAreaView>
  );
};

export default registerScreen;