import { StatusBar } from 'expo-status-bar';
import { Alert, Dimensions, StyleSheet, Text, View } from 'react-native';
import SignupRow from './components/SignupRow';
import { moderateScale } from 'react-native-size-matters';
import { useEffect, useState } from 'react';
import SignupButton from './components/SignupButton';
import PasswordRow from './components/PasswordRow';
import InfoRow from './components/InfoRow';

const {width, height} = Dimensions.get('window');

export default function SignUp({ navigation }) {
    const [page, setPage] = useState(2);
    const [id, setId] = useState("");
    const [idCheck,setIdCheck]=useState(false);
    const [nick, setNick] = useState("");
    const [pass, setPass] = useState("");
    const [verifPass,setVerifPass]=useState("");

    const [age,setAge]=useState("");
    const [height,setHeight]=useState("");
    const [weight,setWeight]=useState("");
    const [email,setEmail]=useState("");

    const isFormValid = id.trim() !== '' && nick.trim() !== '' && pass.trim() !== '' && verifPass.trim() !== '';
    const isFormValid2 = age.trim() !== '' && height.trim() !== '' && weight.trim() !== '';

    const [errors, setErrors] = useState({
        id: null,
        nick: null,
        pass: null,
        verifPass:null,
        age: null,
        height: null,
        weight: null,
        email: null,
    });
    
    const validateField = (field, value) => {
        if(field==="id"){
            if(value.trim()===''){
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [field]: "아이디를 입력해주세요",
                }))
            } else if(idCheck===false){
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [field]: "중복 확인해주세요",
                }))
            } else{
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [field]: null,
                }))
            }
        }
        
        if(field==="nick"){
            if(value.trim()===''){
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [field]: "닉네임을 입력해주세요",
                }))
            } else{
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [field]: null,
                }))
            }
        }

        if(field==="pass"){
            //비밀번호 양식 확인 알고리즘
            const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/;
            if(value.trim() === ''){
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [field]: "비밀번호를 입력해주세요",
                }))
            } else if(!passwordRegex.test(value)){
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [field]: '비밀번호는 숫자+영문 포함 8~20자리여야 합니다.',
                }))
            } else {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [field]: null,
                }))
            }
        }

        if(field==="verifPass"){
            //비밀번호 양식 확인 알고리즘
            const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/;
            if(value.trim() === ''){
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [field]: "확인 비밀번호를 입력해주세요",
                }))
            } else if(!passwordRegex.test(value)){
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [field]: '비밀번호는 숫자+영문 포함 8~20자리여야 합니다.',
                }))
            } else if(value!==pass){
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [field]: '비밀번호가 일치하지 않습니다!',
                }))
            } else {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [field]: null,
                }))
            }
        }

        if(field==="age"){
            if(value.trim()===''){
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [field]: "나이를 입력해주세요",
                }))
            } else{
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [field]: null,
                }))
            }
        }

        if(field==="height"){
            if(value.trim()===''){
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [field]: "키를 입력해주세요",
                }))
            } else{
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [field]: null,
                }))
            }
        }

        if(field==="weight"){
            if(value.trim()===''){
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [field]: "몸무게를 입력해주세요",
                }))
            } else{
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [field]: null,
                }))
            }
        }

        if(field==="email"){
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // 이메일 정규식
            if(value.trim()===''){
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [field]: null,
                }))
            }else if(!emailRegex.test(value)){
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [field]: "올바른 이메일 형식을 입력해주세요.",
                }))
            }else{
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [field]: null,
                }))
            }
        }
    };

    const IDAvailCheck=()=>{
        if(idCheck===false){
            //백엔드 중복 확인 api
            //중복 아닐 시
            setIdCheck(true);
            setErrors((prevErrors) => ({
                ...prevErrors,
                id: null,
            }))
            Alert.alert("ID 중복 확인", "사용할 수 있는 아이디입니다!", [
                {text: "확인"},
            ]);
            //중복일 시
            // Alert.alert("ID 중복 확인", "이미 사용중인 ID입니다.", [
            //     {text: "확인"},
            // ]);
            
        } else if(idCheck===true){
            // setIdCheck(false);
        }
    }

    const handleSignupButton = () => {
        if(page===1){
            if (errors?.id===null&&errors?.nick===null&&errors?.pass===null&&errors?.verifPass===null) {
                setPage(2);
            }else{
                validateField("id",id);
                validateField("nick",nick);
                validateField("pass",pass);
                validateField("verifPass",verifPass);
            }
        }else if(page===2){
            if (errors?.age===null&&errors?.height===null&&errors?.weight===null&&errors?.email===null) {
                Alert.alert("회원가입 완료", "회원가입이 완료되었습니다!", [
                    {text: "확인", onPress: () => navigation.navigate("Login")},
                ]);
            } else{
                validateField("age",age);
                validateField("height",height);
                validateField("weight",weight);
                validateField("email",email);
            }
            //백엔드로 회원가입 정보 보내기   
        }
    }

    return (
        <View style={styles.container}>
            {page===1?
                <>
                    <View>
                        <Text style={styles.screenTitle}>회원 정보를 입력해주세요.</Text>
                        <SignupRow type="아이디" data={id} setData={setId}  validateField={validateField} IDAvailCheck={IDAvailCheck} errors={errors}  placeholder="아이디를 입력해 주세요."/>
                        <SignupRow type="닉네임" data={nick} setData={setNick}  validateField={validateField} errors={errors} placeholder="닉네임을 입력해 주세요."/>
                        <PasswordRow type="비밀번호" pass={pass} verifPass={verifPass} setData={setPass} setVerifPass={setVerifPass} validateField={validateField} errors={errors} placeholder="영어, 숫자를 포함한 8~20자리를 입력해 주세요."/>
                    </View>

                    <View style={styles.signupButtonSection}>
                        <SignupButton isFormValid={isFormValid} page={page} handleSignupButton={handleSignupButton}/>
                    </View>
                </>
            :""}

            {page===2?
            <>
                <View>
                    <Text style={styles.screenTitle}>회원 정보를 입력해주세요.</Text>
                    {/* <SignupRow type="나이" setData={setAge} placeholder="나이"/>
                    <SignupRow type="키" setData={setHeight} placeholder="키"/>
                    <SignupRow type="몸무게" setData={setWeight} placeholder="몸무게"/> */}
                    <InfoRow type="나이" data={age} setData={setAge} validateField={validateField} errors={errors} placeholder="나이"/>
                    <InfoRow type="키" data={height} setData={setHeight} validateField={validateField} errors={errors} placeholder="키"/>
                    <InfoRow type="몸무게" data={weight} setData={setWeight} validateField={validateField} errors={errors} placeholder="몸무게"/>
                    <SignupRow type="이메일" data={email} setData={setEmail} validateField={validateField} errors={errors} placeholder="이메일을 입력해 주세요."/>
                </View>

                <View style={styles.signupButtonSection}>
                    <SignupButton isFormValid={isFormValid2} page={page} handleSignupButton={handleSignupButton}/>
                </View>
            </>
            :""}

            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:"space-between",
        backgroundColor: '#fff',
        paddingHorizontal: width*0.05,
        paddingVertical: height *0.01,
    },
    screenTitle:{
        // fontFamily:"NotoSansKR-Bold",
        fontWeight:'bold',
        fontSize:moderateScale(18),
        marginBottom: 30,
    },
    signupButtonSection:{
        alignItems:"center",
    }
});