import { supabase } from '@/lib/supabase';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React, { useState } from 'react';
import { Alert, Image, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { z } from 'zod';
interface IPropsRegister {
    navigation?: any;
}
const registerSchema = z.object({
    name: z.string().min(6, 'Name must be at least 6 characters'),
    email: z.string().email('Enter a valid email'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    rePassword: z.string().min(6, 'Password must be at least 6 characters'),
}).refine((data) => data.password === data.rePassword, {
    message: 'Passwords must match',
    path: ['rePassword'],
});
const Register: React.FC<IPropsRegister> = ({ navigation }) => {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [hidden, setHidden] = useState(true)
    const [hiddenRePassword, setHiddenRePassword] = useState(true)
    const [rePassword, setRePassword] = useState('')
    const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string; rePassword?: string }>({});

    const handleRegister = async () => {
        const result = registerSchema.safeParse({ name, email, password, rePassword });
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    displayName: name
                },
            },
        });
        if (!result.success) {
            const fieldErrors = result.error.flatten().fieldErrors;
            setErrors({
                name: fieldErrors.name?.[0],
                email: fieldErrors.email?.[0],
                password: fieldErrors.password?.[0],
                rePassword: fieldErrors.rePassword?.[0],
            });
            return;
        }
        if (error) {
            Alert.alert('Error', error.message);

        } else {

            navigation.navigate('Login');
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}  >
            <View className='px-9'>
                <View className='flex-row gap-4 items-center mt-6 mb-[62px] '>
                    <TouchableOpacity onPress={() => navigation.goBack()}><Image source={require('@/assets/icons/arrow_back_24px.png')} alt='Arrow Back' className='size-6' /></TouchableOpacity>
                    <Text className='text-[18px]'>Create Account</Text>
                </View>
                <View className='flex-col flex mb-[27px]'>
                    <Text className='text-[18px] font-bold'>Let’s get to know you !</Text>
                    <Text className='text-[18px] font-light'>Enter your details to continue</Text>
                </View>
                <View className='flex flex-col gap-6'>
                    <View className='relative'>
                        <Image source={require('@/assets/icons/user24_px.png')} alt='User Icon' className='absolute bottom-0 top-4 left-4' />
                        <TextInput
                            placeholder="Display Name"
                            onChangeText={(text) => setName(text)}
                            placeholderTextColor={'gray'}
                            className='border-[1px] h-[52px] rounded-md px-[60px]  '
                        />
                        {errors.name && <Text className='text-red-500 mt-1 ml-2 text-[13px]'>{errors.name}</Text>}
                    </View>
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
                    </View>
                    <View className='relative'>
                        <MaterialIcons name="lock-reset" size={24} color="#FFB347" className='absolute bottom-0 top-4 left-4' />
                        <TextInput
                            placeholder="Confirm Password"
                            placeholderTextColor={'gray'}
                            onChangeText={(text) => setRePassword(text)}
                            className='border-[1px] h-[52px] rounded-md px-[60px]'
                            secureTextEntry={hidden ? true : false}
                        />
                        <TouchableOpacity onPress={() => setHidden(hiddenRePassword ? false : true)} className='absolute bottom-0 top-4 right-4'>
                            {hiddenRePassword ?
                                <Image source={require('@/assets/icons/visibility_off_24px.png')} alt='visibility Off Icon' />
                                :
                                <Image source={require('@/assets/icons/visibility_24px_outlined.png')} alt='visibility Off Icon' />
                            }
                        </TouchableOpacity>
                        {errors.rePassword && <Text className='text-red-500 mt-1 ml-2 text-[13px]'>{errors.rePassword}</Text>}

                    </View>
                    <View className='mt-10'>
                        <Text className='text-[18px]'>Already have an account?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}><Text className='text-[18px] text-primary font-bold underline'>Login here</Text></TouchableOpacity>
                    </View>
                    <Text className='mt-10 text-[16px]'>By clicking the “CREATE ACCOUNT” button, you agree to <Text className='font-bold'>Terms of use</Text> and <Text className='font-bold'>Privacy Policy</Text></Text>
                    <TouchableOpacity onPress={handleRegister} disabled={!email && !password && !name && !rePassword} className={`flex items-center justify-center m-auto w-full h-[52px] rounded-lg shadow-lg  ${email && password && rePassword && name ? 'bg-primary' : 'bg-primary opacity-50'}`}><Text className='text-[18px] text-white'>CREATE ACCOUNT</Text></TouchableOpacity>
                </View>
            </View>

        </SafeAreaView>
    )
}

export default Register