import { useEffect } from 'react';
import { moderateScale } from 'react-native-size-matters';
import { StyleSheet, Text, View, Image } from 'react-native';
import { pointTotal } from '../../../redux/slices/pointSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function Header() {
    const dispatch = useDispatch();
    const { total } = useSelector((state) => state.point);

    useEffect(() => {
        const fetchPointTotal = async () => {
            try {
                await dispatch(pointTotal());
            } catch (error) {
                console.error('포인트 불러오기 실패:', error.message);
            }
        };
        fetchPointTotal();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.side} />
            <View style={styles.center}>
                <Image
                    source={require('../../../assets/images/Home/로고.png')}
                    style={styles.logo}
                />
            </View>
            <View style={styles.side}>
                <Text style={styles.pointText}>🪙 200</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        height: moderateScale(40),
        width: '100%',
        marginTop: moderateScale(50),
    },
    side: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: moderateScale(84),
        height: moderateScale(20.78),
    },
    pointText: {
        fontSize: moderateScale(14),
        color: '#ffffff',
    },
});