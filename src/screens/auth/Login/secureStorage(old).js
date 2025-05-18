// import * as SecureStore from "expo-secure-store";
// import * as Keychain from "react-native-keychain";
// import { Platform } from "react-native";

// export const saveToken = async (key, value) => { // 토큰 저장
//   try {
//     await SecureStore.setItemAsync(key, value, {
//       keychainAccessible: SecureStore.WHEN_UNLOCKED,
//       requireAuthentication: true,
//     });
//     console.log("✅ 토큰 저장 성공");
//   } catch (error) {
//     console.error('Error saving the token', error);
//   }
  
// };

// export const getToken = async (key) => { // 토큰 가져오기
//   try {
//     const token = await SecureStore.getItemAsync(key);
//     return token;
//   } catch (error) {
//     console.error('Error getting the token', error);
//     return null;
//   }
  
// };

// export const deleteToken = async (key) => { // 토큰 삭제하기
//   await SecureStore.deleteItemAsync(key);
  
// };

// // 사용 예제
// const testStorage = async () => {
//   const jwtToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."; // 실제 JWT 토큰

//   await saveToken("userToken", jwtToken); // 저장

//   const token = await getToken("userToken"); // 불러오기
//   console.log(token);

//   await deleteToken("userToken"); // 삭제
// };


