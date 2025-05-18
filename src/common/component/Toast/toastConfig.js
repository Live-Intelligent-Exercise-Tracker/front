import { Image } from "react-native";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { moderateScale } from "react-native-size-matters";
import { BaseToast } from "react-native-toast-message";

const {width, height} = Dimensions.get('window');

export default toastConfig={
    // success:(props)=>(
    //     <BaseToast
    //     {...props}
    //     style={styles.baseToast}
    //     contentContainerStyle={styles.baseToastContainer}
    //     text1Style={styles.baseToastText1}
    //     text2Style={styles.baseToastText2}
    //     // autoHide={false}
    //     />
    // ),

    customToast:({props})=>(
        <View style={styles.customToast}>
            <Image
                source={require('../../../assets/images/Toast/Liet4.png')}
                style={styles.toastImage}
            />
            <View>
                <Text style={styles.customToastTitle}>LIET</Text>
                <Text style={styles.customToastText}>{props.text1}</Text>
            </View>
            
        </View>
    ),
}

const styles = StyleSheet.create({
    customToast:{
        backgroundColor:"rgb(216, 216, 216)",
        width: width*0.98,
        borderRadius: 20,
        paddingTop: moderateScale(13),
        paddingBottom: moderateScale(13),
        paddingHorizontal: moderateScale(12),
        flexDirection:"row",
        alignItems:"center"
    },
    toastImage:{
        width: moderateScale(34),
        height: moderateScale(34),
        borderRadius: 7,
        marginRight: moderateScale(9),
        marginTop: moderateScale(1),
    },
    customToastTitle:{
        color:"black",
        fontWeight: 700,
        fontSize: moderateScale(14),
        marginBottom: moderateScale(2),
    },
    customToastText:{
        color:"black",
        fontSize: moderateScale(11),
    },
    // baseToast:{
    //     // borderLeftColor: 'lightgreen',
    //     borderRadius: 20
    //     // paddingHorizontal: 30
    // },
    // baseToastContainer:{
    //     // paddingHorizontal: 90
    // },
    // baseToastText1:{
    //     fontSize: 15,
    //     // color:"red",
    // },
    // baseToastText2:{
    //     fontWeight: '400'
    // },  
})