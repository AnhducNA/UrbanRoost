import React, {useState} from 'react';
import {
    Button,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {isValidEmail} from "../../utils";
import request from "../../api/request";
import {storeData} from "../../config/asyncStorage";

const LoginScreen = () => {
    // navigation
    const navigation = useNavigation();
    // Data User
    const [data, setData] = useState({
        email: '',
        password: '',
    });
    const handleLogin = async () => {
        if (!isValidEmail(data.email)) {
            alert('Email không đúng định dạng');
            return;
        }
        if (data.password.length < 6) {
            alert('Độ dài mật khẩu phải từ 6 ký tự trở lên');
            return;
        }
        await request.authLogin(data)
            .then(response => {
                alert(response.data.message);
                if (response?.data?.success === false) {
                    return;
                }
                // login success
                storeData('accessToken', response.data.accessToken);
                storeData('accessUser', response.data.accessUser)
                // navigation.navigate('HomeTabs');
            })
            .catch(error => {
                console.log('Error Login' + error.message);
            })
    }
    return (
        <SafeAreaView className={'w-full h-full bg-emerald-500'}>
            <View className={'px-5 mt-10 flex items-center justify-center'}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('HomeTabs')
                    }}>
                    <Text className={'text-4xl font-bold mb-10 text-yellow-300'}>
                        Đăng nhập
                    </Text>
                </TouchableOpacity>
                <TextInput
                    className={"w-full min-w-[300px] px-3 py-2 mb-5 bg-gray-200 text-base rounded"}
                    placeholderTextColor='gray'
                    placeholder={"Nhập đỉa chỉ email"}
                    value={data.email}
                    onChangeText={(email) => {
                        setData({'email': email.trim(), password: data.password});
                    }}
                />
                <TextInput
                    className={"w-full min-w-[300px] px-3 py-2 mb-5 bg-gray-200 text-base rounded"}
                    placeholderTextColor='gray'
                    secureTextEntry={true}
                    placeholder={"Nhập mật khẩu"}
                    value={data.password}
                    onChangeText={(password) => {
                        setData({'email': data.email, 'password': password.trim()});
                    }}
                />
                <TouchableOpacity
                    className={'py-3'}
                    onPress={() => {
                        navigation.navigate('Register');
                    }}
                >
                    <Text className={'text-base text-white underline'}>Chưa có tài khoản?</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className={'py-3'}
                    onPress={() => {
                        navigation.navigate('ForgotPassword');
                    }}
                >
                    <Text className={'text-base text-white underline'}>Quên mật khẩu?</Text>
                </TouchableOpacity>
                <View className={'min-w-[200px] py-1 mt-4 bg-blue-300 rounded-full'}>
                    <Button
                        color={'blue'}
                        title={'Đăng nhập'}
                        onPress={handleLogin}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

// define styles
const styles = StyleSheet.create({});

export default LoginScreen;
