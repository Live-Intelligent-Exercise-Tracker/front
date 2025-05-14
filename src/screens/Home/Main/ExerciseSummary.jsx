import { StyleSheet, Text, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import Svg, { Rect, Defs, LinearGradient, Stop } from 'react-native-svg';

export default function ExerciseSummary({ title }) {
    return (
        <View style={styles.container}>
            <View style={{ position: 'relative', marginTop: moderateScale(10) }}>
                <Svg
                    width={moderateScale(320)}
                    height={moderateScale(139)}
                    style={{ position: 'absolute', top: 0, left: 0 }}
                >
                    <Defs>
                        <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
                            <Stop offset="0%" stopColor="#233268" />
                            <Stop offset="31%" stopColor="#314898" />
                            <Stop offset="63%" stopColor="#6881DC" />
                            <Stop offset="100%" stopColor="#7D89B4" />
                        </LinearGradient>
                    </Defs>
                    <Rect
                        x="0.75"
                        y="0.75"
                        width={moderateScale(320 - 1.5)}
                        height={moderateScale(139 - 1.5)}
                        rx="6"
                        stroke="url(#grad)"
                        strokeWidth="1.5"
                        fill="transparent"
                    />
                </Svg>

                <View style={styles.gradientBox}>
                    <Text style={{ color: '#bfbfbf', fontSize: moderateScale(14) }}>{title}</Text>
                    <View style={styles.innerBox}>
                        {[
                            { label: '거리', value: '3.2', unit: 'km' },
                            { label: '운동 시간', value: '20', unit: 'm' },
                            { label: '평균 페이스', value: '5', unit: '/km' },
                            { label: '평균 심박수', value: '130', unit: 'bpm' },
                            { label: '최대 심박수', value: '162', unit: 'bpm' },
                            { label: '소모 칼로리', value: '480', unit: 'kcal' },
                        ].map((item, index) => (
                            <View style={styles.itemBox} key={index}>
                                <Text style={styles.label}>{item.label}</Text>
                                <View style={styles.valueRow}>
                                    <Text style={styles.value}>{item.value}</Text>
                                    <Text style={styles.unit}>{item.unit}</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    gradientBox: {
        backgroundColor: '#6C748B24',
        width: moderateScale(320),
        height: moderateScale(139),
        borderRadius: 6,
        paddingRight: moderateScale(20),
        paddingLeft: moderateScale(20),
        paddingTop: moderateScale(10),
    },
    innerBox: {
        width: moderateScale(280),
        height: moderateScale(92),
        borderRadius: 6,
        backgroundColor: '#16181E',
        marginTop: moderateScale(5),
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        padding: moderateScale(5),
    },
    itemBox: {
        width: '33.33%',
        paddingVertical: moderateScale(8),
        paddingHorizontal: moderateScale(15),
    },
    label: {
        fontSize: moderateScale(7),
        color: '#a5a5a5',
        marginBottom: moderateScale(2),
        alignSelf: 'flex-start',
        fontWeight: 'light',
    },
    valueRow: {
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    value: {
        fontSize: moderateScale(13),
        color: '#ffffff',
    },
    unit: {
        fontSize: moderateScale(10),
        color: '#c7c7c7',
        marginLeft: moderateScale(2),
    },
});
