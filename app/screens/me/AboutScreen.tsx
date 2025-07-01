import Container from '@/components/Container';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';

const AboutScreen = () => {
  const navigation = useNavigation()
  const darkMode = useSelector((state:any) => state.note.darkMode)
  return (
     <View className={` h-full ${darkMode ? 'bg-slate-900' : ''}`}>
       <View className='bg-primary h-[251px]'>
        <Container>
          <View className='flex justify-between flex-row w-full items-center '>
            <View className='flex-row gap-4 items-center '>
              <TouchableOpacity onPress={() => navigation.goBack()}><Image source={require('@/assets/icons/arrow_back_24px_black.png')} alt='Arrow Back' className='size-6' /></TouchableOpacity>
              <Text className={`text-[18px] font-medium `}>About</Text>
            </View>
          </View>
          <Image source={require('@/assets/images/about.png')} alt='About Image' className='size-[154px] mt-6 m-auto' />
        </Container>
      </View>
      <View className='flex flex-col gap-5 px-[60px] mt-[30px]'>
        <View className='flex-row justify-between w-full'>
          <Text className={`text-[18px] font-regular ${darkMode ? 'text-white' : ''}`}>Application</Text>
          <Text className={`text-[18px] font-light ${darkMode ? 'text-white' : ''}`}>Pyson Note</Text>
        </View>
        <View className='flex-row justify-between w-full'>
          <Text className={`text-[18px] font-regular ${darkMode ? 'text-white' : ''}`}>Version</Text>
          <Text className={`text-[18px] font-light ${darkMode ? 'text-white' : ''}`}>V1.0.0</Text>
        </View>
      </View>
     </View>
  )
}

export default AboutScreen