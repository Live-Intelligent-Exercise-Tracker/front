import React, { useRef, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Animated,
    ScrollView,
    TouchableOpacity,
    Modal,
    Pressable,
} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { LinearGradient } from 'expo-linear-gradient';
import FeedbackContainer from '../../common/component/FeedbackContainer';
import { FEEDBACK_THEME } from '../../common/component/feedbackTheme';
import TowerChart from './component/TowerChart';

export default function StairsEnd({ navigation }) {
    const feedbackAnim = useRef(new Animated.Value(100)).current;
    const feedbackOpacity = useRef(new Animated.Value(0)).current;
    const [modalVisible, setModalVisible] = useState(false);
    const [showFeedback, setShowFeedback] = useState(false);

    const handleTowerAnimEnd = () => {
        setShowFeedback(true);
        Animated.parallel([
            Animated.timing(feedbackAnim, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }),
            Animated.timing(feedbackOpacity, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }),
        ]).start();
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
            colors={[
                '#111111',
                '#111111',
                '#161616',
                '#334370',
                '#19274D',
                '#1C2338',
                '#161616',
            ]}
            locations={[0, 0.18, 0.20, 0.33, 0.49, 0.70, 1]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={styles.container}
        >
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <TowerChart onAnimationEnd={handleTowerAnimEnd} />
                {showFeedback && (
                    <>
                        <Animated.View
                            style={{
                                opacity: feedbackOpacity,
                                transform: [{ translateY: feedbackAnim }],
                            }}
                        >
                            <FeedbackContainer
                                theme={FEEDBACK_THEME.blue}
                                score="70점"
                                mainText="오늘의 운동 피드백"
                                subText="이용 방법이 직관적이라 누구나 쉽게 사용할 수 있어요."
                            />
                        </Animated.View>
                        <Animated.View
                            style={{
                                opacity: feedbackOpacity,
                                transform: [{ translateY: feedbackAnim }],
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
                    </>
                )}
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