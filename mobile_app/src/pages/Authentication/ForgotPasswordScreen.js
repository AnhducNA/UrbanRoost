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

const ForgotPasswordScreen = () => {
    // navigation
    const navigation = useNavigation();
    // Data User
    const [data, setData] = useState({
        email: '',
    });
    const handleForgotPassword = async () => {
        if (!isValidEmail(data.email)) {
            alert('Email không đúng định dạng');
            return;
        }
        await request.authForgotPassword(data)
            .then(response => {
                alert('Vui lòng kiểm tra email của bạn');
                alert(response.data.message);
            });
    }

    return (
        <SafeAreaView className={'w-full h-full bg-emerald-500'}>
            <View className={'px-5 mt-10 flex items-center justify-center'}>
                <Text className={'text-4xl font-bold mb-10 text-yellow-300'}>
                    Quên mật khẩu
                </Text>
                <TextInput
                    className={"w-full min-w-[300px] px-3 py-2 mb-5 bg-gray-200 text-base rounded"}
                    placeholderTextColor='gray'
                    placeholder={"Nhập đỉa chỉ email"}
                    value={data.email}
                    onChangeText={(email) => {
                        setData({'email': email.trim(), password: data.password});
                    }}
                />
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('Login');
                    }}
                >
                    <Text className={'text-base text-white underline'}>Đăng nhập?</Text>
                </TouchableOpacity>
                <View className={'min-w-[200px] py-1 mt-4 bg-blue-300 rounded-full'}>
                    <Button
                        color={'blue'}
                        title={'Lấy lại mật khẩu'}
                        onPress={handleForgotPassword}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

// define styles
const styles = StyleSheet.create({});

export default ForgotPasswordScreen;
