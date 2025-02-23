import { StyleSheet, Text, View, Image } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

export default function Tower({ img, area, name, stair }) {

    return (
        <View style={styles.container}>
            <Image source={img} style={{ marginBottom: moderateScale(10) }} />
            <Text style={{ color: '#BFBFBF', fontSize: moderateScale(7), fontWeight: 'bold', marginBottom: moderateScale(2) }}>{area}</Text>
            <Text style={{ color: '#507DFA', fontSize: moderateScale(16), fontWeight: 'bold', marginBottom: moderateScale(3) }}>{name}</Text>
            <Text style={{ color: '#FFFFFF', fontSize: moderateScale(13), fontWeight: 'bold' }}>{stair}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});