import { supabase } from '@/lib/supabase';
import { setUser } from '@/redux/noteSlice';
import React, { useState } from 'react';
import { Alert, Image, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { z } from 'zod';
interface IPropsLogin {
    navigation?: any;
}
const loginSchema = z.object({
    email: z.string().email('Enter a valid email'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});
const Login: React.FC<IPropsLogin> = ({ navigation }) => {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('')
    const [hidden, setHidden] = useState(true)
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
    const dispatch = useDispatch()

    const handleLogin = async () => {
        const result = loginSchema.safeParse({ email, password });
        if (!result.success) {
            const fieldErrors = result.error.flatten().fieldErrors;
            setErrors({
                email: fieldErrors.email?.[0],
                password: fieldErrors.password?.[0],
            });
            return;
        }

        setErrors({});

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            Alert.alert('Error', error.message);
        } else {
            dispatch(setUser(data.user));
            navigation.reset({
                index: 0,
                routes: [{ name: 'MainScreen' }],
            });
        }
    };


    return (
        <SafeAreaView style={{ flex: 1 }}  >
            <View className='px-9'>
                <View className='flex-row gap-4 items-center mt-6 mb-[62px] '>
                    <TouchableOpacity onPress={() => navigation.goBack()}><Image source={require('@/assets/icons/arrow_back_24px.png')} alt='Arrow Back' className='size-6' /></TouchableOpacity>
                    <Text className='text-[18px]'>Log In</Text>
                </View>
                <View className='flex-col flex mb-[106px]'>
                    <Text className='text-[18px] font-bold'>Welcome Back!</Text>
                    <Text className='text-[18px] font-light'>Please login with your credentials</Text>
                </View>
                <View className='flex flex-col gap-6'>
                    <View className='relative'>
                        <Image source={require('@/assets/icons/email_24px.png')} alt='Email Icon' className='absolute bottom-0 top-4 left-4' />
                        <TextInput
                            placeholder="Email Address"
                            placeholderTextColor={'gray'}
                            onChangeText={(text) => setEmail(text)}
                            className='border-[1px] h-[52px] rounded-md px-[60px] '
                        />
                        {errors.email && <Text className='text-red-500 mt-1 ml-2 text-[13px]'>{errors.email}</Text>}
                    </View>
                    <View className='relative'>
                        <Image source={require('@/assets/icons/lock_24px.png')} alt='Lock Icon' className='absolute bottom-0 top-4 left-4' />
                        <TextInput
                            placeholder="Password"
                            onChangeText={(text) => setPassword(text)}
                            placeholderTextColor={'gray'}
                            className='border-[1px] h-[52px] rounded-md px-[60px]'
                            secureTextEntry={hidden ? true : false}
                        />
                        {errors.password && <Text className='text-red-500 mt-1 ml-2 text-[13px]'>{errors.password}</Text>}
                        <TouchableOpacity onPress={() => setHidden(hidden ? false : true)} className='absolute bottom-0 top-4 right-4'>
                            {hidden ?
                                <Image source={require('@/assets/icons/visibility_off_24px.png')} alt='visibility Off Icon' />
                                :
                                <Image source={require('@/assets/icons/visibility_24px_outlined.png')} alt='visibility Off Icon' />
                            }
                        </TouchableOpacity>
                        <Text className='text-end items-end flex w-full right-0 text-right mt-4 text-[14px] underline'>Forgot Password ?</Text>
                    </View>
                    <View className='mt-10'>
                        <Text className='text-[18px]'>Don’t have an account yet ?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Register')}><Text className='text-[18px] text-primary font-bold underline'>Create an account here</Text></TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={handleLogin} disabled={!email && !password} className={`flex items-center justify-center m-auto w-full h-[52px] rounded-lg shadow-lg  mt-[100px] ${email && password ? 'bg-primary' : 'bg-primary opacity-50'}`}><Text className='text-[18px] text-white'>LOG IN</Text></TouchableOpacity>
                </View>
            </View>

        </SafeAreaView>
    )
}

export default Login