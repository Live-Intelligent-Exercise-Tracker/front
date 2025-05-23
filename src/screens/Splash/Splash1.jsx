import { StyleSheet, View, Image } from 'react-native';
import { useEffect } from 'react';

export default function Splash1({ navigation }) {
    

    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.replace('Splash2');
        }, 3000); 

        return () => clearTimeout(timer);
    }, []);

    return (
        <View style={styles.container}>
            <Image source={require('../../../src/assets/images/Splash/splash Ellipse.png')} style={{ zIndex: 0, position: "absolute" }} />
            <Image source={require('../../../src/assets/images/Splash/splash logo.png')} style={{ zIndex: 1, position: "absolute" }} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
        alignItems: 'center',
        justifyContent: 'center',
    },
});