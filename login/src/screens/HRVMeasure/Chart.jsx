import { StyleSheet, Text, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

export default function Chart({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.chartContainer}>
                <Text>차트부분</Text>
            </View>
            <View style={[styles.chartContainer, { flex: 1, backgroundColor: '#507DFA' }]}>
                <View style={{ flexDirection: 'row', alignSelf: 'center', justifyContent: 'center' }}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={styles.mma}>최대</Text>
                        <Text style={styles.bpm}>79 <Text style={[styles.bpm, { fontSize: moderateScale(10) }]}>bpm</Text></Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={styles.mma}>최소</Text>
                        <Text style={styles.bpm}>79 <Text style={[styles.bpm, { fontSize: moderateScale(10) }]}>bpm</Text></Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={styles.mma}>평균</Text>
                        <Text style={styles.bpm}>79 <Text style={[styles.bpm, { fontSize: moderateScale(10) }]}>bpm</Text></Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#111111',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: moderateScale(40),
        marginBottom: moderateScale(40),
        height: moderateScale(196),
        borderRadius: 4,
        width: '100%'
    },
    chartContainer: {
        flex: 2,
        width: '100%',
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center'
    },
    mma: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: moderateScale(10)
    },
    bpm: {
        color: '#D7D7D7',
        fontWeight: 'light',
        fontSize: moderateScale(14)
    }
});