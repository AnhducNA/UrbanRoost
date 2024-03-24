import React, {useState} from 'react';
import {useNavigation} from "@react-navigation/native";
import {Button, SafeAreaView, Text, TextInput, ToastAndroid, TouchableOpacity, View} from "react-native";
import request from "../../api/request";
import {isValidEmail} from "../../utils";

const RegisterScreen = () => {
    // navigation
    const navigation = useNavigation();
    // Data User
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        confirm_password: '',
        phone: '',
    });

    const handleRegister = async () => {
        // Check email
        if (!isValidEmail(data.email)) {
            alert('Email không đúng định dạng');
            return;
        }
        // Check password
        if (data.password.length < 6) {
            alert('Độ dài mật khẩu phải từ 6 ký tự trở lên');
            return;
        }
        // Check password
        if (data.password !== data.confirm_password) {
            alert('Mật khẩu xác nhận không khớp');
            return;
        }
        await request.authRegister(data)
            .then(response => {
                alert(response.data.message);
                if (response?.data?.success === true) {
                    navigation.navigate('Login');
                }
            })
    }
    return (
        <SafeAreaView className={'w-full h-full bg-blue-600'}>
            <View className={'px-5 mt-10 flex items-center justify-center'}>
                <Text className={'text-4xl font-bold mb-10 text-yellow-300'}>
                    Đăng ký
                </Text>
                <TextInput
                    className={"w-full min-w-[300px] px-3 py-2 mb-5 bg-gray-200 text-base rounded"}
                    placeholderTextColor='gray'
                    placeholder={"Nhập họ và tên"}
                    value={data.name}
                    onChangeText={(name) => {
                        setData({...data, name: name});
                    }}
                />
                <TextInput
                    className={"w-full min-w-[300px] px-3 py-2 mb-5 bg-gray-200 text-base rounded"}
                    placeholderTextColor='gray'
                    placeholder={"Nhập đỉa chỉ gmail"}
                    value={data.email}
                    onChangeText={(email) => {
                        setData({...data, email: email.trim()});
                    }}
                />
                <TextInput
                    className={"w-full min-w-[300px] px-3 py-2 mb-5 bg-gray-200 text-base rounded"}
                    placeholderTextColor='gray'
                    placeholder={"Nhập số điện thoại"}
                    value={data.phone}
                    onChangeText={(phone) => {
                        setData({...data, phone: phone.trim()});
                    }}
                />
                <TextInput
                    className={"w-full min-w-[300px] px-3 py-2 mb-5 bg-gray-200 text-base rounded"}
                    placeholderTextColor='gray'
                    secureTextEntry={true}
                    placeholder={"Nhập mật khẩu"}
                    value={data.password}
                    onChangeText={(password) => {
                        setData({...data, password: password.trim()});
                    }}
                />
                <TextInput
                    className={"w-full min-w-[300px] px-3 py-2 mb-5 bg-gray-200 text-base rounded"}
                    placeholderTextColor='gray'
                    secureTextEntry={true}
                    placeholder={"Xác nhận mật khẩu"}
                    value={data.confirm_password}
                    onChangeText={(confirm_password) => {
                        setData({...data, confirm_password: confirm_password.trim()});
                    }}
                />
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('Login');
                    }}
                >
                    <Text className={'text-base text-white underline'}>Đã có tài khoản?</Text>
                </TouchableOpacity>
                <View className={'min-w-[200px] py-1 mt-4 rounded-full bg-blue-300'}>
                    <Button
                        title={'Đăng ký'}
                        color={'blue'}
                        onPress={handleRegister}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default RegisterScreen;
