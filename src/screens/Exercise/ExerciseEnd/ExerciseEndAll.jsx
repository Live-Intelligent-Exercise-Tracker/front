import React, { useEffect, useRef, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Animated,
    ScrollView,
    Modal,
    Pressable,
} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { LinearGradient } from 'expo-linear-gradient';
import ExerciseChart from '../component/ExerciseChart';
import FeedbackContainer from '../../../common/component/FeedbackContainer';
import { FEEDBACK_THEME } from '../../../common/component/feedbackTheme';

export default function ExerciseEndAll({ navigation, route }) {
    // const { button } = route.params;
    const titleOpacity = useRef(new Animated.Value(0)).current;
    const titleDimOpacity = useRef(new Animated.Value(1)).current;
    const titleTranslateY = useRef(new Animated.Value(0)).current;
    const subtitleOpacity = useRef(new Animated.Value(0)).current;
    const subtitleTranslateY = useRef(new Animated.Value(150)).current;
    const buttonOpacity = useRef(new Animated.Value(0)).current;

    const mainOpacity = useRef(new Animated.Value(1)).current;
    const nextOpacity = useRef(new Animated.Value(0)).current;
    const [showNext, setShowNext] = useState(false);

    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            Animated.timing(titleOpacity, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }).start(() => {
                setTimeout(() => {
                    Animated.parallel([
                        Animated.timing(titleDimOpacity, {
                            toValue: 0.2,
                            duration: 600,
                            useNativeDriver: true,
                        }),
                        Animated.timing(titleTranslateY, {
                            toValue: -35,
                            duration: 600,
                            useNativeDriver: true,
                        }),
                        Animated.timing(subtitleOpacity, {
                            toValue: 1,
                            duration: 600,
                            useNativeDriver: true,
                        }),
                        Animated.timing(subtitleTranslateY, {
                            toValue: 20,
                            duration: 600,
                            useNativeDriver: true,
                        }),
                        Animated.timing(buttonOpacity, {
                            toValue: 1,
                            duration: 600,
                            useNativeDriver: true,
                        }),
                    ]).start();
                }, 1000);
            });
        }, 500);
    }, []);

    const handleMove = () => {
        Animated.timing(mainOpacity, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
        }).start(() => {
            setShowNext(true);
            Animated.timing(nextOpacity, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
            }).start();
        });
    };

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
            {!showNext && (
                <Animated.View style={{ opacity: mainOpacity, flex: 1, width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ height: moderateScale(310) }} />
                    <View style={{ alignItems: 'center', marginBottom: moderateScale(290) }}>
                        <Animated.View
                            style={{
                                opacity: Animated.multiply(titleOpacity, titleDimOpacity),
                                transform: [{ translateY: titleTranslateY }],
                                position: 'absolute',
                                alignItems: 'center',
                                width: '100%',
                                zIndex: 2,
                            }}
                        >
                            <Text style={[styles.text, { marginLeft: moderateScale(4) }]}>
                                {/* {button} */}
                                러닝 완료 👏</Text>
                        </Animated.View>
                        <Animated.View
                            style={{
                                opacity: subtitleOpacity,
                                transform: [{ translateY: subtitleTranslateY }],
                            }}
                        >
                            <Text style={[styles.text, { textAlign: 'center' }]}>
                                오늘의 기록을{'\n'}확인 해볼까요?
                            </Text>
                        </Animated.View>
                    </View>
                    <Animated.View style={{ opacity: buttonOpacity }}>
                        <TouchableOpacity style={styles.button} onPress={handleMove}>
                            <Text style={styles.buttonText}>운동 기록 확인하기</Text>
                        </TouchableOpacity>
                    </Animated.View>
                </Animated.View>
            )}

            {showNext && (
                <Animated.View style={{ opacity: nextOpacity, flex: 1 }}>
                    <ScrollView
                        contentContainerStyle={styles.scrollContent}
                        showsVerticalScrollIndicator={false}
                    >
                        <ExerciseChart />
                        <FeedbackContainer
                            theme={FEEDBACK_THEME.green}
                            score="90점"
                            mainText="오늘의 운동 피드백"
                            subText="이용 방법이 직관적이라 누구나 쉽게 사용할 수 있어요."
                        />
                        <View
                            style={{
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
                        </View>
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
                </Animated.View>
            )}
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text: {
        fontWeight: 'bold',
        fontSize: moderateScale(33),
        color: '#ffffff',
    },
    button: {
        width: moderateScale(342),
        height: moderateScale(52),
        backgroundColor: '#507dfa',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: moderateScale(16),
        color: '#ffffff',
    },
    scrollContent: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: moderateScale(15),
        paddingBottom: moderateScale(50),
        paddingTop: moderateScale(100),
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalBox: {
        width: moderateScale(302),
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