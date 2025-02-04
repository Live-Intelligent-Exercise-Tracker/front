import React, { useState } from 'react';
import {
  StyleSheet, Text, View, TextInput, TouchableOpacity,
  Keyboard, TouchableWithoutFeedback, Image
} from 'react-native';
import api from '../../api';

//flask run <- 서버 여는 코드

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    // 로그인 처리 로직을 여기에 작성
    if (!email || !password) {
      alert('아이디와 비밀번호를 입력하세요');
      return;
    }

    try {
      const response = await api.post("/auth/login", {
        email: email,
        password: password
      });
      console.log(response)
      const { user_id, token, message } = response.data;

      if (!response.data || !user_id || !token) {
        setMessage("로그인에 실패했습니다.");
        return;
      }


      // 로그인 성공 시 처리 (예: 토큰 저장, 화면 전환)
      setMessage(message || "로그인 성공!");
      localStorage.setItem("user_id", user_id);
      localStorage.setItem("token", token);
      console.log('로그인 성공:', response.data);

    } catch (error) {
      console.error('로그인 실패:', error.response?.data || error.message);
      alert('로그인에 실패했습니다.');
    }
    console.log('Email:', email);
    console.log('Password:', password);
  };

  const handleFindId = () => {
    console.log('아이디 찾기 클릭됨');
  };

  const handleFindPassword = () => {
    console.log('비밀번호 찾기 클릭됨');
  };

  const handleSignUp = () => {
    console.log('회원가입 클릭됨');
  };

  const handleKakaoLogin = () => {
    console.log('카카오 로그인');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>

        <View style={styles.textContainer}>
          <Text style={styles.text}>실시간 지능형{'\n'}운동 추적기</Text>
        </View>
        <Text style={styles.text1}>아이디</Text>
        <TextInput
          style={styles.input}
          placeholder="아이디를 입력하세요"
          placeholderTextColor="#D3D3D3"
          value={email}
          onChangeText={(text) => {
            const filteredText = text.replace(/[^a-zA-Z0-9@._-]/g, ""); // 영어, 숫자, 일부 특수문자만 허용
            setEmail(filteredText);
          }}
          keyboardType="email-address"
        />
        <Text style={styles.text1}>비밀번호</Text>
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
            <TouchableOpacity onPress={handleFindId} activeOpacity={1}>
              <Text style={styles.findText}>아이디 찾기</Text>
            </TouchableOpacity>
            <Text style={styles.findSeparator}> | </Text>
            <TouchableOpacity onPress={handleFindPassword} activeOpacity={1}>
              <Text style={styles.findText}>비밀번호 찾기</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.signup}>
            <TouchableOpacity onPress={handleSignUp} activeOpacity={1}>
              <Text style={styles.signUpText}>회원가입</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>회원 로그인</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: '#FDE500', flexDirection: 'row', alignItems: 'center' }]} onPress={handleKakaoLogin}>
          <Image
            source={require('../../assets/kakao_icon.png')} // 이미지 경로 맞춰줘야 함
            style={styles.kakaoIcon}
          />
          <Text style={[styles.buttonText, { color: '#381F1F', marginLeft: 65 }]}>카카오톡 로그인</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#161616',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40'
  },
  kakaoIcon: {
    width: 24,  // 아이콘 크기 조절
    height: 24,
    resizeMode: 'contain',  // 비율 유지
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',  // 세로 정렬 맞추기
    width: '100%',
  },
  text: {
    color: '#53E6DE',
    fontSize: 26,
    marginBottom: 20,
    fontWeight: 'bold',
    flexDirection: 'row',
    flex: 1, // 왼쪽 영역 차지
  },
  text1: {
    marginTop: 10,
    marginBottom: 5,
    color: 'white',
    fontSize: '16',
    alignSelf: 'flex-start',  // Text를 왼쪽으로 정렬
    width: '100%',  // 전체 너비로 맞추기
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 5,
    backgroundColor: '#161616',
    color: 'white',
    borderRadius: 3,
    borderColor: '#929292',
    borderWidth: 1,
    fontSize: 16,
  },
  findContainer: {
    flexDirection: 'row',  // 가로 정렬
    justifyContent: 'space-between', // 양 끝 정렬
    alignItems: 'center',  // 세로 정렬 맞추기
    marginTop: 10,
    marginBottom: 10,
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
    fontSize: 15,
  },
  findSeparator: {
    color: '#BFBFBF',
    fontSize: 15,
    marginHorizontal: 5,
  },
  button: {
    marginTop: 20,
    width: '100%',
    height: 46,
    padding: 14,
    backgroundColor: '#53E6DE',
    alignItems: 'center',
    borderRadius: 3,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  signUpText: {
    color: '#BFBFBF',
    fontSize: 15,
  },
});