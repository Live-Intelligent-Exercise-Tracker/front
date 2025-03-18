import React, { useEffect, useState } from 'react';
import {
  StyleSheet, Text, View, TextInput, TouchableOpacity,
  Keyboard, TouchableWithoutFeedback, Image, ActivityIndicator
} from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { LinearGradient } from 'expo-linear-gradient'
import { useDispatch, useSelector } from 'react-redux';
import { loginWithEmail, clearErrors } from '../../../redux/slices/userSlice';

export default function Login({ navigation }) {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { user } = useSelector((state) => state.user)
  const { loginError } = useSelector((state) => state.user)
  const { loading } = useSelector((state) => state.user)

  useEffect(() => {
    if (loginError) {
      dispatch(clearErrors())
    }
  })

  const handleLogin = async () => {
    if (!username || !password) {
      alert('아이디와 비밀번호를 입력하세요');
      return;
    }
    // dispatch(loginWithEmail({ username, password }))
    navigation.navigate("MainTabNavigator");
  };

  const handleFindId = () => {
    console.log('아이디 찾기 클릭됨');
  };

  const handleFindPassword = () => {
    console.log('비밀번호 찾기 클릭됨');
  };

  const handleSignUp = () => {
    navigation.navigate("Terms")
  };

  const handleKakaoLogin = () => {
    console.log('카카오 로그인');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <LinearGradient
        colors={['#0A0A0A', '#0A0A0A', '#111F45']} // 검은색 → 약한 남색 → 진한 파란색
        locations={[0, 0.75, 1]} // 30%까지 검은색, 이후 점점 파란색
        start={{ x: 0, y: 0 }} // 왼쪽 위에서 시작
        end={{ x: 0, y: 1 }} // 오른쪽 아래로 진행
        style={styles.container}
      >
        {loading && (
          <View style={{
            position: "absolute",
            zIndex: 10
          }}>
            <ActivityIndicator size="large" color="#B3B3B3" />
          </View>
        )}
        <View style={styles.textContainer}>
          <Text style={styles.text}>데이터로 설계하는{'\n'}실시간 지능형 운동 추적기</Text>
        </View>

        {/* <Image
          source={require('../../../assets/images/Login/spectrum.png')}
          style={styles.spectrum}
        /> */}

        <TextInput
          style={styles.input}
          placeholder="아이디를 입력하세요"
          placeholderTextColor="#D3D3D3"
          value={username}
          onChangeText={setUsername}
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          placeholder="비밀번호를 입력하세요"
          placeholderTextColor="#D3D3D3"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        {/* 아이디 찾기 | 비밀번호 찾기 */}
        <View style={styles.findContainer}>
          <View style={styles.account}>
            <TouchableOpacity onPress={handleFindId}>
              <Text style={styles.findText}>아이디 찾기</Text>
            </TouchableOpacity>
            <Text style={styles.findSeparator}> | </Text>
            <TouchableOpacity onPress={handleFindPassword}>
              <Text style={styles.findText}>비밀번호 찾기</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.signup}>
            <TouchableOpacity onPress={handleSignUp}>
              <Text style={styles.signUpText}>회원가입</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>회원 로그인</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: '#FDE500', flexDirection: 'row' }]} onPress={handleKakaoLogin}>
          <Image
            source={require('../../../assets/images/Login/kakao_icon.png')} // 이미지 경로 맞춰줘야 함
            style={styles.kakaoIcon}
          />
          <Text style={[styles.buttonText, { color: '#381F1F', left: moderateScale(-10) }]}>카카오톡 로그인</Text>
        </TouchableOpacity>
      </LinearGradient>
    </TouchableWithoutFeedback>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    padding: moderateScale(20)
  },
  // spectrum: {
  //   backgroundColor: 'black',
  //   marginBottom: '50'
  // },
  kakaoIcon: {
    width: moderateScale(24),  // 아이콘 크기 조절
    height: moderateScale(24),
    resizeMode: 'contain',  // 비율 유지
    left: moderateScale(-75),
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',  // 세로 정렬 맞추기
    width: '100%',
  },
  text: {
    color: '#FFFFFF',
    fontSize: moderateScale(26),
    marginBottom: moderateScale(20),
    fontWeight: 'semibold',
    flexDirection: 'row',
    flex: 1, // 왼쪽 영역 차지
  },
  input: {
    width: '100%',
    padding: moderateScale(10),
    marginBottom: moderateScale(15),
    backgroundColor: '#171717',
    color: 'white',
    borderRadius: 3,
    borderColor: 'white',
    borderWidth: 1,
    fontSize: moderateScale(16),
    height: moderateScale(50),
  },
  findContainer: {
    flexDirection: 'row',  // 가로 정렬
    justifyContent: 'space-between', // 양 끝 정렬
    alignItems: 'center',  // 세로 정렬 맞추기
    marginBottom: moderateScale(10),
    width: '100%',
  },
  account: {
    flexDirection: 'row',
    flex: 1, // 왼쪽 영역 차지
  },
  signup: {
    flexDirection: 'row',
    flex: 1, // 오른쪽 영역 차지
    justifyContent: 'flex-end', // 오른쪽 정렬
  },
  findText: {
    color: '#BFBFBF',
    fontSize: moderateScale(15),
  },
  findSeparator: {
    color: '#BFBFBF',
    fontSize: moderateScale(15),
    marginHorizontal: moderateScale(5),
  },
  button: {
    marginTop: moderateScale(20),
    width: '100%',
    height: moderateScale(50),
    justifyContent: 'center',
    backgroundColor: '#507DFA',
    alignItems: 'center',
    borderRadius: 3,
  },
  buttonText: {
    color: 'white',
    fontSize: moderateScale(16),
  },
  signUpText: {
    color: '#BFBFBF',
    fontSize: moderateScale(15),
  },
});