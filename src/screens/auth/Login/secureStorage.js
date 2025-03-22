// import SecureStore from "react-native-secure-store";
import * as SecureStore from "expo-secure-store";

let TOKEN_KEY = "accessToken";

// ✅ JWT 저장
export const saveToken = async (token) => {
  try {
    await SecureStore.setItemAsync(TOKEN_KEY, token);
    console.log("토큰 저장 성공공")
  } catch (error) {
    console.error("토큰 저장 실패:", error.error);
  }
};

// ✅ JWT 가져오기
export const getToken = async () => {
  try {
    return await SecureStore.getItemAsync(TOKEN_KEY);
  } catch (error) {
    console.error("토큰 가져오기 실패:", error);
    return null;
  }
};

// ✅ JWT 삭제 (로그아웃)
export const removeToken = async () => {
  try {
    await SecureStore.remove(TOKEN_KEY);
  } catch (error) {
    console.error("토큰 삭제 실패:", error);
  }
};
