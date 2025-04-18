import { StatusBar } from 'expo-status-bar';
import { Alert, Button, Dimensions, StyleSheet, Text, View } from 'react-native';
import SignupRow from './components/SignupRow';
import { moderateScale } from 'react-native-size-matters';
import { useEffect, useState } from 'react';
import SignupButton from './components/SignupButton';
import PasswordRow from './components/PasswordRow';
import InfoRow from './components/InfoRow';
import { useDispatch, useSelector } from 'react-redux';
import { checkEmailDup, checkNickDup, registerUser, setSuccFalse } from '../../../redux/slices/userSlice';
import GenderRow from './components/GenderRow';

const {width, height} = Dimensions.get('window');

export default function SignUp({ navigation }) {
    const dispatch = useDispatch();
    const { emailDupError } =useSelector((state)=>state.user)
    const { nickDupError } = useSelector((state)=>state.user)
    const { regSuccess } = useSelector((state)=>state.user)

    const [page, setPage] = useState(1);

    const [formData,setFormData] = useState({
        email: '',
        nick: '',
        pass: '',
        verifPass:'',
    })
    const [emailChecked,setEmailChecked]=useState(false);
    const [nickChecked,setNickChecked]=useState(false);
    const checkedStatus={emailChecked,nickChecked};
    const [bioData,setBioData]=useState({
        gender: '',
        age: '',
        height: '',
        weight: '',
    })
    
    const [errors, setErrors] = useState({
        email: null,
        nick: null,
        pass: null,
        verifPass:null,
    });
    const [bioErrors,setBioErrors] = useState({
        gender:null,
        age: null,
        height: null,
        weight: null,
    })

    const isFormValid = formData.email && formData.nick && formData.pass && formData.verifPass;
    const isFormValid2 = bioData.gender && bioData.age && bioData.height && bioData.weight;

    useEffect(()=>{
        setErrors((prev)=>({...prev,email:emailDupError}))
    },[emailDupError])

    useEffect(()=>{
        setErrors((prev)=>({...prev,nick:nickDupError}))
    },[nickDupError])

    useEffect(()=>{
        if(regSuccess){
            dispatch(setSuccFalse());
            // Alert.alert("회원가입 성공", "회원가입이 완료되었습니다!", [
            //     {text: "확인", onPress: () => navigation.navigate("Login")},
            // ]); 
            alert("회원가입 성공!");
            navigation.navigate("Login")
        }
    },[regSuccess])

    const handleInputChange = (field, value) => {
        setFormData(prev=> ({...prev, [field]: value }));
        setErrors({ ...errors, [field]: '' }); // 에러 메시지 초기화

        //이메일, 닉네임 입력란 입력 할 때마다 중복 확인됨 거짓으로 변경
        if(field==="email") setEmailChecked(false);
        if(field==="nick") setNickChecked(false);
    };

    const handleBioInput = (field,value) => {
        setBioData(prev=> ({...prev,[field]:value}));
        setBioErrors({...bioErrors, [field]: ''}); //에러 메시지 초기화

        console.log("biodata",bioData)
        console.log("bio errors",bioErrors)
    }

    const checkEmptyField = (field,value) => {
        if(value.trim()===''){
            setErrors((prevErrors) => ({
                ...prevErrors,
                [field]: "필수 입력사항입니다",
            }))
        }
    }

    const checkEmptyBioField = (field,value) => {
        if(value.trim()===''){
            setBioErrors((prevErrors)=>({
                ...prevErrors,
                [field]: "필수 입력사항입니다"
            }))
        }
    }

    const isValidEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const isValidPass= (pass) => {
        return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/.test(pass);
    }

    const isNumeric=(value)=>{
        return /^\d+(\.\d+)?$/.test(value);
    }

    const IDAvailCheck=(type)=>{
        if(type==="email"&&emailChecked===false){
            if(!formData.email || !isValidEmail(formData.email)){
                setErrors(prev=>({...prev, email: "올바른 이메일 형식을 입력해주세요."}))
            }else{
                //백엔드 중복 확인 api
                dispatch(checkEmailDup({email:formData.email}))
                //중복 아닐 시
                setEmailChecked(true);
                setErrors((prevErrors) => ({
                ...prevErrors,
                    email: null,
                }))
            }
        }
        if(type==="nick"&&nickChecked===false){
            if(!formData.nick){
                checkEmptyField("nick",formData.nick);
            }else{
                //백엔드 중복 확인 api
                dispatch(checkNickDup({nickname:formData.nick}))
                //중복 아닐 시
                setNickChecked(true);;
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    nick: null,
                }))
                // Alert.alert("닉네임 중복 확인", "사용할 수 있는 닉네임입니다!", [
                //     {text: "확인"},
                // ]);
            }
        }
    }

    const handleSignupButton = () => {
        if(page===1){
            const newErrors={};
            Object.entries(formData).forEach(([key, value]) => {
                if (!value) newErrors[key] = '필수 입력사항입니다';
            });
            if(!isValidEmail(formData.email)) newErrors.email=" 이메일 형식을 입력해주세요"
            if(!emailChecked) newErrors.email="이메일 중복 확인을 해주세요";
            if(!nickChecked) newErrors.nick="닉네임 중복 확인을 해주세요";
            if(!isValidPass(formData.pass)) newErrors.pass="영문,숫자 포함 8~20자리를 입력해주세요"
            
            if(!formData.verifPass) newErrors.verifPass="필수 입력사항입니다"
            else if(formData.pass!==formData.verifPass) newErrors.verifPass = "비밀번호가 일치하지 않습니다"

            setErrors(newErrors);

            if(Object.keys(newErrors).length===0){
                setErrors({});
                setPage(2);
            }

        }else if(page===2){
            const newErrors={};
            Object.entries(bioData).forEach(([key, value]) => {
                if (!value) newErrors[key] = '필수 입력사항입니다';
            });
            if(!isNumeric(bioData.age)) newErrors.age="숫자 형식을 입력해주세요"
            if(!isNumeric(bioData.height)) newErrors.height="숫자 형식을 입력해주세요"
            if(!isNumeric(bioData.weight)) newErrors.weight="숫자 형식을 입력해주세요"
            setBioErrors(newErrors);

            if(Object.keys(newErrors).length===0){
                setBioErrors({});
                dispatch(registerUser({email:formData.email,nickname:formData.nick,password:formData.pass,gender:bioData.gender,age:bioData.age,height:bioData.height,weight:bioData.weight,navigation}))
            }
        }
    }

    // const apiButton = () => {
    //     dispatch(registerUser({email:"bmbgwrahadaagxaaaaser08@gmail.com",nickname:"bmasaaaadsba3x08",password:"1234Aa!!",gender:"MALE",age:28,height:175,weight:75,navigation}))
    //     navigation.navigate("Login");
    // }

    return (
        <View style={styles.container}>
            {page===1?
                <>
                    <View>
                        <Text style={styles.screenTitle}>회원 정보를 입력해주세요.</Text>
                        <SignupRow type="email" data={formData.email} handleInputChange={handleInputChange} checkEmptyField={checkEmptyField} IDAvailCheck={IDAvailCheck} checkedStatus={checkedStatus} errors={errors} placeholder="이메일을 입력해 주세요."/>
                        <SignupRow type="nick" data={formData.nick} handleInputChange={handleInputChange}  checkEmptyField={checkEmptyField} IDAvailCheck={IDAvailCheck} checkedStatus={checkedStatus} errors={errors} placeholder="닉네임을 입력해 주세요."/>
                        <PasswordRow type="pass" pass={formData.pass} verifPass={formData.verifPass} handleInputChange={handleInputChange} checkEmptyField={checkEmptyField} errors={errors} placeholder="영어, 숫자를 포함한 8~20자리를 입력해 주세요."/>
                    </View>

                    {/* <Button title="호출 테스트" onPress={apiButton}/> */}

                    <View style={styles.signupButtonSection}>
                        <SignupButton isFormValid={isFormValid} page={page} handleSignupButton={handleSignupButton}/>
                    </View>
                </>
            :""}

            {page===2?
            <>
                <View>
                    <Text style={styles.screenTitle}>회원 정보를 입력해주세요.</Text>
                    <GenderRow data={bioData.gender} handleBioInput={handleBioInput} bioErrors={bioErrors}/>
                    <InfoRow type="age" data={bioData.age} handleBioInput={handleBioInput} checkEmptyBioField={checkEmptyBioField} bioErrors={bioErrors} placeholder="나이"/>
                    <InfoRow type="height" data={bioData.height} handleBioInput={handleBioInput} checkEmptyBioField={checkEmptyBioField} bioErrors={bioErrors} placeholder="키"/>
                    <InfoRow type="weight" data={bioData.weight} handleBioInput={handleBioInput} checkEmptyBioField={checkEmptyBioField} bioErrors={bioErrors} placeholder="몸무게"/>
                    
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