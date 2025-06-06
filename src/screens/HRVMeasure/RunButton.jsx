import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

export default function RunButton({ button, navigation, tower }) {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("ExerciseStart", { button: button, tower: tower })}>
                <Text style={styles.text}>
                    {button} 하러 가기
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    button: {
        width: moderateScale(334),
        height: moderateScale(52),
        borderRadius: 10,
        backgroundColor: '#507DFA',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: moderateScale(16),
    }
});