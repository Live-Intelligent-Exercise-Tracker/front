import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import { moderateScale } from 'react-native-size-matters';
import Tower from './Tower';
import { useState } from 'react';

export default function StairsGoal({ navigation }) {
    const [selectedTower, setSelectedTower] = useState(null);

    const images = {
        tower1: require('../../assets/images/StairsGoal/남산타워 1.png'),
        tower2: require('../../assets/images/StairsGoal/포스코타워 4.png'),
        tower3: require('../../assets/images/StairsGoal/엘시티 1.png'),
        tower4: require('../../assets/images/StairsGoal/롯데타워 3.png'),
    };

    const handleSelectTower = (towerName) => {
        setSelectedTower(towerName);
    };

    return (
        <LinearGradient
            colors={['#0A0A0A', '#0A0A0A', '#111F45']} 
            locations={[0, 0.7, 1]} 
            start={{ x: 0, y: 0 }} 
            end={{ x: 0, y: 1 }} 
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

            <TouchableOpacity
                style={[
                    styles.button,
                    selectedTower ? styles.buttonEnabled : styles.buttonDisabled,
                ]}
                disabled={!selectedTower} 
                onPress={() => navigation.navigate("ExerciseIntensity", { button: '계단 오르기' })}
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
        opacity: 1, 
        shadowColor: '#507DFA', 
        shadowOffset: { width: 0, height: 0 }, 
        shadowOpacity: 1, 
        shadowRadius: 10, 
        elevation: 10, 
    },
    dimmed: {
        opacity: 0.5, 
    },
    buttonEnabled: {
        backgroundColor: '#507DFA',
    },
    buttonDisabled: {
        backgroundColor: '#505050', 
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: moderateScale(16),
        fontWeight: 'medium'
    },
});