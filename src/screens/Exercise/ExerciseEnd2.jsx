import React, { useEffect, useRef, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Animated,
    ScrollView,
    Image,
    TouchableOpacity,
    Modal,
    Pressable,
} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { LinearGradient } from 'expo-linear-gradient';
import ExerciseChart from './component/ExerciseChart';

const character = {
    green: require('../../assets/images/Exercise/초록이 캐릭터.png'),
    blue: require('../../assets/images/Exercise/파랑이 캐릭터.png'),
    yellow: require('../../assets/images/Exercise/노랑이 캐릭터.png'),
    red: require('../../assets/images/Exercise/빨강이 캐릭터.png'),
}

const FEEDBACK_THEME = {
    blue: {
        gradient: {
            colors: ['#70B8FF', '#3B5BD1', '#70B8FF', '#3B5BD1'],
            locations: [0, 0.4, 0.7, 1],
        },
        textColor: '#ffffff',
        character: character.blue,
    },
    green: {
        gradient: {
            colors: ['#D4FF70', '#3BD165', '#D4FF70', '#3BD165'],
            locations: [0, 0.4, 0.7, 1],
        },
        textColor: '#000000',
        character: character.green,
    },
    yellow: {
        gradient: {
            colors: ['#FFDB70', '#EAA462', '#FFDB70', '#EAA462'],
            locations: [0, 0.4, 0.7, 1],
        },
        textColor: '#ffffff',
        character: character.yellow,
    },
    red: {
        gradient: {
            colors: ['#FF7E70', '#EAA462', '#FF7E70', '#EAA462'],
            locations: [0, 0.4, 0.7, 1],
        },
        textColor: '#ffffff',
        character: character.red,
    },
};

export default function ExerciseEnd2({ navigation }) {
    const colorType = 'red'; 

    const theme = FEEDBACK_THEME[colorType];

    const slideAnim = useRef(new Animated.Value(100)).current;
    const slideOpacity = useRef(new Animated.Value(0)).current;
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        Animated.parallel([
            Animated.timing(slideOpacity, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            })
        ]).start();
    }, []);

    const MoveHome = () => {
        setModalVisible(true);
    }

    const handleGoHome = () => {
        setModalVisible(false);
        navigation.reset({
            index: 0,
            routes: [{ name: 'MainTabNavigator' }],
        });
    };

    return (
        <LinearGradient
            colors={['#111111', '#161616', '#192C62']}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={styles.container}
        >
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <ExerciseChart />
                <Animated.View style={[styles.feedback, { opacity: slideOpacity, transform: [{ translateY: slideAnim }] }]}>
                    <LinearGradient
                        colors={theme.gradient.colors}
                        locations={theme.gradient.locations}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={[
                            StyleSheet.absoluteFill,
                            { borderRadius: moderateScale(15) }
                        ]}
                    />
                    <Text style={{
                        fontSize: moderateScale(27),
                        fontWeight: '600',
                        color: theme.textColor,
                        marginBottom: moderateScale(45)
                    }}>오늘의 운동 피드백</Text>
                    <Image source={theme.character} />
                    <Text style={{
                        fontSize: moderateScale(28),
                        fontWeight: '700',
                        color: theme.textColor,
                        marginBottom: moderateScale(45)
                    }}>70점</Text>
                    <Text style={{
                        fontSize: moderateScale(15),
                        fontWeight: '500',
                        color: theme.textColor
                    }}>
                        이용 방법이 직관적이라 누구나 쉽게 사용할 수 있어요.
                    </Text>
                </Animated.View>
                <Animated.View
                    style={{
                        opacity: slideOpacity,
                        transform: [{ translateY: slideAnim }],
                        width: moderateScale(360),
                        height: moderateScale(52),
                        borderRadius: 10,
                        backgroundColor: '#507dfa',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: moderateScale(20),
                    }}
                >
                    <TouchableOpacity
                        style={{
                            width: '100%',
                            height: '100%',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 10,
                        }}
                        onPress={MoveHome}
                    >
                        <Text style={{ fontWeight: 'bold', fontSize: moderateScale(16), color: '#ffffff' }}>
                            홈으로 돌아가기
                        </Text>
                    </TouchableOpacity>
                </Animated.View>
            </ScrollView>

            <Modal
                visible={modalVisible}
                transparent
                animationType="fade"
                onRequestClose={() => setModalVisible(false)}
            >
                <Pressable style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
                    <Pressable style={styles.modalBox}>
                        <Text style={styles.modalTitle}>홈으로 돌아가시겠습니까?</Text>
                        <Text style={styles.modalDesc}>
                            홈 화면으로 돌아가도 운동 기록은 안전하게 저장됩니다.
                        </Text>
                        <View style={styles.modalButtonRow}>
                            <TouchableOpacity
                                style={[styles.modalBtn, { backgroundColor: '#f1f1f1' }]}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={{ color: '#000000', fontWeight: 'bold', fontSize: moderateScale(13) }}>아니오</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.modalBtn, { backgroundColor: '#507dfa' }]}
                                onPress={handleGoHome}
                            >
                                <Text style={{ color: '#ffffff', fontWeight: 'bold', fontSize: moderateScale(13) }}>홈으로</Text>
                            </TouchableOpacity>
                        </View>
                    </Pressable>
                </Pressable>
            </Modal>

        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: moderateScale(15),
        paddingBottom: moderateScale(50),
        paddingTop: moderateScale(100),
    },
    feedback: {
        width: moderateScale(302),
        height: moderateScale(401),
        borderRadius: 15,
        backgroundColor: 'rgba(244, 244, 244, 0.15)',
        alignItems: 'center',
        justifyContent: 'center',
        padding: moderateScale(30),
        marginBottom: moderateScale(37),
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalBox: {
        width: moderateScale(340),
        height: moderateScale(170),
        backgroundColor: '#ffffff',
        borderRadius: 10,
        paddingVertical: moderateScale(30),
        paddingHorizontal: moderateScale(24),
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: moderateScale(18),
        fontWeight: 'bold',
        color: '#000000',
        marginBottom: moderateScale(10),
        textAlign: 'center',
    },
    modalDesc: {
        fontSize: moderateScale(10),
        color: '#505050',
        textAlign: 'center',
        fontWeight: '600',
        marginBottom: moderateScale(24),
    },
    modalButtonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        gap: moderateScale(10),
    },
    modalBtn: {
        flex: 1,
        height: moderateScale(52),
        width: moderateScale(140),
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
}); 