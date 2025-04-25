import React, { useEffect, useState } from 'react'
import { NativeEventEmitter, NativeModules } from 'react-native'

const {HRVEmitter } = NativeModules;
const hrvEventEmitter = new NativeEventEmitter(HRVEmitter);

const jsUseHRVListener = () => {
    const [hrv, setHRV] = useState(null);

    useEffect(()=>{
        const subscription = hrvEventEmitter.addListener('HRVUpdate', (event)=>{
            console.log('HRV 실시간 값: ', event.value);
            setHRV(event.value);
        });

        //정리(cleanup): 화면 나가면 메모리 누수 방지
        return ()=>{
            subscription.remove();
        }
    }, []);

    return hrv;
}

export default jsUseHRVListener;
