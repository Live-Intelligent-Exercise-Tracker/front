import React, { useState } from 'react';
import { View, Text, Button, NativeModules, StyleSheet } from 'react-native';

const { HRVBridge } = NativeModules;

const Workout = () => {
  const [hrv, setHRV] = useState(null);
  const [error, setError] = useState(null);

  const fetchMockHRV = async () => {
    try {
      const value = await HRVBridge.getMockHRV(); // Promise 기반 호출
      console.log('받은 HRV 값:', value);
      setHRV(value);
      setError(null);
    } catch (err) {
      console.error('HRV 가져오기 실패:', err);
      setError('HRV 값을 가져오지 못했습니다.');
    }
  };

  return (
    <View style={styles.container}>
      <Button title="HRV 값 요청" onPress={fetchMockHRV} />
      {hrv !== null && <Text style={styles.hrvText}>HRV 값: {hrv}</Text>}
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hrvText: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: 'bold',
  },
  errorText: {
    marginTop: 10,
    fontSize: 16,
    color: 'red',
  },
});

export default Workout;
