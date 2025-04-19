import * as SecureStore from "expo-secure-store";
import * as Keychain from "react-native-keychain";
// import EncryptedStorage from 'react-native-encrypted-storage';
import { Platform } from "react-native";

export const saveToken = async (key, value) => { // 토큰 저장
  // if (Platform.OS === "ios") {
  try {
    await SecureStore.setItemAsync(key, value, {
      keychainAccessible: SecureStore.WHEN_UNLOCKED,
      requireAuthentication: true,
    });
    console.log("✅ 토큰 저장 성공");
  } catch (error) {
    console.error('Error saving the token', error);
  }
  // } else {
  //   // try {
  //   //   await EncryptedStorage.setItem(key, value, {
  //   //     accessible: EncryptedStorage.ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY, // Keystore에 저장
  //   //   });
  //   //   console.log('✅ 토큰 저장 성공');
  //   // } catch (error) {
  //   //   console.error('❌ 토큰 저장 실패', error);
  //   // }
  //   try {
  //     await Keychain.setGenericPassword(key, value, {
  //       accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY, 
  //       storage: Keychain.STORAGE_TYPE.AES, // AES 암호화 저장
  //     });
  //   } catch (error) {
  //     console.error('Error saving the token', error);
  //   }
  // }
};

export const getToken = async (key) => { // 토큰 가져오기
  // if (Platform.OS === "ios") {
  try {
    const token = await SecureStore.getItemAsync(key);
    return token;
  } catch (error) {
    console.error('Error getting the token', error);
    return null;
  }
  // } else {
  //   // try {
  //   //   const token = await EncryptedStorage.getItem(key);
  //   //   if (token) {
  //   //     console.log('🔐 저장된 토큰:', token);
  //   //     return token;
  //   //   } else {
  //   //     console.log('❌ 토큰이 없습니다.');
  //   //     return null;
  //   //   }
  //   // } catch (error) {
  //   //   console.error('❌ 토큰 가져오기 실패', error);
  //   //   return null;
  //   // }
  //   try {
  //     const credentials = await Keychain.getGenericPassword();
  //     return credentials ? credentials.password : null;
  //   } catch (error) {
  //     console.error('Error getting the token', error);
  //     return null;
  //   }
  // }
};

export const deleteToken = async (key) => { // 토큰 삭제하기
  // if (Platform.OS === "ios") {
  await SecureStore.deleteItemAsync(key);
  // } else {
  //   // try {
  //   //   await EncryptedStorage.removeItem(key);
  //   //   console.log('🗑 토큰 삭제 완료');
  //   // } catch (error) {
  //   //   console.error('❌ 토큰 삭제 실패', error);
  //   // }
  //   await Keychain.resetGenericPassword();
  // }
};

// 사용 예제
const testStorage = async () => {
  const jwtToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."; // 실제 JWT 토큰

  await saveToken("userToken", jwtToken); // 저장

  const token = await getToken("userToken"); // 불러오기
  console.log(token);

  await deleteToken("userToken"); // 삭제
};


