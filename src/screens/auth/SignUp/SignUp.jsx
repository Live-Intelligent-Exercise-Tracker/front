import { StatusBar } from 'expo-status-bar';
import { Alert, Button, Dimensions, StyleSheet, Text, View } from 'react-native';
import SignupRow from './components/SignupRow';
import { moderateScale } from 'react-native-size-matters';
import { useEffect, useState } from 'react';
import SignupButton from './components/SignupButton';
import PasswordRow from './components/PasswordRow';
import InfoRow from './components/InfoRow';
import { useDispatch } from 'react-redux';
import { checkEmailDup, registerUser } from '../../../redux/slices/userSlice';

const {width, height} = Dimensions.get('window');

export default function SignUp({ navigation }) {
    const dispatch = useDispatch();

    const [page, setPage] = useState(2);
    const [email,setEmail]=useState("");
    // const [emailChecked,setEmailChecked]=useState(false);
    const [id, setId] = useState("");
    const [idChecked,setIdChecked]=useState(false);
    const [nick, setNick] = useState("");
    const [pass, setPass] = useState("");
    const [verifPass,setVerifPass]=useState("");

    const [age,setAge]=useState("");
    const [height,setHeight]=useState("");
    const [weight,setWeight]=useState("");


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
    // const isFormValid = id.trim() !== '' && nick.trim() !== '' && pass.trim() !== '' && verifPass.trim() !== '';
    const isFormValid2 = age.trim() !== '' && height.trim() !== '' && weight.trim() !== '';

    useEffect(()=>{
        console.log(errors);
    },[errors])

    const handleInputChange = (field, value) => {
        // setFormData({...formData,[field]:value});
        setFormData(prev=> ({...prev, [field]: value }));
        setErrors({ ...errors, [field]: '' }); // 에러 메시지 초기화

        //이메일, 닉네임 입력란 입력 할 때마다 중복 확인됨 거짓으로 변경
        if(field==="email") setEmailChecked(false);
        if(field==="nick") setNickChecked(false);
        // if(field==="email"||field==="nick"){ 
        //     const checkedField = `${field}Checked`
        //     setFormData(prev=>({...prev,[checkedField]:false}))
        // }
    };

    // const validateField = (field, value) => {
    //     if(field==="id"){
    //         if(value.trim()===''){
    //             setErrors((prevErrors) => ({
    //                 ...prevErrors,
    //                 [field]: "아이디를 입력해주세요",
    //             }))
    //         } else if(idChecked===false){
    //             setErrors((prevErrors) => ({
    //                 ...prevErrors,
    //                 [field]: "중복 확인해주세요",
    //             }))
    //         } else{
    //             setErrors((prevErrors) => ({
    //                 ...prevErrors,
    //                 [field]: null,
    //             }))
    //         }
    //     }
        
    //     if(field==="nick"){
    //         if(value.trim()===''){
    //             setErrors((prevErrors) => ({
    //                 ...prevErrors,
    //                 [field]: "닉네임을 입력해주세요",
    //             }))
    //         } else{
    //             setErrors((prevErrors) => ({
    //                 ...prevErrors,
    //                 [field]: null,
    //             }))
    //         }
    //     }

    //     if(field==="pass"){
    //         //비밀번호 양식 확인 알고리즘
    //         const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/;
    //         if(value.trim() === ''){
    //             setErrors((prevErrors) => ({
    //                 ...prevErrors,
    //                 [field]: "비밀번호를 입력해주세요",
    //             }))
    //         } else if(!passwordRegex.test(value)){
    //             setErrors((prevErrors) => ({
    //                 ...prevErrors,
    //                 [field]: '비밀번호는 숫자+영문 포함 8~20자리여야 합니다.',
    //             }))
    //         } else {
    //             setErrors((prevErrors) => ({
    //                 ...prevErrors,
    //                 [field]: null,
    //             }))
    //         }
    //     }

    //     if(field==="verifPass"){
    //         //비밀번호 양식 확인 알고리즘
    //         const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/;
    //         if(value.trim() === ''){
    //             setErrors((prevErrors) => ({
    //                 ...prevErrors,
    //                 [field]: "확인 비밀번호를 입력해주세요",
    //             }))
    //         } else if(!passwordRegex.test(value)){
    //             setErrors((prevErrors) => ({
    //                 ...prevErrors,
    //                 [field]: '비밀번호는 숫자+영문 포함 8~20자리여야 합니다.',
    //             }))
    //         } else if(value!==pass){
    //             setErrors((prevErrors) => ({
    //                 ...prevErrors,
    //                 [field]: '비밀번호가 일치하지 않습니다',
    //             }))
    //         } else {
    //             setErrors((prevErrors) => ({
    //                 ...prevErrors,
    //                 [field]: null,
    //             }))
    //         }
    //     }

    //     if(field==="age"){
    //         if(value.trim()===''){
    //             setErrors((prevErrors) => ({
    //                 ...prevErrors,
    //                 [field]: "나이를 입력해주세요",
    //             }))
    //         } else{
    //             setErrors((prevErrors) => ({
    //                 ...prevErrors,
    //                 [field]: null,
    //             }))
    //         }
    //     }

    //     if(field==="height"){
    //         if(value.trim()===''){
    //             setErrors((prevErrors) => ({
    //                 ...prevErrors,
    //                 [field]: "키를 입력해주세요",
    //             }))
    //         } else{
    //             setErrors((prevErrors) => ({
    //                 ...prevErrors,
    //                 [field]: null,
    //             }))
    //         }
    //     }

    //     if(field==="weight"){
    //         if(value.trim()===''){
    //             setErrors((prevErrors) => ({
    //                 ...prevErrors,
    //                 [field]: "몸무게를 입력해주세요",
    //             }))
    //         } else{
    //             setErrors((prevErrors) => ({
    //                 ...prevErrors,
    //                 [field]: null,
    //             }))
    //         }
    //     }

    //     if(field==="email"){
    //         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // 이메일 정규식
    //         if(value.trim()===''){
    //             setErrors((prevErrors) => ({
    //                 ...prevErrors,
    //                 [field]: null,
    //             }))
    //         }else if(!emailRegex.test(value)){
    //             setErrors((prevErrors) => ({
    //                 ...prevErrors,
    //                 [field]: "올바른 이메일 형식을 입력해주세요.",
    //             }))
    //         }else{
    //             setErrors((prevErrors) => ({
    //                 ...prevErrors,
    //                 [field]: null,
    //             }))
    //         }
    //     }
    // };

    const checkEmptyField = (field,value) => {
        if(value.trim()===''){
            setErrors((prevErrors) => ({
                ...prevErrors,
                [field]: "필수 입력사항입니다",
            }))
        }
    }

    const isValidEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const isValidPass= (pass) => {
        return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/.test(pass);
    }

    const isValidVerifPass=(verifPass)=>{
        
    }

    const IDAvailCheck=(type)=>{
        if(type==="email"&&emailChecked===false){
            if(!formData.email || !isValidEmail(formData.email)){
                setErrors(prev=>({...prev, email: "올바른 이메일 형식을 입력해주세요."}))
            }else{
                //백엔드 중복 확인 api
                dispatch(checkEmailDup({email:formData.email}))
                // dispatch(registerUser({login_id:id,nickname:nick,password:pass,age,height,weight,email,navigation}))
                //중복 아닐 시
                setEmailChecked(true);
                setErrors((prevErrors) => ({
                ...prevErrors,
                    email: null,
                }))
                Alert.alert("이메일 중복 확인", "사용할 수 있는 이메일입니다!", [
                    {text: "확인"},
                ]);
                alert("사용할 수 있는 이메일!");
                console.log("사용할 수 있는 이메일!");
                //중복일 시
                // Alert.alert("이메일 중복 확인", "이미 등록된 이메일입니다.", [
                //     {text: "확인"},
                // ]);
            }
        }
        if(type==="nick"&&nickChecked===false){
            if(!formData.nick){
                checkEmptyField("nick",formData.nick);
            }else{
                //백엔드 중복 확인 api
                //중복 아닐 시
                setNickChecked(true);;
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    nick: null,
                }))
                Alert.alert("닉네임 중복 확인", "사용할 수 있는 닉네임입니다!", [
                    {text: "확인"},
                ]);
                alert("사용할 수 있는 닉네임!");
                console.log("사용할 수 있는 닉네임!");

                // Alert.alert("ID 중복 확인", "이미 사용중인 ID입니다.", [
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
                alert("1페이지 완료!!!!");
            }else{
                alert("1페이지 실패");
            }

            // if (errors?.id===null&&errors?.nick===null&&errors?.pass===null&&errors?.verifPass===null&&errors?.email===null) {
            //     setPage(2);
            // }
            // else{
            //     validateField("email",email);
            //     validateField("id",id);
            //     validateField("nick",nick);
            //     validateField("pass",pass);
            //     validateField("verifPass",verifPass);
            // }
        }else if(page===2){
            if (errors?.age===null&&errors?.height===null&&errors?.weight===null) {
                dispatch(registerUser({login_id:id,nickname:nick,password:pass,age,height,weight,email,navigation}))
                // Alert.alert("회원가입 완료", "회원가입이 완료되었습니다!", [
                //     {text: "확인", onPress: () => navigation.navigate("Login")},
                // ]);
            } else{
                validateField("age",age);
                validateField("height",height);
                validateField("weight",weight);
            }
            //백엔드로 회원가입 정보 보내기
        }
    }

    const apiButton = () => {
        dispatch(registerUser({email:"bmbx08@gmail.com",nickname:"teaahadaadtrjrst",password:"1234Aa!!",gender:"MALE",age:28,height:175,weight:75,navigation}))
    }

    return (
        <View style={styles.container}>
            {page===1?
                <>
                    <View>
                        <Text style={styles.screenTitle}>회원 정보를 입력해주세요.</Text>
                        <SignupRow type="email" data={formData.email} handleInputChange={handleInputChange} checkEmptyField={checkEmptyField} IDAvailCheck={IDAvailCheck} checkedStatus={checkedStatus} errors={errors} placeholder="이메일을 입력해 주세요."/>
                        {/* <SignupRow type="id" data={formData.id} handleInputChange={handleInputChange}  checkEmptyField={checkEmptyField} IDAvailCheck={IDAvailCheck} errors={errors}  placeholder="아이디를 입력해 주세요."/> */}
                        <SignupRow type="nick" data={formData.nick} handleInputChange={handleInputChange}  checkEmptyField={checkEmptyField} IDAvailCheck={IDAvailCheck} checkedStatus={checkedStatus} errors={errors} placeholder="닉네임을 입력해 주세요."/>
                        <PasswordRow type="pass" pass={formData.pass} verifPass={formData.verifPass} handleInputChange={handleInputChange} checkEmptyField={checkEmptyField} errors={errors} placeholder="영어, 숫자를 포함한 8~20자리를 입력해 주세요."/>
                    </View>
                    <Button title="호출 테스트" onPress={apiButton}/>

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