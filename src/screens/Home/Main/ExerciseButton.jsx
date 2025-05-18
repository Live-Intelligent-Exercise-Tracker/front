import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

export default function ExerciseButton({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.leftColumn}>
                <TouchableOpacity style={styles.healthAndRunning} onPress={() => navigation.navigate("HrvMeasurement", { button: '헬스' })}>
                    <View style={styles.textBox}>
                        <Text style={styles.title}>헬스</Text>
                        <Text style={styles.subtitle}>근육 성장을 위한 첫 걸음!</Text>
                    </View>
                    <Image
                        source={require('../../../assets/images/Home/아령.png')}
                        style={styles.dumbbellImage}
                    />
                </TouchableOpacity>

                <TouchableOpacity style={styles.healthAndRunning} onPress={() => navigation.navigate("HrvMeasurement", { button: '러닝' })}>
                    <View style={styles.textBox}>
                        <Text style={styles.title}>러닝</Text>
                        <Text style={styles.subtitle}>오늘도 활기찬 하루를 시작해볼까요?</Text>
                    </View>
                    <View style={styles.runningImages}>
                        <Image
                            source={require('../../../assets/images/Home/러닝 이미지.png')}
                            style={styles.roadImage}
                        />
                    </View>
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                onPress={() => navigation.navigate("StairsGoal")}
                style={styles.stairsButton}
            >
                <View style={styles.textBox}>
                    <Text style={styles.title}>계단 오르기</Text>
                    <Text style={styles.subtitle}>계단은 인생의 업힐,{"\n"}정상을 향해 한 걸음 더!</Text>
                </View>
                <View style={styles.stairsImages}>
                    <Image
                        source={require('../../../assets/images/Home/계단오르기 건물1.png')}
                        style={styles.unionImage}
                    />
                    <Image
                        source={require('../../../assets/images/Home/계단오르기 건물2.png')}
                        style={styles.buildingImage}
                    />
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: moderateScale(10),
    },
    leftColumn: {
        flex: 1,
        justifyContent: 'space-between',
    },
    healthAndRunning: {
        backgroundColor: '#181818',
        borderRadius: 6,
        height: moderateScale(114),
        width: moderateScale(171),
        marginBottom: moderateScale(18),
        padding: moderateScale(10),
        justifyContent: 'space-between',
        overflow: 'hidden',
    },
    stairsButton: {
        backgroundColor: '#181818',
        borderRadius: 6,
        width: moderateScale(148),
        height: moderateScale(246),
        padding: moderateScale(10),
        overflow: 'hidden',
    },
    textBox: {
        paddingTop: moderateScale(5),
    },
    title: {
        color: '#e6e6e6',
        fontWeight: 'bold',
        fontSize: moderateScale(16),
        marginBottom: moderateScale(5),
    },
    subtitle: {
        color: '#a5a5a5',
        fontSize: moderateScale(9),
    },
    dumbbellImage: {
        position: 'absolute',
        right: moderateScale(0),
        bottom: moderateScale(0),
    },
    runningImages: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: moderateScale(5),
    },
    roadImage: {
        bottom: moderateScale(25),
        left: moderateScale(10),
        resizeMode: 'contain',
        overflow: 'hidden',
    },
    stairsImages: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
    },
    unionImage: {
        left: moderateScale(-10),
        top: moderateScale(-10),
        resizeMode: 'contain',
    },
    buildingImage: {
        left: moderateScale(-50),
        top: moderateScale(-10),
        resizeMode: 'contain',
    },
});
