import LoginSlider from '@/components/LoginSlider'
import React from 'react'
import { Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
interface IPropsWelcomePage {
    navigation?: any
}
const WelcomePage: React.FC<IPropsWelcomePage> = ({ navigation }) => {

    return (
        <SafeAreaView className='' style={{ flex: 1}}>
            <View className='flex flex-col px-9 gap-[29px]'>
                <Image source={require('@/assets/icons/menu_24px_outlined.png')} alt='Menu Icon' className='mt-6' />
                <Text className='text-lg'>WELCOME TO {'\n'} <Text className='font-bold'>Pyson Note</Text></Text>
                <LoginSlider />
            </View>
            <View className='flex flex-col gap-[25px] mt-10 px-9'>
                <TouchableOpacity onPress={() => navigation.navigate('Register')} className='w-full h-[52px] rounded-lg bg-primary flex items-center justify-center '>
                    <Text className='text-white font-bold'>CREATE ACCOUNT</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Login')} className='w-full h-[52px] rounded-lg bg-primary flex items-center justify-center '>
                    <Text className='text-white font-bold'>LOG IN</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>

    )
}

export default WelcomePage