import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { logout } from '../../redux/slices/userSlice';

export default function MyInfo({ navigation }) {

    const handleLogout = async () => {
        await logout()
        navigation.replace("Login")
    }
    return (
        <View style={styles.container}>
            <Button title='로그아웃' onPress={handleLogout}></Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});