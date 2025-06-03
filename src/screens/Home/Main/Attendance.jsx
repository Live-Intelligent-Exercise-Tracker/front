import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { moderateScale } from 'react-native-size-matters';
import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { monthStatus, pointTotal, attendanceCheck } from '../../../redux/slices/pointSlice';

export default function Attendance() {
    const today = new Date();
    const dispatch = useDispatch();
    const [currentDate, setCurrentDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
    const [selectedDates, setSelectedDates] = useState([]);

    const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

    // useEffect(() => {
    //     const fetchMonthStatus = async () => {
    //         try {
    //             const year = currentDate.getFullYear();
    //             const month = currentDate.getMonth() + 1;
    //             const resultAction = await dispatch(monthStatus({ year, month }));
    //             const data = unwrapResult(resultAction);

    //             const { checked_days } = data;
    //             const formattedDates = checked_days.map(day => `${year}-${month - 1}-${day}`);
    //             setSelectedDates(formattedDates);
    //         } catch (error) {
    //             console.error('출석 상태 불러오기 실패:', error.message);
    //         }
    //     };
    //     fetchMonthStatus();
    // }, [currentDate]);

    const getCalendarDates = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const lastDateOfMonth = new Date(year, month + 1, 0).getDate();
        const prevMonthLastDate = new Date(year, month, 0).getDate();

        const dates = [];

        for (let i = firstDayOfMonth - 1; i >= 0; i--) {
            const day = prevMonthLastDate - i;
            dates.push({ day, isCurrentMonth: false });
        }

        for (let i = 1; i <= lastDateOfMonth; i++) {
            dates.push({ day: i, isCurrentMonth: true });
        }

        while (dates.length < 35) {
            const day = dates.length - (firstDayOfMonth + lastDateOfMonth) + 1;
            dates.push({ day, isCurrentMonth: false });
        }

        return dates;
    };

    const handlePrevMonth = () => {
        setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
    };

    const handleCheckAttendance = async () => {
        try {
            await dispatch(attendanceCheck());

            const year = currentDate.getFullYear();
            const month = currentDate.getMonth() + 1;

            const resultAction = await dispatch(monthStatus({ year, month }));
            const data = unwrapResult(resultAction);

            const { checked_days } = data;
            const formattedDates = checked_days.map(day => `${year}-${month - 1}-${day}`);
            setSelectedDates(formattedDates);

            await dispatch(pointTotal());
        } catch (error) {
            console.error('출석체크 실패:', error.message);
        }
    };

    const dates = getCalendarDates(currentDate);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerInner}>
                    <TouchableOpacity onPress={handlePrevMonth}>
                        <Ionicons name="chevron-back" size={24} color="#fff1f1" />
                    </TouchableOpacity>
                    <Text style={styles.monthText}>
                        {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월
                    </Text>
                    <TouchableOpacity onPress={handleNextMonth}>
                        <Ionicons name="chevron-forward" size={24} color="#fff1f1" />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.weekRow}>
                {daysOfWeek.map((day, idx) => (
                    <Text key={idx} style={styles.dayText}>{day}</Text>
                ))}
            </View>

            <View style={styles.dateGrid}>
                {dates.map((item, idx) => {
                    const key = `${currentDate.getFullYear()}-${currentDate.getMonth()}-${item.day}`;
                    const isSelected = selectedDates.includes(key);

                    const isToday =
                        item.day === today.getDate() &&
                        currentDate.getMonth() === today.getMonth() &&
                        currentDate.getFullYear() === today.getFullYear() &&
                        item.isCurrentMonth;

                    const isBeforeToday =
                        item.isCurrentMonth &&
                        currentDate.getFullYear() === today.getFullYear() &&
                        currentDate.getMonth() === today.getMonth() &&
                        item.day <= today.getDate();

                    const backgroundColor = isBeforeToday
                        ? item.day % 2 === 0
                            ? '#97D1E3'
                            : '#6DB5CC'
                        : !item.isCurrentMonth
                            ? '#a8a8a829'
                            : '#ffffff73';

                    return (
                        <TouchableOpacity
                            key={idx}
                            style={styles.dateCell}
                            activeOpacity={1}
                        >
                            <View style={styles.dateWrapper}>
                                <View style={[styles.circle, { backgroundColor }]}>
                                    <Text style={[styles.dateText, !item.isCurrentMonth && { color: '#8d8d8d' }]}>
                                        {item.day}
                                    </Text>
                                    {isSelected && item.isCurrentMonth && <Text style={styles.checkMark}>CHECK</Text>}
                                </View>
                                {isSelected && item.isCurrentMonth && <Text style={styles.pointText}>+50</Text>}
                                {isToday && !isSelected && <Text style={styles.todayLabel}>today</Text>}
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </View>

            <TouchableOpacity style={styles.checkButton} onPress={handleCheckAttendance}>
                <Text style={styles.checkButtonText}>출석체크</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: moderateScale(336),
        height: moderateScale(500),
        borderRadius: 6,
        backgroundColor: '#ffffff1c',
        padding: moderateScale(10),
        alignItems: 'center',
        marginTop: moderateScale(30),
    },
    header: {
        width: '100%',
        alignItems: 'center',
        marginBottom: moderateScale(10),
    },
    headerInner: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    monthText: {
        fontSize: moderateScale(13),
        fontWeight: 'bold',
        color: '#ffffff',
        marginHorizontal: moderateScale(6),
    },
    weekRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: moderateScale(5),
    },
    dayText: {
        width: `${100 / 7}%`,
        textAlign: 'center',
        fontWeight: 'light',
        fontSize: moderateScale(10),
        color: '#ffffff',
    },
    dateGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
    },
    dateCell: {
        width: `${100 / 7}%`,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dateWrapper: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        position: 'relative',
        height: moderateScale(60),
    },
    circle: {
        width: moderateScale(37),
        height: moderateScale(37),
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    },
    dateText: {
        fontSize: moderateScale(10),
        color: '#ffffff',
    },
    checkMark: {
        position: 'absolute',
        fontSize: moderateScale(8),
        fontWeight: 'bold',
        color: '#9D4F8D',
        transform: [{ rotate: '-15.82deg' }],
        zIndex: 2,
        textAlign: 'center',
    },
    pointText: {
        marginTop: moderateScale(2),
        fontSize: moderateScale(8),
        color: '#E9E8ED',
    },
    todayLabel: {
        marginTop: moderateScale(2),
        fontSize: moderateScale(8),
        color: '#E9E8ED',
    },
    checkButton: {
        width: moderateScale(176),
        height: moderateScale(35),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#507DFA',
        borderRadius: 10,
    },
    checkButtonText: {
        color: '#fff',
        fontSize: moderateScale(12),
        fontWeight: 'regular',
    },
});
