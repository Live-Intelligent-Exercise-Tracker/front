import { StyleSheet, Text, View, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { logout } from '../../slices/userSlice';

export default function My({ navigation }) {
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(logout())
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