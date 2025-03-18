import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import Tower from './Tower';
import { useState } from 'react';

export default function StairsTarget({ navigation }) {
    const [selectedTower, setSelectedTower] = useState(null);

    const images = {
        tower1: require('../../../../assets/images/남산타워 1.png'),
        tower2: require('../../../../assets/images/포스코타워 4.png'),
        tower3: require('../../../../assets/images/엘시티 1.png'),
        tower4: require('../../../../assets/images/롯데타워 3.png'),
    };

    const handleSelectTower = (towerName) => {
        setSelectedTower(towerName);
    };

    return (
        <LinearGradient
            colors={['#0A0A0A', '#0A0A0A', '#111F45']} // 검은색 → 약한 남색 → 진한 파란색
            locations={[0, 0.7, 1]} // 30%까지 검은색, 이후 점점 파란색
            start={{ x: 0, y: 0 }} // 왼쪽 위에서 시작
            end={{ x: 0, y: 1 }} // 오른쪽 아래로 진행
            style={styles.container}
        >
            <View style={{ flexDirection: 'row', marginBottom: moderateScale(20) }}>
                <TouchableOpacity
                    style={[
                        styles.towerContainer,
                        selectedTower === '남산타워' && styles.selectedTower,
                        selectedTower && selectedTower !== '남산타워' ? styles.dimmed : {},
                    ]}
                    onPress={() => handleSelectTower('남산타워')}
                >
                    <Tower img={images.tower1} area='용산/서울' name='남산타워' stair='68층' />
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.towerContainer,
                        selectedTower === '포스코타워' && styles.selectedTower,
                        selectedTower && selectedTower !== '포스코타워' ? styles.dimmed : {},
                    ]}
                    onPress={() => handleSelectTower('포스코타워')}
                >
                    <Tower img={images.tower2} area='인천/송도' name='포스코타워' stair='68층' />
                </TouchableOpacity>
            </View>

            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                    style={[
                        styles.towerContainer,
                        selectedTower === '엘시티' && styles.selectedTower,
                        selectedTower && selectedTower !== '엘시티' ? styles.dimmed : {},
                    ]}
                    onPress={() => handleSelectTower('엘시티')}
                >
                    <Tower img={images.tower3} area='부산/해운대' name='엘시티' stair='101층' />
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.towerContainer,
                        selectedTower === '롯데타워' && styles.selectedTower,
                        selectedTower && selectedTower !== '롯데타워' ? styles.dimmed : {},
                    ]}
                    onPress={() => handleSelectTower('롯데타워')}
                >
                    <Tower img={images.tower4} area='서울/잠실' name='롯데타워' stair='123층' />
                </TouchableOpacity>
            </View>

            {/* ✅ 선택한 타워가 없으면 버튼 비활성화 */}
            <TouchableOpacity
                style={[
                    styles.button,
                    selectedTower ? styles.buttonEnabled : styles.buttonDisabled,
                ]}
                disabled={!selectedTower} // 선택한 타워가 없으면 비활성화
                onPress={() => navigation.navigate("HrvMeasurement", { button: '계단 오르기' })}
            >
                <Text style={styles.buttonText}>선택 완료</Text>
            </TouchableOpacity>

        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0A0A0A',
        alignItems: 'center',
        justifyContent: 'center',
        padding: moderateScale(20)
    },
    towerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#181818',
        width: moderateScale(165),
        height: moderateScale(190),
        borderRadius: 10,
        marginHorizontal: moderateScale(10),
    },
    button: {
        width: moderateScale(361),
        height: moderateScale(50),
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: moderateScale(60),
    },
    selectedTower: {
        opacity: 1, // 선택된 타워는 원래 밝기 유지
        shadowColor: '#507DFA', // 그림자 색상
        shadowOffset: { width: 0, height: 0 }, // 그림자 위치 (아래 방향)
        shadowOpacity: 1, // 그림자 투명도
        shadowRadius: 10, // 그림자 흐림 정도
        elevation: 10, // 안드로이드에서 그림자 적용
    },
    dimmed: {
        opacity: 0.5, // 선택되지 않은 타워는 어두워짐
    },
    buttonEnabled: {
        backgroundColor: '#507DFA', // 활성화된 버튼 색상
    },
    buttonDisabled: {
        backgroundColor: '#505050', // 비활성화된 버튼 색상
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: moderateScale(16),
        fontWeight: 'medium'
    },
});