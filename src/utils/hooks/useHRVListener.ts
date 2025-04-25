import { useState, useEffect } from 'react';
import { NativeEventEmitter, NativeModules } from 'react-native';

// HRV 이벤트 타입 정의
type HRVEvent = {
  value: number;
};

const { HRVEmitter } = NativeModules;
const hrvEventEmitter = new NativeEventEmitter(HRVEmitter);

const useHRVListener = (): number | null => {
  const [hrv, setHRV] = useState<number | null>(null);

  useEffect(() => {
    const subscription = hrvEventEmitter.addListener('HRVUpdate', (event: HRVEvent) => {
      console.log('HRV 실시간 값:', event.value);
      setHRV(event.value);
    });

    // cleanup: 화면 나가면 메모리 누수 방지
    return () => {
      subscription.remove();
    };
  }, []);

  return hrv;
};

export default useHRVListener;
