import { StyleSheet, Text, View, Image } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { LinearGradient } from 'expo-linear-gradient'

export default function ExerciseSummary() {

    return (
        <View style={styles.container}>
            <Text style={{ fontSize: moderateScale(24), fontWeight: 'bold', color: '#ffffff', alignSelf: 'flex-start' }}>지난 주 운동 요약</Text>

            {/* <LinearGradient
                colors={['#233268', '#314898', '#6881DC', '#7D89B4']}
                locations={[0, 0.31, 0.63, 1]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={styles.gradientBox}
            > */}
            <View style={styles.gradientBox}>
                <Text style={{ color: '#bfbfbf', fontSize: moderateScale(14) }}>런닝(유산소 운동)</Text>

                <View style={styles.innerBox}>

                    <View style={styles.row}>
                        {[
                            { label: '거리', value: '3.2', unit: 'km' },
                            { label: '운동 시간', value: '20', unit: 'm' },
                            { label: '평균 페이스', value: '5', unit: '/km' }
                        ].map((item, index) => (
                            <View style={styles.itemBox} key={index}>
                                <Text style={[styles.exerciseMenu]}>{item.label}</Text>
                                <View style={styles.valueRow}>
                                    <Text style={styles.num}>{item.value}</Text>
                                    <Text style={styles.unit}>{item.unit}</Text>
                                </View>
                            </View>
                        ))}
                    </View>

                    <View style={styles.row}>
                        {[
                            { label: '평균 심박수', value: '130', unit: 'bpm' },
                            { label: '최대 심박수', value: '162', unit: 'bpm' },
                            { label: '소모 칼로리', value: '480', unit: 'kcal' }
                        ].map((item, index) => (
                            <View style={styles.itemBox} key={index}>
                                <Text style={styles.exerciseMenu}>{item.label}</Text>
                                <View style={styles.valueRow}>
                                    <Text style={styles.num}>{item.value}</Text>
                                    <Text style={styles.unit}>{item.unit}</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
            </View>

            {/* </LinearGradient> */}

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: moderateScale(10)
    },
    gradientBox: {
        backgroundColor: '#6C748B24',
        width: moderateScale(320),
        height: moderateScale(139),
        borderRadius: 6,
        paddingRight: moderateScale(20),
        paddingLeft: moderateScale(20),
        paddingTop: moderateScale(10),
        marginTop: moderateScale(10),
    },
    exerciseMenu: {
        color: '#a5a5a5',
        fontSize: moderateScale(7),
        fontWeight: 'light',
        alignItems: 'flex-start'
    },
    num: {
        color: '#ffffff',
        fontSize: moderateScale(13),
    },
    unit: {
        color: '#c7c7c7',
        fontSize: moderateScale(10),
    },
    innerBox: {
        width: moderateScale(280),
        height: moderateScale(92),
        borderRadius: 6,
        backgroundColor: 'black',
        marginTop: moderateScale(5),
        justifyContent: 'center'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: moderateScale(10),
    },
    itemBox: {
        flex: 1,
        alignItems: 'center',
    },
    valueRow: {
        flexDirection: 'row',
        alignItems: 'flex-end',
    },

});