import { useState, useEffect } from 'react';
import { moderateScale } from 'react-native-size-matters';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { weekStatus, attendanceCheck, pointTotal } from '../../../redux/slices/pointSlice';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';

export default function Attendance() {
    const days = ['월', '화', '수', '목', '금', '토', '일'];
    const [checkedDays, setCheckedDays] = useState(Array(7).fill(false));
    const dispatch = useDispatch();
    const { total } = useSelector((state) => state.point);

    useEffect(() => {
        const fetchWeekStatus = async () => {
            try {
                const resultAction = await dispatch(weekStatus());
                const data = unwrapResult(resultAction);
                if (data?.status && Array.isArray(data.status)) {
                    setCheckedDays(data.status);
                }
                await dispatch(pointTotal());
            } catch (error) {
                console.error('출석 상태 불러오기 실패:', error.message);
            }
        };

        fetchWeekStatus();
    }, []);

    const toggleDay = async (index) => {
        try {
            await dispatch(attendanceCheck());
            const updated = [...checkedDays];
            updated[index] = !updated[index];
            setCheckedDays(updated);

            await dispatch(pointTotal());
        } catch (error) {
            console.error("출석 체크 중 에러:", error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={{ fontWeight: 'bold', color: '#ffffff', fontSize: moderateScale(13) }}>출석체크</Text>
            <Text style={{ fontWeight: 'regular', color: '#ffffff', fontSize: moderateScale(12), alignSelf: 'flex-end' }}>{total?.total}p</Text>
            <View style={styles.daysContainer}>
                {days.map((day, index) => (
                    <View key={index} style={styles.dayItem}>
                        <Text style={styles.dayText}>{day}</Text>
                        <TouchableOpacity
                            style={[styles.circle, checkedDays[index] && styles.checkedCircle]}
                            onPress={() => toggleDay(index)}
                        >
                            {checkedDays[index] && <Text style={styles.checkMark}>✓</Text>}
                        </TouchableOpacity>
                    </View>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: moderateScale(361),
        height: moderateScale(130),
        borderRadius: 6,
        backgroundColor: '#2C2C2C',
        padding: moderateScale(10),
        alignItems: 'center',
    },
    daysContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: moderateScale(10),
    },
    dayItem: {
        alignItems: 'center',
        marginTop: moderateScale(10),
    },
    dayText: {
        color: '#ffffff',
        fontWeight: 'light',
        fontSize: moderateScale(10),
        marginBottom: moderateScale(5),
    },
    circle: {
        width: moderateScale(37),
        height: moderateScale(37),
        borderRadius: moderateScale(18.5),
        borderWidth: 1,
        borderColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    checkedCircle: {
        backgroundColor: '#507dfa',
        borderColor: '#507dfa',
    },
    checkMark: {
        color: '#ffffff',
        fontSize: moderateScale(16),
        fontWeight: 'bold',
    },
});